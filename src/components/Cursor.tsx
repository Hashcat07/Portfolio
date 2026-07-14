import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

// Custom magnetic cursor: a hard dot that tracks 1:1 and a soft ring that
// lags via spring. The ring swells + turns deep-crimson over anything marked
// data-cursor="hover" (links, buttons, magnetic elements).
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-cursor="hover"], a, button');
      setHovering(!!t);
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.span
        aria-hidden
        className="fixed top-0 left-0 z-[400] rounded-full pointer-events-none mix-blend-difference bg-paper"
        style={{ x, y, width: 6, height: 6, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.span
        aria-hidden
        className="fixed top-0 left-0 z-[400] rounded-full pointer-events-none mix-blend-difference border"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          borderColor: hovering ? '#c2303d' : 'rgba(238,240,246,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
    </>
  );
}
