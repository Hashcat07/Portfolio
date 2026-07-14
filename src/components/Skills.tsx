import { motion } from 'framer-motion';
import { Reveal, SplitText, Stagger, StaggerItem } from '../lib/motion';
import { SKILLS } from '../data';

// One skill line — individually hover-responsive: slides right, brightens,
// and grows a crimson tick on the left. 150–300ms micro-interaction range.
function SkillItem({ label }: { label: string }) {
  return (
    <motion.div
      data-cursor="hover"
      className="group relative flex items-center font-sans font-medium text-[17px] leading-[2] text-paper/75 cursor-default"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.span
        aria-hidden
        className="absolute left-0 h-[2px] bg-accent rounded-full"
        variants={{ rest: { width: 0, opacity: 0 }, hover: { width: 14, opacity: 1 } }}
        transition={{ duration: 0.22, ease: [0.16, 0.84, 0.3, 1] }}
      />
      <motion.span
        className="inline-block"
        variants={{ rest: { x: 0, color: 'rgba(238,240,246,0.75)' }, hover: { x: 22, color: '#eef0f6' } }}
        transition={{ duration: 0.22, ease: [0.16, 0.84, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

// Bento-style capability grid: one column per cluster, hover-tinted, with a
// faint ghosted "CRAFT" headline drifting behind (atmospheric type).
export default function Skills() {
  return (
    <section id="skills" className="relative z-[5] px-5 sm:px-8 py-20 sm:py-[120px] overflow-hidden border-t border-line">
      <div aria-hidden className="absolute top-8 inset-x-0 text-center pointer-events-none select-none font-display font-extrabold leading-[0.92] tracking-[-0.02em]">
        <div className="text-paper/[0.05]" style={{ fontSize: 'clamp(60px,15vw,200px)' }}>CRAFT</div>
        <div className="text-accent/[0.04] -mt-[3vw]" style={{ fontSize: 'clamp(60px,15vw,200px)' }}>CRAFT</div>
      </div>

      <div className="relative z-[2]">
        <Reveal variant="up" className="font-mono text-[12px] tracking-[0.2em] text-accent mb-[18px]">03 — CAPABILITIES</Reveal>
        <h2 className="m-0 mb-[70px] font-display font-extrabold leading-[0.86] tracking-[-0.03em]" style={{ fontSize: 'clamp(48px,11vw,150px)' }}>
          <SplitText text="Principles" /><br /><SplitText text="& Stack." />
        </h2>

        <Stagger gap={0.1} className="grid gap-px border border-line rounded-[14px] overflow-hidden"
          style={{ background: 'rgba(238,240,246,0.08)', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))' }}>
          {SKILLS.map((s) => (
            <StaggerItem key={s.code} className="h-full">
              <div className="h-full bg-black px-6 py-7 transition-colors duration-300 hover:bg-accent/[0.05]">
                <div className={`font-mono text-[11px] tracking-[0.14em] mb-4 ${s.tone === 'accent' ? 'text-accent' : 'text-paper'}`}>
                  {s.code} / {s.label.toUpperCase()}
                </div>
                <div>
                  {s.items.map((it) => <SkillItem key={it} label={it} />)}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
