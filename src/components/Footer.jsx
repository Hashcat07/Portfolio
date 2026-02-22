import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black border-t border-white/10 relative">
            <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="order-2 md:order-1 flex flex-col items-center md:items-start gap-4">
                    <p className="text-white font-black uppercase tracking-[0.5em] text-xl leading-none">
                        RO<span className="text-primary">HUL</span>
                    </p>
                    <div className="flex items-center gap-4 text-gray-600 font-mono text-[10px] uppercase tracking-[0.2em]">
                        <span>© {new Date().getFullYear()}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>All Systems Nominal</span>
                    </div>
                </div>

                <a
                    href="#home"
                    onClick={scrollToTop}
                    className="order-1 md:order-2 px-8 py-4 border border-white/10 flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 hover:text-black hover:bg-primary hover:border-primary transition-all duration-500 cursor-none group"
                >
                    Return to Top
                    <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                </a>

            </div>
        </footer>
    );
};

export default Footer;
