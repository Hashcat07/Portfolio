import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-40 relative bg-black border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex flex-col md:flex-row justify-between items-start gap-16"
                >
                    <div className="w-full md:w-1/2">
                        <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-white/20"></span>
                            Communication Channel
                        </div>

                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tight leading-none mb-12 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                            INIT <br /> <span className="text-primary">CONNECTION</span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl font-light mb-16 max-w-lg leading-relaxed">
                            Available for technical collaborations, architecture discussions, or ambitious opportunities.
                            The system is monitored.
                        </p>

                        <a
                            href="mailto:srohulrayedward@gmail.com"
                            className="inline-flex items-center justify-between w-full max-w-sm px-8 py-6 bg-primary text-black font-black uppercase tracking-[0.2em] text-[12px] hover:bg-white hover:shadow-[0_0_30px_rgba(0,229,255,0.8)] neon-border transition-all duration-300 cursor-none group rounded"
                        >
                            Transmit Signal
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col items-start md:items-end justify-between h-full space-y-8 md:space-y-16">
                        {[
                            { icon: <Github size={24} strokeWidth={1} />, href: "https://github.com/Hashcat07", name: "GitHub", handle: "Hashcat07" },
                            { icon: <Linkedin size={24} strokeWidth={1} />, href: "https://www.linkedin.com/in/rohul-ray-edward-s-b40720293", name: "LinkedIn", handle: "Rohul Ray Edward S" },
                            { icon: <Mail size={24} strokeWidth={1} />, href: "mailto:srohulrayedward@gmail.com", name: "Email", handle: "srohulrayedward" },
                        ].map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.href}
                                className="flex items-center gap-8 group cursor-none w-full justify-start md:justify-end border-b border-primary/20 pb-8 hover:border-primary transition-colors"
                            >
                                <div className="text-left md:text-right hidden sm:block">
                                    <span className="block text-[12px] font-bold tracking-[0.15em] uppercase text-gray-400 group-hover:text-primary group-hover:neon-text-glow transition-all mb-2">
                                        {social.name}
                                    </span>
                                    <span className="block text-base font-mono text-gray-500 group-hover:text-primary/90 transition-colors">
                                        {social.handle}
                                    </span>
                                </div>
                                <div className="w-16 h-16 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all duration-500 rounded-md">
                                    {social.icon}
                                </div>
                            </motion.a>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
