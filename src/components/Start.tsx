import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GASTVORTRAG_IMAGE = '/gastvortrag.png';

export function Start() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const lightbox = (
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          key="gastvortrag-lightbox"
          className="image-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxOpen(false)}
        >
          <motion.div
            className="image-lightbox__content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="image-lightbox__close"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              aria-label="Bild schließen"
            >
              ×
            </button>
            <img src={GASTVORTRAG_IMAGE} alt="Gastvortrag – Univ.-Prof. Dr. Kurt Matzler vergrößert" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return (
    <section id="start" className="section section--light section--welcome">
      <div className="container container--welcome">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Herzlich Willkommen</span>
        </motion.div>

        <div className="welcome-grid">
          <div className="welcome__content">
          <motion.p
            className="welcome__lead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Die Österreichische Gesellschaft für Sportmedizin und Prävention (ÖGSMP) richtet im Jahr 2026 bereits zum 59. Mal den Internationalen Fortbildungskongress für Sportmedizin in St. Christoph aus. Dieser Kongress gilt als die traditionsreichste und größte Fortbildungsveranstaltung im Bereich der Sportmedizin in Österreich.
          </motion.p>
          <motion.h3
            className="subsection-title subsection-title--small"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <strong>Die Schwerpunkte des Kongresses umfassen:</strong>
          </motion.h3>
          <motion.ul
            className="welcome__list"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <li>Leistungsphysiologisch Internistisch Pädiatrischer Grundkurs (LIP GK IV)</li>
            <li>Theorie- und Praxisseminare (TS, PS)</li>
            <li>Workshops (WS)</li>
            <li>Schi-Alpin & Ärztesport</li>
            <li>Das Reinhard-Suckert-Symposium (RSS)</li>
          </motion.ul>
          <motion.div
            className="pull-quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <p>Beim Reinhard-Suckert-Symposium werden sportmedizinische Themen aus verschiedensten Disziplinen präsentiert und diskutiert. Der ÖGSMP liegt es dabei am Herzen, den Kolleginnen und Kollegen eine <strong>Fortbildung auf höchstem Niveau</strong> zu bieten.</p>
          </motion.div>
          <motion.div
            className="contact-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung:</p>
            <a href="mailto:info@sportmedizin-arlberg.at">info@sportmedizin-arlberg.at</a>
          </motion.div>
          <motion.p
            className="signature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Mit sportlichen Grüßen,
            <br />
            <strong>Prof. h.c. Univ.-Doz. Dr. Günther Neumayr</strong>
          </motion.p>
          </div>

          <motion.aside
            className="gastvortrag-preview"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="gastvortrag-preview__image gastvortrag-preview__image--clickable"
              role="button"
              tabIndex={0}
              onClick={() => setLightboxOpen(true)}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
              aria-label="Bild vergrößern"
            >
              <img src={GASTVORTRAG_IMAGE} alt="Gastvortrag – Univ.-Prof. Dr. Kurt Matzler, Extremsportler & Strategie Experte, 01.03. 17:00 – 19:00" />
            </div>
          </motion.aside>
          {createPortal(lightbox, document.body)}
        </div>
      </div>
    </section>
  );
}
