import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const EASE = [0.16, 0.84, 0.3, 1] as const;

interface Props {
  open: boolean;
  onClose: () => void;
}

// Fullscreen résumé overlay — slides up over the portfolio with a blurred
// backdrop. Shows the PDF in an embedded viewer with download + close CTAs.
// Locks body scroll while open.
export default function ResumeViewer({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />

          {/* top bar */}
          <motion.header
            className="relative z-[1] flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/[0.08]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                data-cursor="hover"
                className="flex items-center gap-2 bg-transparent border border-paper/15 text-paper/70 font-mono text-[11px] tracking-[0.12em] px-4 py-[9px] rounded-full transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                </svg>
                BACK
              </button>
              <span className="hidden sm:inline font-mono text-[12px] tracking-[0.16em] text-paper/40">
                RÉSUMÉ — ROHUL RAY EDWARD<span className="text-accent">·S</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="hidden sm:inline-flex items-center gap-2 border border-paper/15 bg-transparent text-paper/70 font-mono font-bold text-[11px] tracking-[0.1em] px-4 py-[9px] rounded-full transition-colors hover:border-paper/40 hover:text-paper"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="m16 15-3 3-3-3" /><path d="M13 12v6" />
                </svg>
                OPEN IN TAB
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/resume.pdf"
                download="RohulRayEdward_Resume.pdf"
                data-cursor="hover"
                className="inline-flex items-center gap-2 border-0 bg-accent text-black font-mono font-bold text-[11px] tracking-[0.1em] px-5 py-[10px] rounded-full"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DOWNLOAD
              </MagneticButton>
            </div>
          </motion.header>

          {/* PDF viewer area */}
          <motion.div
            className="relative z-[1] flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.6, ease: EASE }}
          >
            {/* Glowing border frame around the PDF */}
            <div
              className="relative w-full max-w-[900px] flex-1 rounded-2xl overflow-hidden border border-accent/20"
              style={{ boxShadow: '0 0 60px rgba(var(--accent-rgb), 0.12), 0 20px 60px rgba(0,0,0,0.5)' }}
            >
              {/* gradient accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0"
                title="Rohul Ray Edward — Résumé"
                className="w-full h-full border-0 bg-white"
                style={{ minHeight: '70vh' }}
              />
            </div>

            {/* mobile-only download CTA (since PDF embed can be spotty on mobile) */}
            <motion.div
              className="sm:hidden mt-4 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="font-mono text-[11px] tracking-[0.1em] text-paper/40 mb-3">
                PDF viewer may not work on mobile
              </p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-paper text-black font-mono font-bold text-[12px] tracking-[0.1em] px-6 py-3 rounded-full"
              >
                OPEN PDF ↗
              </a>
            </motion.div>
          </motion.div>

          {/* bottom subtle info */}
          <motion.footer
            className="relative z-[1] text-center py-3 border-t border-white/[0.06]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="font-mono text-[10px] tracking-[0.14em] text-paper/25">
              PRESS ESC OR CLICK OUTSIDE TO CLOSE
            </span>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
