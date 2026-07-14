import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ROTATING_WORDS } from '../data';
import { EASE } from '../lib/motion';

// Vertical word-roll cycler — one word swaps out (up + fade) as the next rolls
// in from below. Single child in the grid so only one word shows at a time.
export default function RotatingWords() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROTATING_WORDS.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-grid overflow-hidden align-bottom" style={{ height: '1.3em', minWidth: 132 }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={i}
          className="text-accent font-bold col-start-1 row-start-1"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {ROTATING_WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
