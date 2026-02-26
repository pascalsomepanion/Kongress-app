import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SPONSORS, type Sponsor } from '../data/sponsors';

function SponsorCard({ sponsor, index }: { sponsor: Sponsor; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="sponsor-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
    >
      <div className="sponsor-card__inner">
        <div className="sponsor-card__glow" />
        <div className="sponsor-card__content">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="sponsor-card__logo"
          />
          <span className="sponsor-card__url">
            {new URL(sponsor.url).hostname.replace(/^www\./, '')}
          </span>
        </div>
        <div className="sponsor-card__shine" />
      </div>
    </motion.a>
  );
}

export function Sponsoren() {
  const marqueeItems = [...SPONSORS, ...SPONSORS];

  return (
    <section id="sponsoren" className="section section--sponsoren">
      <div className="sponsoren-bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          className="sponsoren-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Sponsoren</span>
          <p className="sponsoren-subtitle">
            Unternehmen, die unseren Kongress unterstützen
          </p>
        </motion.div>

        <div className="sponsoren-grid">
          {SPONSORS.map((sponsor, i) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} index={i} />
          ))}
        </div>

        <div className="sponsoren-marquee-wrapper">
          <div className="sponsoren-marquee">
            {marqueeItems.map((sponsor, i) => (
              <a
                key={`${sponsor.id}-${i}`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsoren-marquee__item"
              >
                <img src={sponsor.logo} alt={sponsor.name} />
              </a>
            ))}
          </div>
        </div>

        <motion.div
          className="sponsoren-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="sponsoren-cta__card">
            <div className="sponsoren-cta__icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <p className="sponsoren-cta__text">
              Interesse an einer Sponsoring-Partnerschaft?
            </p>
            <a
              href="mailto:info@sportmedizin-arlberg.at"
              className="sponsoren-cta__link"
            >
              <span>info@sportmedizin-arlberg.at</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
