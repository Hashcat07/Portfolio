import { useEffect, useRef } from 'react';

// Spring-physics grid mesh (ported from the real Framer "InteractiveGrid" /
// KineticGrid), upgraded so the background is alive even when idle:
//  1. ambient breathing — every dot drifts on a slow sine field, so the mesh
//     gently undulates instead of sitting frozen until the cursor arrives;
//  2. crimson pulse ripples — every few seconds a ring expands from a random
//     dot, brightening dots/lines as it passes (subtle sonar sweep);
//  3. scroll drift — the whole field shifts slightly with scroll for depth.
// Cursor spring force + proximity brightening are unchanged.
export default function InteractiveGrid({ accent = '#c2303d' }: { accent?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gridSize = 58, radius = 360, dotSize = 1.6, gridThickness = 0.5, baseOpacity = 0.14;
    const repulsion = -0.65, maxDist = 400, springStiffness = 0.08, damping = 0.75;
    const mapped = repulsion <= 0 ? repulsion * 25 : repulsion * 90;
    const hex = (h: string) => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map((x) => x + x).join(''); const n = parseInt(h, 16); return { r: n >> 16 & 255, g: n >> 8 & 255, b: n & 255 }; };
    const acc = hex(accent), white = { r: 255, g: 255, b: 255 };

    let W = 0, H = 0, raf = 0;
    type Dot = { x: number; y: number; vx: number; vy: number; size: number; ph: number };
    const dots = new Map<string, Dot>();
    const build = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.clear();
      for (let gx = -gridSize; gx < W + gridSize * 2; gx += gridSize)
        for (let gy = -gridSize; gy < H + gridSize * 2; gy += gridSize)
          dots.set(gx + ',' + gy, { x: gx, y: gy, vx: 0, vy: 0, size: 1, ph: (gx * 0.011 + gy * 0.017) });
    };
    build();

    let mouse: { x: number; y: number } | null = null;
    const move = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      mouse = (x >= 0 && y >= 0 && x <= W && y <= H) ? { x, y } : null;
    };
    const hover = (x: number, y: number) => {
      if (!mouse) return 0;
      const d = Math.hypot(x - mouse.x, y - mouse.y);
      return d > radius ? 0 : Math.pow(1 - d / radius, 3.5);
    };
    const push = (bx: number, by: number) => {
      if (!mouse || mapped === 0) return { x: 0, y: 0 };
      const dx = bx - mouse.x, dy = by - mouse.y, d = Math.hypot(dx, dy);
      if (d === 0) return { x: 0, y: 0 };
      const n = Math.min(d / maxDist, 1), p = Math.pow(1 - n, 2) * mapped;
      return { x: dx / d * p, y: dy / d * p };
    };

    // roaming pulse ripple
    let pulse = { x: 0, y: 0, r: 0, active: false };
    const firePulse = () => {
      pulse = { x: Math.random() * W, y: Math.random() * H, r: 0, active: true };
    };
    const pulseTimer = reduced ? 0 : window.setInterval(firePulse, 4200);
    const PULSE_SPEED = 5.2, PULSE_BAND = 110;
    const pulseGlow = (x: number, y: number) => {
      if (!pulse.active) return 0;
      const d = Math.abs(Math.hypot(x - pulse.x, y - pulse.y) - pulse.r);
      return d > PULSE_BAND ? 0 : Math.pow(1 - d / PULSE_BAND, 2) * 0.7;
    };

    // scroll drift
    let scrollDrift = 0, lastScroll = window.scrollY;
    const onScroll = () => {
      scrollDrift += (window.scrollY - lastScroll) * 0.03;
      lastScroll = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const t0 = performance.now();
    const draw = () => {
      const tm = (performance.now() - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      scrollDrift *= 0.92;
      if (pulse.active) { pulse.r += PULSE_SPEED; if (pulse.r > Math.max(W, H) * 1.2) pulse.active = false; }

      dots.forEach((dot, key) => {
        const [gxs, gys] = key.split(','); const gx = +gxs, gy = +gys;
        const right = dots.get((gx + gridSize) + ',' + gy);
        const bottom = dots.get(gx + ',' + (gy + gridSize));
        const hi = Math.max(hover(dot.x, dot.y), pulseGlow(dot.x, dot.y));
        [right, bottom].forEach((nb) => {
          if (!nb) return;
          const avg = (hi + Math.max(hover(nb.x, nb.y), pulseGlow(nb.x, nb.y))) / 2;
          const r = Math.round(white.r + (acc.r - white.r) * avg);
          const g = Math.round(white.g + (acc.g - white.g) * avg);
          const b = Math.round(white.b + (acc.b - white.b) * avg);
          const op = baseOpacity + (1 - baseOpacity) * avg;
          ctx.beginPath(); ctx.moveTo(dot.x, dot.y); ctx.lineTo(nb.x, nb.y);
          ctx.lineWidth = gridThickness + avg * 2;
          ctx.strokeStyle = `rgba(${r},${g},${b},${op * 0.5})`;
          ctx.stroke();
        });
      });

      dots.forEach((dot, key) => {
        const [gxs, gys] = key.split(','); const gx = +gxs, gy = +gys;
        const p = push(gx, gy);
        // ambient breathing: slow per-dot sine drift (skipped for reduced motion)
        const ax = reduced ? 0 : Math.sin(tm * 0.5 + dot.ph) * 3.2;
        const ay = reduced ? 0 : Math.cos(tm * 0.4 + dot.ph * 1.3) * 3.2 + scrollDrift;
        dot.vx = (dot.vx + (gx + p.x + ax - dot.x) * springStiffness) * damping;
        dot.vy = (dot.vy + (gy + p.y + ay - dot.y) * springStiffness) * damping;
        dot.x += dot.vx; dot.y += dot.vy;
        const hi = Math.max(hover(dot.x, dot.y), pulseGlow(dot.x, dot.y));
        dot.size += (dotSize + hi * dotSize - dot.size) * 0.15;
        const r = Math.round(white.r + (acc.r - white.r) * hi);
        const g = Math.round(white.g + (acc.g - white.g) * hi);
        const b = Math.round(white.b + (acc.b - white.b) * hi);
        const op = baseOpacity + (1 - baseOpacity) * hi;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(dotSize * 0.5, dot.size), 0, 6.2832);
        ctx.fillStyle = `rgba(${r},${g},${b},${op})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('resize', build);
    return () => {
      cancelAnimationFrame(raf);
      if (pulseTimer) clearInterval(pulseTimer);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('resize', build);
      window.removeEventListener('scroll', onScroll);
    };
  }, [accent]);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 w-full h-full z-[2] pointer-events-none" />;
}
