import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform, useVelocity, useSpring, wrap } from 'framer-motion';
import { useRef } from 'react';
import { MARQUEE } from '../data';

// Infinite marquee loop, tuned premium: soft fade masks at both edges (items
// dissolve in/out instead of hard-clipping), a slower cruising speed that
// warps + skews with scroll velocity, crisp uppercase display type with a
// dimmed crimson tick between items, and GPU-pinned transforms so the loop
// stays razor sharp while moving.
export default function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const smoothVel = useSpring(scrollVel, { damping: 50, stiffness: 400 });
  const velFactor = useTransform(smoothVel, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smoothVel, [-1000, 0, 1000], [-6, 0, 6], { clamp: true });

  const x = useTransform(baseX, (v: number) => `${wrap(-25, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * 2.6 * (delta / 1000);
    const vf = velFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const Row = () => (
    <span className="flex items-center shrink-0">
      {MARQUEE.map((t, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="px-7 sm:px-9">{t}</span>
          <span aria-hidden className="w-[5px] h-[5px] rotate-45 bg-accent/70 shrink-0" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="relative z-[5] border-y border-line bg-black/60 backdrop-blur-sm overflow-hidden py-4 sm:py-5"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <motion.div
        className="flex w-max font-display font-bold text-[15px] sm:text-[17px] tracking-[0.14em] text-paper/60 whitespace-nowrap uppercase will-change-transform"
        style={{ x, skewX: skew, transform: 'translateZ(0)' }}
      >
        <Row /><Row /><Row /><Row />
      </motion.div>
    </div>
  );
}
