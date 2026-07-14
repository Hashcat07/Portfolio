import { motion } from 'framer-motion';
import { Reveal, SplitText } from '../lib/motion';
import { CERTS, LINKS } from '../data';
import MagneticButton from './MagneticButton';

export default function Contact() {
  return (
    <section id="contact" className="relative z-[5] px-5 sm:px-8 pt-20 sm:pt-[130px] pb-[50px] overflow-hidden">
      <div className="relative z-[2]">
        <Reveal variant="up" className="font-mono text-[12px] tracking-[0.2em] text-accent mb-[26px]">04 — CONTACT</Reveal>

        <h2 className="m-0 font-display font-extrabold leading-[0.82] tracking-[-0.03em]" style={{ fontSize: 'clamp(60px,16vw,260px)' }}>
          <SplitText text="LET'S" /><br /><SplitText text="BUILD" /><span className="text-accent">.</span>
        </h2>

        <Reveal variant="up" delay={0.1} className="flex flex-wrap gap-3 sm:gap-[18px] items-center mt-[46px]">
          <MagneticButton as="a" href={`mailto:${LINKS.email}`}
            className="no-underline inline-flex items-center gap-3 max-w-full text-black font-mono font-bold text-[12.5px] sm:text-[15px] tracking-[0.04em] px-5 sm:px-[26px] py-4 sm:py-[18px] rounded-full bg-accent"
            style={{ boxShadow: '0 0 36px rgba(var(--accent-rgb),0.4)' }}>
            {LINKS.email} ↗
          </MagneticButton>
          {[['LinkedIn ↗', LINKS.linkedin], ['GitHub ↗', LINKS.github]].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" data-cursor="hover"
              className="no-underline inline-flex items-center gap-[10px] border border-paper/[0.22] text-paper font-mono text-[13px] sm:text-[14px] tracking-[0.04em] px-5 sm:px-[24px] py-4 sm:py-[18px] rounded-full transition-colors hover:border-accent">
              {label}
            </a>
          ))}
        </Reveal>

        <Reveal variant="up" className="mt-[70px] border-t border-line pt-[26px]">
          <div className="font-mono text-[11px] tracking-[0.18em] text-paper/40 mb-4">CERTIFICATIONS</div>
          <div className="flex flex-wrap gap-[10px]">
            {CERTS.map((c) => (
              <motion.span key={c} data-cursor="hover"
                whileHover={{ y: -3, borderColor: '#c2303d', color: '#eef0f6' }}
                transition={{ duration: 0.2, ease: [0.16, 0.84, 0.3, 1] }}
                className="font-mono text-[12px] text-paper/75 border border-paper/[0.16] rounded-lg px-[14px] py-[9px]">{c}</motion.span>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-between gap-4 mt-20 font-mono text-[11px] tracking-[0.1em] text-paper/40">
          <span>© 2026 ROHUL RAY EDWARD S.</span>
          <span>AVAILABLE FOR SOFTWARE ENGINEER ROLES</span>
          <span>KANYAKUMARI · TN · IN</span>
        </div>
      </div>
    </section>
  );
}
