import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SECTIONS } from '../data';
import MagneticButton from './MagneticButton';

// Sticky nav: gradient "R" logo, center pill nav (desktop) with an animated
// active indicator, an availability dot and a résumé CTA. Below md the pill
// collapses into a hamburger that opens an animated full-screen menu so the
// site stays navigable on phones. Slides in after the loader lifts.
export default function Nav({ ready, onResume }: { ready: boolean; onResume: () => void }) {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = 'home';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (id: string) => () => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 10, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[160] flex items-center justify-between px-5 sm:px-8 py-[14px] sm:py-[18px] backdrop-blur-xl bg-black/50 border-b border-white/[0.06]"
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 0.84, 0.3, 1] }}
      >
        <div className="flex items-center gap-3">
          <MagneticButton as="div" className="w-9 h-9 rounded-[9px] grid place-items-center font-display font-extrabold text-[14px] text-black bg-accent"
            style={{ boxShadow: '0 0 22px rgba(var(--accent-rgb),0.55)' }}>
            R
          </MagneticButton>
          <span className="font-mono text-[12px] tracking-[0.16em] font-bold">ROHUL RAY<span className="text-accent">®</span></span>
        </div>

        {/* desktop center pill nav */}
        <div className="hidden md:flex items-center gap-1 p-[7px] border border-paper/10 rounded-full bg-paper/[0.03]">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={go(s.id)} data-cursor="hover"
              className="relative font-mono text-[11px] tracking-[0.12em] px-[14px] py-[7px] rounded-full transition-colors"
              style={{ color: active === s.id ? '#000' : 'rgba(238,240,246,0.6)' }}>
              {active === s.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-accent -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-[7px] font-mono text-[11px] tracking-[0.1em] text-paper/[0.58]">
            <motion.span className="w-[7px] h-[7px] rounded-full bg-accent" style={{ boxShadow: '0 0 10px rgba(var(--accent-rgb),0.9)' }}
              animate={{ opacity: [1, 0.15, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />
            AVAILABLE
          </div>
          <MagneticButton onClick={onResume}
            className="hidden sm:inline-flex border-0 bg-paper text-black font-mono font-bold text-[11px] tracking-[0.1em] px-[17px] py-[10px] rounded-full">
            RÉSUMÉ ↗
          </MagneticButton>

          {/* mobile hamburger — 44px touch target */}
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}
            className="md:hidden relative w-11 h-11 grid place-items-center rounded-full border border-paper/15 bg-paper/[0.03]">
            <motion.span className="absolute h-[1.5px] w-[18px] bg-paper rounded-full"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ duration: 0.25 }} />
            <motion.span className="absolute h-[1.5px] w-[18px] bg-paper rounded-full"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.nav>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[155] md:hidden bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 0.84, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {SECTIONS.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={go(s.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.16, 0.84, 0.3, 1] }}
                  className="group flex items-baseline gap-4 py-3 text-left"
                >
                  <span className="font-mono text-[12px] text-accent w-8">0{i + 1}</span>
                  <span className="font-display font-extrabold text-[40px] leading-none tracking-[-0.02em] transition-colors group-active:text-accent"
                    style={{ color: active === s.id ? '#c2303d' : '#eef0f6' }}>
                    {s.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + SECTIONS.length * 0.06, duration: 0.5 }}
              className="mt-12 flex items-center gap-4">
              <button onClick={() => { setOpen(false); onResume(); }}
                className="inline-flex items-center justify-center min-h-[48px] px-6 bg-accent text-black font-mono font-bold text-[12px] tracking-[0.1em] rounded-full border-0">
                RÉSUMÉ ↗
              </button>
              <span className="flex items-center gap-[7px] font-mono text-[11px] tracking-[0.1em] text-paper/55">
                <span className="w-[7px] h-[7px] rounded-full bg-accent" style={{ boxShadow: '0 0 10px rgba(var(--accent-rgb),0.9)' }} />
                AVAILABLE
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
