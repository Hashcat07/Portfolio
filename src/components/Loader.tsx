import { AnimatePresence, motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useEffect, useState } from 'react';

// Cinematic intro overlay — AMOLED black, one crimson accent. A huge tabular
// counter ticks 000→100 while a cursor-tracking crimson glow follows the
// pointer (interactive), the name reveals per-letter from a clip, a mono
// status line steps through phases, and a full-width crimson meter fills at
// the bottom. On completion the whole curtain wipes up with a crimson
// trailing edge. Content is unchanged — only the treatment.
const STATUS = [
  [0, 'INITIALIZING'],
  [28, 'LOADING ASSETS'],
  [55, 'COMPILING MOTION'],
  [82, 'CALIBRATING GRID'],
  [100, 'READY'],
] as const;

type StatusLabel = (typeof STATUS)[number][1];

function statusFor(p: number): StatusLabel {
  let s: StatusLabel = STATUS[0][1];
  for (const [t, label] of STATUS) if (p >= t) s = label;
  return s;
}

const NAME = 'ROHUL RAY';

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  // cursor-tracking glow
  const gx = useMotionValue(50);
  const gy = useMotionValue(40);
  const sgx = useSpring(gx, { stiffness: 120, damping: 20 });
  const sgy = useSpring(gy, { stiffness: 120, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${sgx}% ${sgy}%, rgba(var(--accent-rgb),0.18), transparent 60%)`;

  useEffect(() => {
    let p = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      p = Math.min(100, p + Math.random() * 12 + 4);
      setPct(Math.round(p));
      if (p < 100) t = setTimeout(tick, 110 + Math.random() * 90);
      else t = setTimeout(() => { setGone(true); onDone?.(); }, 560);
    };
    t = setTimeout(tick, 320);
    return () => clearTimeout(t);
  }, [onDone]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      gx.set((e.clientX / window.innerWidth) * 100);
      gy.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [gx, gy]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[500] bg-black overflow-hidden"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* interactive cursor glow */}
          <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: glow }} />

          {/* faint grid ticks for depth */}
          <div aria-hidden className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(#eef0f6 1px, transparent 1px), linear-gradient(90deg, #eef0f6 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

          {/* top status row */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 pt-8 font-mono text-[11px] tracking-[0.28em] text-paper/45">
            <span className="flex items-center gap-2">
              <motion.span className="w-[6px] h-[6px] rounded-full bg-accent"
                animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
              {statusFor(pct)}
            </span>
            <span>PORTFOLIO — 2026</span>
          </div>

          {/* center name — per-letter clip reveal */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <h1 className="font-display font-extrabold tracking-[-0.045em] leading-[0.9] flex" style={{ fontSize: 'clamp(44px,11vw,150px)' }}>
              {NAME.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
                  <motion.span
                    className="inline-block text-paper"
                    initial={{ y: '115%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.7, ease: [0.16, 0.84, 0.3, 1], delay: 0.2 + i * 0.05 }}
                  >
                    {ch === ' ' ? ' ' : ch}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              className="font-serif italic text-accent mt-1"
              style={{ fontSize: 'clamp(16px,3vw,30px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              software developer
            </motion.div>
          </div>

          {/* giant tabular counter, bottom-left */}
          <div className="absolute left-6 sm:left-10 bottom-14 font-mono font-bold text-accent leading-none tabular-nums select-none"
            style={{ fontSize: 'clamp(40px,8vw,96px)' }}>
            {String(pct).padStart(3, '0')}
            <span className="text-paper/30 text-[0.4em] align-top ml-1">%</span>
          </div>

          {/* bottom meter */}
          <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-paper/10">
            <motion.div className="h-full origin-left bg-accent"
              style={{ scaleX: pct / 100, boxShadow: '0 0 18px rgba(var(--accent-rgb),0.7)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
