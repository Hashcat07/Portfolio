import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Reveal, SplitText, EASE } from '../lib/motion';
import RotatingWords from './RotatingWords';
import MagneticButton from './MagneticButton';
import { TextScramble } from './ui/text-scramble';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const [showIntro, setShowIntro] = useState(true);

  const go = (id: string) => () => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 10, behavior: 'smooth' });
  };

  return (
    <section ref={ref} id="home" className="relative z-[5] min-h-screen flex flex-col justify-between px-5 sm:px-8 pt-[100px] sm:pt-[120px] pb-9 overflow-hidden">
      {/* top row */}
      <div className="relative z-[6] flex justify-between items-start flex-wrap gap-6">
        <div className="max-w-[660px]">
          <Reveal variant="up" className="font-mono text-[12px] tracking-[0.22em] text-accent mb-5">
            ✦ SOFTWARE DEVELOPER — JAVA · SPRING BOOT · REACT.JS
          </Reveal>
          <h1 className="m-0 font-display font-bold leading-[0.94] tracking-[-0.025em]" style={{ fontSize: 'clamp(40px,5.6vw,84px)' }}>
            <SplitText text="Building the web," />{' '}
            <span className="font-serif italic font-semibold text-accent">precisely.</span>
          </h1>
          <Reveal variant="up" delay={0.12} as="p" className="max-w-[440px] mt-6 text-[15.5px] leading-[1.65] text-paper/60">
            Final-year CS engineer building full-stack apps — layered Spring Boot APIs behind responsive React SPAs, tested with JUnit &amp; Jest.
          </Reveal>
          <Reveal variant="up" delay={0.2} className="mt-[18px] font-mono text-[13px] tracking-[0.12em] text-paper/50">
            BUILDING REAL-TIME <RotatingWords />
          </Reveal>
          <Reveal variant="up" delay={0.3} className="mt-9">
            <button onClick={go('work')} className="bg-transparent border-0 p-0">
              <TextScramble text="VIEW WORK" />
            </button>
          </Reveal>
        </div>
        <Reveal variant="up" delay={0.1} className="font-mono text-[11px] tracking-[0.08em] text-paper/40 text-left sm:text-right leading-[1.9]">
          LAT 08.0883° N<br />LON 77.5385° E<br />
          <span className="text-paper/[0.72]">KANYAKUMARI · TN</span><br />EST. 2027 ◴
        </Reveal>
      </div>

      {/* bottom row */}
      <div className="relative z-[6] flex justify-between items-end flex-wrap gap-[30px]">
        <motion.div style={{ y: nameY }} className="will-change-transform">
          <Reveal variant="up" className="font-mono text-[11px] tracking-[0.2em] text-paper/45 mb-2">
            PORTFOLIO ²⁰²⁶ — SELECTED CRAFT
          </Reveal>
          <h2 className="m-0 font-display font-extrabold leading-[0.82] tracking-[-0.035em]" style={{ fontSize: 'clamp(56px,13.5vw,210px)' }}>
            <SplitText text="ROHUL RAY" />
            <span className="text-[0.28em] align-super text-accent font-mono">EDWARD·S</span>
          </h2>
        </motion.div>

        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            data-cursor="hover"
            className="w-[310px] flex-none rounded-2xl p-[17px] backdrop-blur-2xl border"
            style={{ background: 'rgba(8,7,9,0.72)', borderColor: 'rgba(var(--accent-rgb),0.25)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
            <div className="flex gap-[11px] items-start">
              <div className="w-[34px] h-[34px] flex-none rounded-[9px] grid place-items-center font-display font-extrabold text-black text-[15px] bg-accent">◆</div>
              <p className="m-0 text-[12.5px] leading-[1.55] text-paper/[0.82]">
                Welcome <span className="text-accent">—</span> a software developer building precise, test-driven apps with Java &amp; React.
              </p>
            </div>
            <div className="flex justify-between items-center mt-[14px]">
              <MagneticButton onClick={go('work')} className="border-0 bg-paper text-black font-mono font-bold text-[11px] tracking-[0.1em] px-4 py-2 rounded-full">
                ENTER ↘
              </MagneticButton>
              <button onClick={() => setShowIntro(false)} data-cursor="hover"
                className="border-0 bg-transparent text-paper/50 font-mono text-[11px] tracking-[0.1em]">SKIP</button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
