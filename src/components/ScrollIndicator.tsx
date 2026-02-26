import { motion } from 'framer-motion';

type ScrollIndicatorProps = {
  href?: string;
  label?: string;
};

export function ScrollIndicator({ href = '#start', label = 'Mehr entdecken' }: ScrollIndicatorProps) {
  return (
    <motion.a
      href={href}
      className="scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      aria-label={label}
    >
      <span className="scroll-indicator__text">{label}</span>
      <motion.span
        className="scroll-indicator__arrow"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.span>
    </motion.a>
  );
}
