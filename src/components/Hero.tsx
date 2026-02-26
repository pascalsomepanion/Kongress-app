import { motion } from 'framer-motion';
import { ScrollIndicator } from './ScrollIndicator';

const HERO_IMAGE = '/hero-bild.png';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <motion.img
          src={HERO_IMAGE}
          alt="Alpenpanorama St. Christoph am Arlberg"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          59. Internationaler
          <br />
          Kongress <span className="hero__title-word--lowercase">für</span> Sportmedizin
        </motion.h1>
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          St. Christoph a. A.
        </motion.p>
        <motion.p
          className="hero__date"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          01.03.2026 – 06.03.2026
        </motion.p>
      </div>
      <ScrollIndicator href="#start" label="Mehr entdecken" />
    </section>
  );
}
