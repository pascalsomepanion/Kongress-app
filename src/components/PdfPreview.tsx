import { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

type PageInfo = {
  pageNumber: number;
  width: number;
  height: number;
};

type Status = 'loading' | 'ready' | 'error';

/**
 * Rendert ein PDF direkt als Bilder (Canvas) statt über ein <iframe>.
 * Der native PDF-Viewer in einem iframe verhält sich auf mobilen Browsern
 * (v.a. iOS Safari) unzuverlässig – oft bleibt die Vorschau leer oder lässt
 * sich nicht scrollen. Mit pdfjs-dist funktioniert es überall identisch.
 */
export function PdfPreview({ href }: { href: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const bestRatios = useRef<Map<number, number>>(new Map());

  // PDF laden + Seiten-Maße ermitteln
  useEffect(() => {
    let cancelled = false;
    const loadingTask = pdfjsLib.getDocument({ url: href });

    setStatus('loading');
    setDoc(null);
    setPages([]);
    setCurrentPage(1);
    bestRatios.current = new Map();

    loadingTask.promise
      .then(async (pdf) => {
        if (cancelled) return;
        const infos: PageInfo[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1 });
          infos.push({ pageNumber: i, width: viewport.width, height: viewport.height });
        }
        if (cancelled) return;
        setDoc(pdf);
        setPages(infos);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
      loadingTask.destroy();
    };
  }, [href]);

  // Breite des Scroll-Containers beobachten (Resize, Orientierungswechsel).
  // Auf die CSS-max-width der Seiten gedeckelt, damit auf breiten Desktop-
  // Fenstern nicht unnötig hochauflösend (und damit langsam) gerendert wird.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setContainerWidth(Math.min(el.clientWidth - 24, 760));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePageRatio = useCallback((pageNumber: number, ratio: number) => {
    bestRatios.current.set(pageNumber, ratio);
    let bestPage = pageNumber;
    let bestRatio = 0;
    bestRatios.current.forEach((r, p) => {
      if (r > bestRatio) {
        bestRatio = r;
        bestPage = p;
      }
    });
    if (bestRatio > 0.1) setCurrentPage(bestPage);
  }, []);

  return (
    <div className="pdf-preview__body">
      <div className="pdf-preview__scroll" ref={scrollRef}>
        {status === 'loading' && (
          <div className="pdf-preview__status">
            <span className="pdf-preview__spinner" aria-hidden />
            <p>PDF wird geladen …</p>
          </div>
        )}

        {status === 'error' && (
          <div className="pdf-preview__status pdf-preview__status--error">
            <p>Die Vorschau konnte nicht geladen werden.</p>
            <a href={href} download className="pdf-preview__fallback-link">
              PDF stattdessen herunterladen
            </a>
          </div>
        )}

        {status === 'ready' && doc && containerWidth > 0 && (
          <div className="pdf-preview__pages">
            {pages.map((info) => (
              <PdfPage
                key={`${info.pageNumber}-${Math.round(containerWidth / 8)}`}
                doc={doc}
                info={info}
                containerWidth={containerWidth}
                onRatio={handlePageRatio}
              />
            ))}
          </div>
        )}
      </div>

      {status === 'ready' && pages.length > 1 && (
        <div className="pdf-preview__pagecount" aria-hidden>
          Seite {currentPage} / {pages.length}
        </div>
      )}
    </div>
  );
}

function PdfPage({
  doc,
  info,
  containerWidth,
  onRatio,
}: {
  doc: PDFDocumentProxy;
  info: PageInfo;
  containerWidth: number;
  onRatio: (pageNumber: number, ratio: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [rendered, setRendered] = useState(false);

  // Erst rendern, wenn die Seite (bald) sichtbar wird – schont Speicher/CPU
  // bei mehrseitigen Heften, besonders auf dem Handy.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setShouldRender(true);
          onRatio(info.pageNumber, entry.intersectionRatio);
        });
      },
      { rootMargin: '900px 0px', threshold: [0, 0.5] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [info.pageNumber, onRatio]);

  useEffect(() => {
    if (!shouldRender || rendered || containerWidth <= 0) return;
    let cancelled = false;

    (async () => {
      try {
        const page = await doc.getPage(info.pageNumber);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const scale = (containerWidth / info.width) * dpr;
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, viewport }).promise;
        if (!cancelled) setRendered(true);
      } catch {
        // Einzelne Seite konnte nicht gerendert werden – Rest bleibt unberührt.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shouldRender, rendered, doc, info, containerWidth]);

  return (
    <div ref={wrapRef} className="pdf-page" style={{ aspectRatio: `${info.width} / ${info.height}` }}>
      {!rendered && <div className="pdf-page__skeleton" />}
      <canvas ref={canvasRef} className="pdf-page__canvas" style={{ opacity: rendered ? 1 : 0 }} />
      <span className="pdf-page__number">{info.pageNumber}</span>
    </div>
  );
}
