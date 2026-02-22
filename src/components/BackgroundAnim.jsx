import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundAnim = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });

    useEffect(() => {
        // Init to center
        if (typeof window !== 'undefined') {
            setMousePosition({ x: 0, y: 0, rawX: window.innerWidth / 2, rawY: window.innerHeight / 2 });
        }

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y, rawX: e.clientX, rawY: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mesh-bg">

            {/* Pointer-following solid spotlight - Cyan */}
            <motion.div
                className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full mix-blend-screen opacity-50 blur-[100px] pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(circle, rgba(0,229,255,0.8) 0%, rgba(0,180,250,0.4) 30%, rgba(0,0,0,0) 70%)',
                }}
                animate={{
                    x: mousePosition.rawX - 200,
                    y: mousePosition.rawY - 200,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
            />

            {/* Dynamic light source - Vibrant Magenta Neon glow (Parallax) */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -mt-[500px] -ml-[500px] rounded-full mix-blend-screen opacity-30 blur-[120px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(255,0,200,0.5) 0%, rgba(0,0,0,0) 60%)',
                }}
                animate={{
                    x: mousePosition.x * 120,
                    y: mousePosition.y * 120,
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.8 }}
            />

            <motion.div
                className="absolute top-1/2 left-1/4 w-[800px] h-[800px] -mt-[400px] -ml-[400px] rounded-full mix-blend-screen opacity-20 blur-[150px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(138,43,226,0.4) 0%, rgba(0,0,0,0) 60%)',
                }}
                animate={{
                    x: mousePosition.x * -60,
                    y: mousePosition.y * -60,
                }}
                transition={{ type: "tween", ease: "linear", duration: 1.2 }}
            />

            {/* Noise layer for texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMS4yIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-40 mix-blend-overlay"></div>

            {/* Very faint structural grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_10%,transparent_100%)]" />
        </div>
    );
};

export default BackgroundAnim;
