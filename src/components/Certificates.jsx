import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const certificates = [
    {
        name: "Intro to Gen AI",
        issuer: "Amazon Web Services",
    },
    {
        name: "Cloud Computing",
        issuer: "Amazon Web Services",
    },
    {
        name: "Cybersecurity",
        issuer: "NASSCOM",
    },
    {
        name: "Certification",
        issuer: "NPTEL",
    }
];

const Certificates = () => {
    return (
        <section id="certificates" className="py-32 relative overflow-hidden bg-black border-t border-white/5">
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
                            Verification
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none"
                        >
                            Credentials
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <Card className="bg-black transition-all duration-500 cursor-none relative overflow-hidden group flex flex-col justify-between h-72 border border-transparent rounded-none shadow-none neon-border">
                                <CardContent className="p-12 w-full h-full flex flex-col justify-between relative z-10">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:text-primary transition-all duration-500">
                                        <Award size={120} strokeWidth={0.5} />
                                    </div>

                                    <div className="w-14 h-14 flex items-center justify-center mb-8 bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_25px_rgba(0,229,255,0.8)] transition-all duration-700 rounded-md">
                                        <CheckSquare size={20} className="text-primary group-hover:text-black transition-colors" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 leading-tight group-hover:text-primary group-hover:neon-text-glow transition-all duration-300">
                                            {cert.name}
                                        </h3>

                                        <div className="flex justify-between items-center pt-8 border-t border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
                                            <span className="text-[12px] uppercase tracking-[0.2em] text-gray-400 font-bold group-hover:text-primary/90">{cert.issuer}</span>
                                        </div>
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

export default Certificates;
