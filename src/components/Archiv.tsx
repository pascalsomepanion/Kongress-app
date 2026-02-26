import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ARCHIV_ITEMS: { year: number; href: string }[] = [
  { year: 2025, href: '#' },
  { year: 2024, href: '/archiv/Programmheft2024.pdf' },
  { year: 2023, href: '/archiv/Programmheft2023.pdf' },
  { year: 2020, href: '/archiv/Programmheft2020.pdf' },
  { year: 2019, href: '/archiv/Programmheft2019.pdf' },
  { year: 2018, href: '/archiv/Programmheft2018.pdf' },
  { year: 2017, href: '/archiv/Programmheft2017.pdf' },
];

export function Archiv() {
  const [selectedPdf, setSelectedPdf] = useState<{ year: number; href: string } | null>(null);

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
    <section id="archiv" className="section section--light section--archiv">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Archiv</span>
        </motion.div>
        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Programmhefte und Bilder aus den vergangenen Jahren
        </motion.p>
        <div className="archiv-grid">
          {ARCHIV_ITEMS.map((item, i) => (
            <motion.div
              key={item.year}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPdf(item)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPdf(item)}
              className="archiv-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
            >
              <div className="archiv-card__cover">
                <div className="archiv-card__spine" />
                <div className="archiv-card__inner">
                  <div className="archiv-card__icon-wrap">
                    <svg className="archiv-card__icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      <line x1="8" y1="7" x2="16" y2="7"/>
                      <line x1="8" y1="11" x2="16" y2="11"/>
                    </svg>
                  </div>
                  <span className="archiv-card__year">{item.year}</span>
                  <span className="archiv-card__label">Programmheft</span>
                </div>
              </div>
            </motion.div>
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
                  <span className="pdf-preview__title">Programmheft {selectedPdf.year}</span>
                  <div className="pdf-preview__actions">
                    {selectedPdf.href !== '#' && (
                      <a
                        href={selectedPdf.href}
                        download={`Programmheft${selectedPdf.year}.pdf`}
                        className="pdf-preview__download-btn"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download
                      </a>
                    )}
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
                {selectedPdf.href !== '#' ? (
                  <div className="pdf-preview__frame-wrap">
                    <iframe
                      src={`${selectedPdf.href}#view=FitH`}
                      title={`Programmheft ${selectedPdf.year}`}
                      className="pdf-preview__iframe"
                    />
                  </div>
                ) : (
                  <div className="pdf-preview__placeholder">
                    <p>Das Programmheft wird in Kürze verfügbar sein.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
