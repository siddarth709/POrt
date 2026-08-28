// Shared framer-motion variants used across sections for a consistent "premium" scroll feel.

export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 70 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export const modalVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const viewportOnce = { once: true, amount: 0.2 };

