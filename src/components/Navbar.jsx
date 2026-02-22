import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Index', href: '#home' },
    { name: 'Origin', href: '#about' },
    { name: 'Tooling', href: '#skills' },
    { name: 'Works', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">

                {/* Brand */}
                <a href="#home" onClick={(e) => handleClick(e, '#home')} className="text-xl font-black tracking-[0.4em] text-white hover:text-primary transition-colors uppercase cursor-none">
                    RO<span className="text-primary">HUL</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em] cursor-none group relative py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out"></span>
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-500 hover:text-white transition-colors cursor-none focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full bg-black border-b border-white/10 md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-8 space-y-6">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    className="text-lg font-black text-gray-400 hover:text-white transition-colors uppercase tracking-[0.2em] border-b border-white/5 pb-4"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
