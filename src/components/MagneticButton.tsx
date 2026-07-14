import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type ElementType } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  as?: ElementType;
  strength?: number;
  className?: string;
  [key: string]: unknown;
}

// Magnetic — element subtly pulls toward the cursor while hovered, springs
// back on leave. Used on the nav CTA, logo and primary buttons.
export default function MagneticButton({ children, as = 'button', strength = 0.4, className, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.5 });
  const MotionTag = (motion as unknown as Record<string, ElementType>)[as as string] || motion.button;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="hover"
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
