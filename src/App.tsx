import { useCallback, useEffect, useState } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import InteractiveGrid from './components/InteractiveGrid';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import About from './components/About';
import Work from './components/Work';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ResumeViewer from './components/ResumeViewer';

export default function App() {
  const [ready, setReady] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  // ESC key closes the resume viewer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setResumeOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // lock body scroll while resume is open
  useEffect(() => {
    document.body.style.overflow = resumeOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [resumeOpen]);

  return (
    <div className="relative bg-black text-paper min-h-screen overflow-x-hidden">
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />

      {/* fixed atmosphere layers */}
      <div aria-hidden className="fixed inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(60% 50% at 70% 32%, rgba(var(--accent-rgb), 0.10), transparent 66%)' }} />
      <div aria-hidden className="fixed inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(50% 45% at 28% 68%, rgba(var(--accent-deep-rgb), 0.10), transparent 62%)' }} />
      <InteractiveGrid />

      <Nav ready={ready} onResume={openResume} />

      <main className="relative z-[5]">
        <Hero />
        <Marquee />
        <Statement />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>

      <ResumeViewer open={resumeOpen} onClose={closeResume} />
    </div>
  );
}
