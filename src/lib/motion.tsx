import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { Fragment, useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';

// Shared spring/easing tokens so every animation in the app shares one rhythm.
export const EASE = [0.16, 0.84, 0.3, 1] as const;
export const SPRING = { type: 'spring', stiffness: 90, damping: 18, mass: 0.9 } as const;

type VariantName = 'up' | 'left' | 'right' | 'scale' | 'blur';

const VARIANTS: Record<VariantName, Variants> = {
  up:    { hidden: { opacity: 0, y: 48 },              show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -64 },             show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 64 },              show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, y: 32, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1 } },
  blur:  { hidden: { opacity: 0, y: 28, filter: 'blur(14px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } },
};

interface RevealProps {
  children: ReactNode;
  variant?: VariantName;
  delay?: number;
  className?: string;
  as?: ElementType;
  amount?: number;
  [key: string]: unknown;
}

export function Reveal({ children, variant = 'up', delay = 0, className, as = 'div', amount = 0.2, ...rest }: RevealProps) {
  const MotionTag = (motion as unknown as Record<string, ElementType>)[as as string] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={VARIANTS[variant]}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  amount?: number;
  [key: string]: unknown;
}

export function Stagger({ children, className, gap = 0.08, amount = 0.2, ...rest }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, variant = 'up', ...rest }: { children: ReactNode; className?: string; variant?: VariantName; [key: string]: unknown }) {
  return (
    <motion.div className={className} variants={VARIANTS[variant]} transition={{ duration: 0.7, ease: EASE }} {...rest}>
      {children}
    </motion.div>
  );
}

// SplitText — per-word mask reveal for headings. Built as a variants PARENT
// driven by `whileInView` on the UNCLIPPED outer span (the same declarative
// pattern Stagger uses, which fires reliably). Each word is a variant child
// that rolls up out of its overflow-hidden clip. Observing the clipped word
// directly reports 0% intersection (it's pushed out of the clip) so a per-word
// trigger never fires — driving it from the unclipped parent fixes that.
const WORD_PARENT = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});
const WORD_CHILD: Variants = { hidden: { y: '115%' }, show: { y: '0%' } };

export function SplitText({ text, className, delay = 0, wordClass = '' }: { text: string; className?: string; delay?: number; wordClass?: string }) {
  const words = String(text).split(' ');
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -8% 0px' }}
      variants={WORD_PARENT(delay, 0.05)}
      style={{ display: 'inline' }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom', lineHeight: 'inherit' }}>
            <motion.span className={`inline-block ${wordClass}`} variants={WORD_CHILD} transition={{ duration: 0.7, ease: EASE }}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.span>
  );
}

// CountUp — animates a number from 0 to target once it enters the viewport.
export function CountUp({ value, decimals = 0, pad = 0, className }: { value: number; decimals?: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IO can lag when the main thread is busy with canvas rAF work, so a
    // rect check on mount + scroll acts as a guaranteed fallback trigger.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) { setInView(true); cleanup(); return true; }
      return false;
    };
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setInView(true); cleanup(); } }, { threshold: 0.3 });
    const onScroll = () => check();
    function cleanup() {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    }
    if (check()) return cleanup;
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return cleanup;
  }, []);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v: number) => {
    let s = v.toFixed(decimals);
    if (pad && decimals === 0) s = String(Math.round(v)).padStart(pad, '0');
    return s;
  });
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
