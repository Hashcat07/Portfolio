import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Code2, Globe, Cpu, Smartphone, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const skills = [
    { name: 'Java', icon: <Cpu /> },
    { name: 'Node.js', icon: <Server /> },
    { name: 'React', icon: <Layout /> },
    { name: 'Express', icon: <Globe /> },
    { name: 'MongoDB', icon: <Database /> },
    { name: 'SQL', icon: <Database /> },
    { name: 'JavaScript', icon: <Code2 /> },
    { name: 'Architecture', icon: <Cloud /> },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'tween', duration: 0.5 } }
};

const Skills = () => {
    return (
        <section id="skills" className="py-32 relative overflow-hidden bg-black border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <div className="flex flex-col md:flex-row items-end justify-between mb-20 pb-8 border-b border-white/10 gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-4 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-white/20"></span>
                            Technical Stack
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none"
                        >
                            Tooling
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 max-w-md text-base font-mono tracking-wide mt-6 md:mt-0"
                    >
                        Technologies and tools I've been learning and working with during my studies.
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                        >
                            <Card className="bg-black border border-transparent rounded-none flex flex-col items-center justify-center text-center group transition-all duration-500 hover:bg-black cursor-none relative overflow-hidden h-48 md:h-64 neon-border">
                                <CardContent className="p-12 flex flex-col items-center justify-center w-full h-full">
                                    <div className="text-gray-500 group-hover:text-primary group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-all duration-500 z-10 mb-8">
                                        {React.cloneElement(skill.icon, { size: 48, strokeWidth: 1.5 })}
                                    </div>

                                    <h3 className="text-sm tracking-[0.15em] uppercase font-bold text-gray-400 group-hover:text-primary group-hover:neon-text-glow transition-all duration-500">
                                        {skill.name}
                                    </h3>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
