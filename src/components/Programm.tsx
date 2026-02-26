import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PDF_ITEMS = [
  { title: 'Programmheft', desc: 'Vollständiges Programmheft als PDF', href: '/Programmheft.pdf' },
  { title: 'Programmübersicht', desc: 'Detaillierte Zeitlinie aller Kurse', href: '/Programmuebersicht-2.pdf' },
  { title: 'Referenten', desc: 'Übersicht aller Referenten', href: '/Referenten.pdf' },
];

function PdfCard({
  item,
  index,
  onPreviewClick,
}: {
  item: (typeof PDF_ITEMS)[0];
  index: number;
  onPreviewClick: () => void;
}) {
  return (
    <motion.div
      className="pdf-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="pdf-card__header">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
      <div className="pdf-card__preview-toggle">
        <button
          type="button"
          className="pdf-card__preview-btn"
          onClick={onPreviewClick}
          aria-expanded={false}
        >
          <span>Vorschau anzeigen</span>
          <svg
            className="pdf-card__chevron"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="pdf-card__download">
        PDF herunterladen
      </a>
    </motion.div>
  );
}

export function Programm() {
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; href: string } | null>(null);

  useEffect(() => {
    if (!selectedPdf) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPdf(null);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [selectedPdf]);

  return (
    <section id="programm" className="section section--programm">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Programm & Zeitplan</span>
        </motion.div>
        <motion.div
          className="programm-intro-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="https://www.sportmedizin-arlberg.at" target="_blank" rel="noopener noreferrer" className="programm-intro-block__logo">
            <img src="/logo-contact.png" alt="Sportmedizin Arlberg" />
          </a>
          <div className="programm-intro-block__text">
            <p className="programm-intro">Der Schwerpunkt und das Thema des diesjährigen Kongresses im Jahr 2026 ist:</p>
            <p className="theme-quote">„Adipositas sportlich gedacht"</p>
            <div className="programm-text">
              <p>Weiters bietet das Reinhard-Suckert-Symposium eine Vielzahl interessanter Vorträge zu aktuellen Themen der Sportmedizin.</p>
              <p>Das Kongressprogramm beinhaltet Workshops sowie Theorie- und Praxisseminare, darunter das Praxisseminar „Schi Alpin" und Ärztesport. Bitte beachten Sie, dass die Teilnehmerzahl für Seminare und Workshops begrenzt ist.</p>
              <p>Wir freuen uns, Ihnen das digitale Programm zur Verfügung zu stellen. Bitte klicken Sie auf die folgenden Links:</p>
            </div>
          </div>
        </motion.div>

        <div className="pdf-grid">
          {PDF_ITEMS.map((item, i) => (
            <PdfCard
              key={item.title}
              item={item}
              index={i}
              onPreviewClick={() => setSelectedPdf({ title: item.title, href: item.href })}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedPdf && (
            <motion.div
              className="pdf-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPdf(null)}
            >
              <motion.div
                className="pdf-preview__content"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pdf-preview__header">
                  <span className="pdf-preview__title">{selectedPdf.title}</span>
                  <div className="pdf-preview__actions">
                    <a
                      href={selectedPdf.href}
                      download
                      className="pdf-preview__download-btn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download
                    </a>
                    <button
                      type="button"
                      className="pdf-preview__close"
                      onClick={() => setSelectedPdf(null)}
                      aria-label="Vorschau schließen"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="pdf-preview__frame-wrap">
                  <iframe
                    src={`${selectedPdf.href}#view=FitH`}
                    title={selectedPdf.title}
                    className="pdf-preview__iframe"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="programm-subsections">
          <motion.div
            className="programm-subsection"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="subsection-title">Referenten</h3>
            <p>
              Führende Sportärzte und Wissenschaftler werden Vorträge halten und Theorie- und Praxisseminare gestalten. Unsere Referenten sind anerkannte Experten in ihren jeweiligen Fachbereichen und tragen dazu bei, den Kongress zu einer hochwertigen Fortbildungsveranstaltung zu machen.
            </p>
          </motion.div>
          <motion.div
            className="programm-subsection"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="subsection-title">Vortragsunterlagen</h3>
            <p>
              Es werden lediglich Vortragsunterlagen im PDF-Format für den Grundkurs sowie für die Theorie- und Praxisseminare zur Verfügung gestellt. Diese können vor Ort über QR-Codes eingesehen und heruntergeladen werden. Bitte beachten Sie, dass keine gedruckten Unterlagen ausgegeben werden.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
