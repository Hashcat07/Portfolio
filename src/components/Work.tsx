import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '../lib/motion';
import { PROJECTS, type Project } from '../data';

// One project image card: 3D tilt toward the cursor + a soft spotlight that
// tracks the pointer + a scroll-into-view mask wipe on the image.
function ProjectMedia({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const tone = project.tone === 'deep' ? 'var(--accent-deep-rgb)' : 'var(--accent-rgb)';
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}% ${my}%, rgba(${tone},0.18), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12); rx.set(-py * 12);
    mx.set((px + 0.5) * 100); my.set((py + 0.5) * 100);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="flex-1 min-w-[300px] relative"
      style={{ perspective: 900 }}
    >
      <div className="absolute -inset-px rounded-2xl blur-[22px] opacity-70"
        style={{ background: `radial-gradient(circle at 50% 50%, rgba(${tone},0.3), transparent 70%)` }} />
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative rounded-[14px] overflow-hidden border"
      >
        <div className="absolute inset-0 border rounded-[14px] z-10 pointer-events-none"
          style={{ borderColor: `rgba(${tone},0.22)` }} />
        <motion.img
          src={project.image} alt={`${project.title} interface mockup`}
          className="block w-full aspect-[4/3] object-cover bg-[#050506]"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 0.84, 0.3, 1] }}
        />
        <motion.div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen" style={{ background: spotlight }} />
      </motion.div>
    </motion.div>
  );
}

function ProjectText({ project, reverse }: { project: Project; reverse?: boolean }) {
  return (
    <div className={`flex-1 min-w-[300px] ${reverse ? 'md:order-2' : ''}`}>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[13px] text-accent">/{project.index}</span>
        <span className="font-mono text-[12px] tracking-[0.1em] text-paper/40">{project.year}</span>
      </div>
      <motion.h3
        whileHover={{ x: 14 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="mt-[10px] mb-0 font-display font-extrabold leading-[0.92] tracking-[-0.02em]"
        style={{ fontSize: 'clamp(34px,5vw,72px)' }}>
        <a href={project.href} target="_blank" rel="noreferrer" data-cursor="hover"
          className="no-underline text-paper transition-colors hover:text-accent">
          {project.title}<span className="text-accent text-[0.4em] align-super ml-2">↗</span>
        </a>
      </motion.h3>
      <p className="max-w-[440px] mt-[18px] mb-[22px] text-[15px] leading-[1.65] text-paper/60">{project.desc}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <motion.span key={t} data-cursor="hover"
            whileHover={{ y: -3, borderColor: '#c2303d', color: '#eef0f6' }}
            transition={{ duration: 0.2, ease: [0.16, 0.84, 0.3, 1] }}
            className="font-mono text-[11px] tracking-[0.06em] text-paper/70 border border-paper/[0.18] rounded-full px-[13px] py-[6px] cursor-default">{t}</motion.span>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative z-[5] px-5 sm:px-8 pt-[60px] pb-20 sm:pb-[130px]">
      <Reveal variant="up" className="flex justify-between items-baseline flex-wrap gap-4 border-t border-line pt-[30px] mb-[54px]">
        <span className="font-mono text-[12px] tracking-[0.2em] text-accent">02 — SELECTED WORK</span>
        <span className="font-mono text-[12px] tracking-[0.1em] text-paper/40">2024 — 2025 · [ 03 ]</span>
      </Reveal>

      <div className="flex flex-col">
        {PROJECTS.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={p.title} variant={reverse ? 'right' : 'left'} amount={0.2}
              className="flex flex-wrap gap-[46px] items-center py-10 px-6 border-t border-line rounded-[18px] transition-colors duration-500 hover:bg-accent/[0.04]">
              {reverse ? <><ProjectMedia project={p} /><ProjectText project={p} reverse /></>
                       : <><ProjectText project={p} /><ProjectMedia project={p} /></>}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
