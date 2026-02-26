import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const NAV_LINKS = [
  { href: '#start', label: 'Start' },
  { href: '#programm', label: 'Programm' },
  { href: '#info', label: 'Info' },
  { href: '#anmeldung', label: 'Anmeldung' },
  { href: '#sponsoren', label: 'Sponsoren' },
  { href: '#archiv', label: 'Archiv' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="header__inner">
          <div className="header__left">
            <a href="#" className="header__logo">
              <img src="/logo.png" alt="Sportmedizin Arlberg" />
            </a>
            <a href="#" className="header__date" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <span>01.03.2026</span>
              <span>–</span>
              <span>06.03.2026</span>
            </a>
          </div>
          <nav className="header__nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`header__link ${link.label === 'Anmeldung' ? 'header__link--highlight' : ''}`}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            className="header__menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-menu__link ${link.label === 'Anmeldung' ? 'mobile-menu__link--highlight' : ''}`}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: transparent;
          border: none;
          transition: all 0.3s ease;
        }

        .header.scrolled .header__date {
          color: var(--primary) !important;
          text-shadow: none;
        }

        .header.scrolled .header__link {
          color: var(--navy);
          text-shadow: none;
        }

        .header.scrolled .header__link:hover {
          color: var(--navy);
          background: rgba(10, 22, 40, 0.06);
        }

        .header.scrolled .header__menu-btn {
          color: var(--navy);
          filter: none;
        }

        .header__inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .header__left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header__logo img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .header__date {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: capitalize;
          color: var(--primary);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.4);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          cursor: pointer;
        }

        .header__nav {
          display: flex;
          gap: 4px;
        }

        .header__link {
          padding: 10px 16px;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: capitalize;
          color: white;
          border-radius: 10px;
          transition: all 0.2s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.3);
        }

        .header__link:hover {
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.1);
        }

        .header__link--highlight {
          color: var(--primary) !important;
          font-weight: 700;
        }

        .header.scrolled .header__link--highlight {
          color: var(--primary) !important;
          font-weight: 700;
        }

        .header__menu-btn {
          display: none;
          background: none;
          border: none;
          padding: 8px;
          color: white;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
        }

        .mobile-menu {
          position: fixed;
          top: 84px;
          left: 0;
          right: 0;
          z-index: 999;
          background: var(--white);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: var(--shadow-lg);
        }

        .mobile-menu__link {
          padding: 14px 20px;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: capitalize;
          color: var(--text);
          border-radius: 10px;
          transition: background 0.2s;
        }

        .mobile-menu__link:hover {
          background: var(--snow);
        }

        .mobile-menu__link--highlight {
          color: var(--primary) !important;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .header__nav { display: none; }
          .header__menu-btn { display: flex; align-items: center; justify-content: center; }
          .header__left { align-items: center; }
        }
      `}</style>
    </>
  );
}
