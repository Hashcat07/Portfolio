import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import BackgroundAnim from './components/BackgroundAnim';

function App() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-white/30 selection:text-white pb-10 font-[Inter]">
      <CursorFollower />
      <BackgroundAnim />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
