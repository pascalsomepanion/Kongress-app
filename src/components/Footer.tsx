import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <motion.div
          className="footer__content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="footer__logo">
            <img src="/logo-footer.png" alt="Sportmedizin Arlberg" />
          </div>
          <blockquote className="footer__quote">
            Sportmedizin im Herzen der Alpen.<br className="footer__quote-break" /> Wissen, das bewegt!
          </blockquote>
          <div className="footer__copyright">
            <a href="https://neumayr-lienz.at/" target="_blank" rel="noopener noreferrer">
              © Prof. h.c. Univ.-Doz. Dr. Günther Neumayr
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
