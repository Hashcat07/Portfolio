import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
    {
        title: 'ExpenseIQ',
        description: 'A humanized personal finance tracker prioritizing premium UX and data privacy. Features smart dashboards and interactive analytics.',
        image: 'bg-zinc-900',
        tags: ['React', 'Vite', 'Recharts', 'Lucide'],
        link: 'https://github.com/Hashcat07/ExpenseIQ',
        visual: (
            <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain p-4 max-h-52">
                {/* Diamond/Gem Shape */}
                <path d="M120 30L160 70L120 150L80 70L120 30Z" fill="rgba(13, 148, 136, 0.1)" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
                <path d="M120 30L100 70L120 150L140 70L120 30Z" fill="rgba(13, 148, 136, 0.05)" stroke="#0d9488" strokeWidth="1" strokeLinejoin="round" />
                <line x1="80" y1="70" x2="160" y2="70" stroke="#0d9488" strokeWidth="1" />

                {/* Dashboard Chart Representation */}
                <rect x="180" y="110" width="8" height="30" rx="1" fill="#d97706" opacity="0.6" />
                <rect x="195" y="90" width="8" height="50" rx="1" fill="#0d9488" opacity="0.8" />
                <rect x="210" y="120" width="8" height="20" rx="1" fill="#d97706" opacity="0.6" />

                {/* Currency Symbol / Floating elements */}
                <circle cx="50" cy="110" r="12" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="50" y="115" textAnchor="middle" fill="#d97706" fontSize="14" fontWeight="bold" fontFamily="monospace">$</text>

                {/* Label */}
                <text x="120" y="165" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace" letterSpacing="2">HUMANIZED FINANCE</text>
            </svg>
        ),
    },
    {
        title: 'AttendTrack',
        description: 'A complete rewrite of the college attendance analyser, migrating from Vanilla JS to a modern React 18, Vite, and Tailwind CSS tech stack.',
        image: 'bg-zinc-950',
        tags: ['React', 'shadcn/ui', 'Vite', 'Tailwind CSS'],
        link: 'https://github.com/Hashcat07/AttendTrack',
        visual: (
            <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain p-4 max-h-52">
                {/* Background Dashboard */}
                <rect x="20" y="20" width="200" height="140" rx="8" fill="#000000" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" />
                <rect x="20" y="20" width="200" height="25" rx="8" fill="rgba(168,85,247,0.1)" />
                <circle cx="35" cy="32" r="4" fill="rgba(168,85,247,0.4)" />
                <circle cx="48" cy="32" r="4" fill="rgba(168,85,247,0.4)" />
                {/* Donut Chart */}
                <circle cx="70" cy="90" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle cx="70" cy="90" r="30" stroke="#22c55e" strokeWidth="8" strokeDasharray="188.5" strokeDashoffset="40" strokeLinecap="round" />
                <circle cx="70" cy="90" r="30" stroke="#ef4444" strokeWidth="8" strokeDasharray="188.5" strokeDashoffset="160" strokeLinecap="round" />
                <text x="70" y="93" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">80%</text>
                {/* Grid / Bar Chart area */}
                <rect x="120" y="60" width="80" height="15" rx="2" fill="rgba(168,85,247,0.2)" />
                <rect x="120" y="85" width="80" height="15" rx="2" fill="rgba(34,197,94,0.2)" />
                <rect x="120" y="110" width="60" height="15" rx="2" fill="rgba(239,68,68,0.2)" />
                <rect x="185" y="110" width="15" height="15" rx="2" fill="rgba(255,255,255,0.1)" />
                {/* Label */}
                <text x="120" y="150" textAnchor="middle" fill="rgba(168,85,247,0.5)" fontSize="8" fontFamily="monospace" letterSpacing="2">ATTENDANCE ANALYSER</text>
            </svg>
        ),
    },
    {
        title: 'Music System',
        description: 'An interactive audio streaming and management platform built using modern web frameworks and backend services.',
        image: 'bg-zinc-900',
        tags: ['React', 'Firebase', 'JavaScript', 'HTML'],
        link: 'https://github.com/Hashcat07/Music-System',
        visual: (
            <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain p-4 max-h-52">
                {/* Background rings */}
                <circle cx="120" cy="90" r="70" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
                <circle cx="120" cy="90" r="50" stroke="rgba(0,229,255,0.12)" strokeWidth="1" />
                <circle cx="120" cy="90" r="30" stroke="rgba(0,229,255,0.18)" strokeWidth="1" />
                {/* Vinyl record */}
                <circle cx="120" cy="90" r="65" fill="#0a0a0a" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5" />
                <circle cx="120" cy="90" r="18" fill="rgba(0,229,255,0.15)" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" />
                <circle cx="120" cy="90" r="5" fill="#00e5ff" />
                {/* Grooves */}
                {[40, 48, 56].map(r => <circle key={r} cx="120" cy="90" r={r} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
                {/* Sound bars on the right */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <rect key={i} x={195 + i * 8} y={90 - (i % 2 === 0 ? 30 : 18)} width="5" height={i % 2 === 0 ? 60 : 36} rx="2.5" fill="rgba(0,229,255,0.6)" />
                ))}
                {/* Play label */}
                <text x="120" y="160" textAnchor="middle" fill="rgba(0,229,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="3">PLAYING</text>
            </svg>
        ),
    },
    {
        title: 'Weather Dashboard',
        description: 'A dynamic forecasting tool that fetches and visualizes real-time climate data for any given global city.',
        image: 'bg-zinc-950',
        tags: ['HTML', 'CSS', 'JavaScript', 'Visual Crossing API'],
        link: 'https://github.com/Hashcat07/Weather-App',
        visual: (
            <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain p-4 max-h-52">
                {/* Sun glow */}
                <circle cx="170" cy="55" r="40" fill="rgba(0,229,255,0.04)" />
                <circle cx="170" cy="55" r="28" fill="rgba(0,229,255,0.08)" />
                <circle cx="170" cy="55" r="18" fill="rgba(0,229,255,0.2)" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" />
                {/* Sun rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    return <line key={i} x1={170 + Math.cos(rad) * 22} y1={55 + Math.sin(rad) * 22} x2={170 + Math.cos(rad) * 32} y2={55 + Math.sin(rad) * 32} stroke="rgba(0,229,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />;
                })}
                {/* Cloud */}
                <ellipse cx="100" cy="95" rx="48" ry="22" fill="#111" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" />
                <ellipse cx="80" cy="88" rx="28" ry="20" fill="#111" stroke="rgba(0,229,255,0.3)" strokeWidth="1.5" />
                <ellipse cx="122" cy="88" rx="24" ry="17" fill="#111" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
                {/* Rain drops */}
                {[85, 100, 115, 92, 108].map((x, i) => (
                    <line key={i} x1={x} y1={118 + i * 2} x2={x - 4} y2={130 + i * 2} stroke="rgba(0,229,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                ))}
                {/* Temp readout */}
                <text x="50" y="50" fill="rgba(0,229,255,0.7)" fontSize="22" fontWeight="bold" fontFamily="monospace">28°C</text>
                <text x="40" y="163" fill="rgba(0,229,255,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="2">VISUAL CROSSING API</text>
            </svg>
        ),
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-32 relative bg-black border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 pb-8 border-b border-white/10">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-4 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-white/20"></span>
                            Selected Works
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4"
                        >
                            Index
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-300 font-mono tracking-wide text-base"
                        >
                            A highlight of my latest applications and interactive platforms.
                        </motion.p>
                    </div>

                    <motion.a
                        href="https://github.com/Hashcat07?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-colors hover:text-gray-500 border border-white/20 px-6 py-3 hover:border-gray-500 cursor-none"
                    >
                        Full Archive <ExternalLink size={14} />
                    </motion.a>
                </div>

                <div className="flex flex-col gap-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                        >
                            <Card className="group cursor-none border-t-0 border-r-0 border-b-0 border-l-0 sm:border border-transparent overflow-hidden bg-black transition-all duration-500 hover:border-transparent flex flex-col md:flex-row rounded-none shadow-none p-0 neon-border">
                                {/* Project Visual */}
                                <div className={`w-full md:w-1/2 h-64 md:h-auto ${project.image} relative overflow-hidden flex items-center justify-center group-hover:brightness-110 transition-all duration-700 border-b md:border-b-0 md:border-r border-primary/20`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-primary/5 group-hover:to-primary/10 transition-colors duration-700"></div>
                                    <div className="relative z-10 w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-1000">
                                        {project.visual}
                                    </div>
                                </div>

                                {/* Project Info */}
                                <CardContent className="w-full md:w-1/2 p-8 md:p-12 relative z-20 bg-black flex flex-col justify-center">
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map((tag, i) => (
                                            <Badge key={i} variant="outline" className="text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 bg-primary/10 text-primary border-primary/30 rounded h-auto shadow-[0_0_10px_rgba(0,229,255,0.1)] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-shadow">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <h3 className="text-4xl lg:text-6xl font-black uppercase text-white mb-6 tracking-tight group-hover:text-primary group-hover:neon-text-glow transition-all">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-300 mb-10 font-medium leading-relaxed text-lg lg:text-xl">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center gap-4 mt-auto">
                                        <Button asChild variant="outline" className="flex-1 h-16 bg-black border-primary/30 text-primary hover:text-primary hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] rounded cursor-none transition-all flex items-center justify-center gap-3">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                <Github size={20} />
                                                <span className="text-[12px] font-black uppercase tracking-[0.2em]">Source Code</span>
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
