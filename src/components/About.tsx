import { Reveal, SplitText, CountUp } from '../lib/motion';
import { STATS } from '../data';

export default function About() {
  return (
    <section id="about" className="relative z-[5] px-5 sm:px-8 py-20 sm:py-[130px] overflow-hidden">
      <Reveal variant="up" className="font-mono text-[12px] tracking-[0.2em] text-accent mb-9">01 — ABOUT</Reveal>

      <h2 className="max-w-[1100px] m-0 font-display font-semibold leading-[1.08] tracking-[-0.02em]" style={{ fontSize: 'clamp(28px,4.2vw,62px)' }}>
        <SplitText text="A final-year CS engineer at Panimalar Engineering College" />{' '}
        <span className="font-serif italic text-accent">full-stack, test-driven</span>{' '}
        <SplitText text="web apps — Spring Boot & JPA on the backend," />{' '}
        <span className="font-serif italic text-accent">React.js</span>{' '}
        <SplitText text="on the front." />
      </h2>

      <div className="flex flex-wrap gap-10 sm:gap-[60px] mt-12 sm:mt-[70px] items-start">
        <Reveal variant="blur" as="p" className="flex-1 min-w-[280px] max-w-[520px] text-[16px] leading-[1.7] text-paper/[0.62]">
          Hands-on with layered REST APIs, Spring Data JPA and component-based React UIs — shipped 10+ live web apps
          across 35+ public GitHub repositories. NASSCOM-certified Software Programmer (Java) with a cybersecurity
          internship at Zapsters. Seeking a Software Engineer role at an IT services company or GCC.
          <br /><br />
          <span className="font-mono text-[13px] text-paper/45">B.E. Computer Science · Panimalar Engineering College · Expected May 2027</span>
        </Reveal>

        <Reveal variant="up" delay={0.12}
          className="flex-1 min-w-[280px] grid grid-cols-2 gap-px border border-line rounded-[14px] overflow-hidden"
          style={{ background: 'rgba(238,240,246,0.08)' }}>
          {STATS.map((s) => (
            <div key={s.label} data-cursor="hover" className="bg-black px-[22px] py-[26px] transition-colors duration-300 hover:bg-accent/[0.07]">
              <div className="font-display font-extrabold text-[38px] sm:text-[46px] leading-none text-accent">
                <CountUp value={s.value} decimals={s.decimals} pad={s.pad || 0} />
                {s.suffix && <span className="text-paper/60">{s.suffix}</span>}
              </div>
              <div className="font-mono text-[11px] tracking-[0.12em] text-paper/50 mt-[6px] uppercase">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
