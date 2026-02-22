import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    {/* Glowing badge with Shadcn */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-8 flex items-center gap-3"
                    >
                        <Badge variant="outline" className="px-5 py-2 border-primary/50 bg-black/50 text-[12px] font-bold tracking-[0.2em] uppercase text-primary rounded-full h-auto neon-border neon-text-glow shadow-[0_0_15px_rgba(0,229,255,0.3)] backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-3 shadow-[0_0_10px_rgba(0,229,255,1)]"></span>
                            Systems Online
                        </Badge>
                    </motion.div>

                    {/* Main Name Heading (Hyper-minimalist) */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight uppercase relative z-10">
                        ROHUL RAY EDWARD S <br />
                        <span className="text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] block mt-4 pb-4">
                            SOFTWARE ENGINEER
                        </span>
                    </h1>

                    <h2 className="text-base md:text-xl text-gray-300 mt-6 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                        A full-stack software engineer focused on architecting robust backend systems using <span className="text-primary font-bold">Java & SQL</span>, whilst developing dynamic, high-performance web applications with the <span className="text-secondary font-bold">MERN</span> stack.
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 w-full sm:w-auto">
                        <Button
                            asChild
                            variant="default"
                            className="relative group w-full sm:w-auto px-12 py-8 text-sm font-black uppercase tracking-[0.2em] rounded bg-primary text-black hover:bg-white hover:text-black transition-all cursor-none shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)]"
                        >
                            <a href="#projects">
                                <span className="relative z-10 flex items-center gap-3">
                                    Deploy <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                </span>
                            </a>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="relative group mt-4 sm:mt-0 w-full sm:w-auto px-12 py-8 text-sm font-black uppercase tracking-[0.2em] rounded text-primary bg-black/50 border-primary/50 neon-border hover:bg-primary/10 transition-all cursor-none backdrop-blur-sm"
                        >
                            <a href="#contact">
                                <span className="relative z-10 flex items-center gap-3 group-hover:neon-text-glow group-hover:text-primary transition-all">
                                    <Terminal size={18} className="text-primary group-hover:text-primary transition-colors" />
                                    Init Connection
                                </span>
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
