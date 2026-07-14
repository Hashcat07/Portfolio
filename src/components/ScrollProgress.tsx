import { motion, useScroll, useSpring } from 'framer-motion';

// Thin crimson progress bar across the very top, scaleX driven by scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left bg-accent"
      style={{ scaleX, boxShadow: '0 0 16px rgba(var(--accent-rgb), 0.55)' }}
    />
  );
}
