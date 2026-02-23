import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
    return (
        <section id="about" className="py-32 relative z-10 bg-black border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-start justify-between gap-16"
                >
                    {/* Left Column: Title & Abstract Art */}
                    <div className="w-full md:w-1/3 flex flex-col items-start">
                        <h2 className="text-4xl md:text-6xl font-black mb-12 text-white uppercase tracking-tighter">
                            Origin
                        </h2>

                        {/* Minimalist Graphic representation instead of photo - Now glowing red */}
                        <div className="w-32 h-32 relative flex items-center justify-center border border-primary/30 p-4 neon-border shadow-[0_0_30px_rgba(255,0,0,0.1)] group">
                            <div className="w-full h-full border border-primary/50 animate-[spin_10s_linear_infinite] p-2 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all duration-500">
                                <div className="w-full h-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-500"></div>
                            </div>
                            <div className="absolute w-2 h-2 bg-primary shadow-[0_0_10px_rgba(255,0,0,1)]"></div>
                        </div>

                        <div className="mt-12 w-full">
                            <div className="h-[1px] w-full bg-white/10 mb-6"></div>
                            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-500">
                                <span>Status</span>
                                <span className="text-white font-bold">Available</span>
                            </div>
                            <div className="h-[1px] w-full bg-white/10 my-6"></div>
                            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-500">
                                <span>Location</span>
                                <span className="text-white font-bold">Remote (Flexible)</span>
                            </div>
                            <div className="h-[1px] w-full bg-white/10 mt-6"></div>
                        </div>
                    </div>

                    {/* Right Column: Bio */}
                    <div className="w-full md:w-2/3 md:pl-12 lg:pl-24">
                        <p className="text-gray-300 text-xl md:text-2xl font-normal leading-relaxed mb-8">
                            I have a strong foundation in algorithms, data structures, and computational theory, with a keen interest in building reliable software systems.
                        </p>

                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                            I am eager to apply and expand my skills in <span className="text-primary font-medium">Java</span>, <span className="text-primary font-medium">SQL</span>, and modern <span className="text-secondary font-medium">MERN stack</span> technologies. I focus on writing clean, maintainable code and developing solutions that are both efficient and practical. I am committed to learning continuously and improving through hands-on projects and real-world challenges.
                        </p>

                        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
                            {[
                                { label: 'Role', value: 'Software Eng.' },
                                { label: 'Backend', value: 'Java / Node' },
                                { label: 'Frontend', value: 'React' },
                                { label: 'Database', value: 'SQL / Mongo' },
                            ].map((stat, idx) => (
                                <Card key={idx} className="bg-black border border-transparent rounded-none flex flex-col justify-center transition-all duration-500 group cursor-none hover:bg-black neon-border">
                                    <CardContent className="p-6">
                                        <span className="block text-xl font-bold text-white group-hover:text-primary group-hover:neon-text-glow transition-all duration-300 mb-2">{stat.value}</span>
                                        <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-600 group-hover:text-primary/70 transition-colors duration-300">{stat.label}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
