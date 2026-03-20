"use client";

import { motion } from "framer-motion";

const words = [
    "PREMIUM",
    "•",
    "CURATED",
    "•",
    "MINIMALIST",
    "•",
    "ELECTRONICS",
    "•",
    "YOUR STYLE",
    "•",
    "YOUR CHOICE",
    "•",
    "PREMIUM",
    "•",
    "CURATED",
    "•",
    "MINIMALIST",
    "•",
    "ELECTRONICS",
    "•",
    "YOUR STYLE",
    "•",
    "YOUR CHOICE",
    "•",
];

export default function Marquee() {
    return (
        <section className="relative w-full py-10 sm:py-14 bg-[#fafaf8] overflow-hidden -mt-2">
            {/* Top subtle line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Scrolling text — row 1 (left to right) */}
            <div className="relative overflow-hidden">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    {words.map((word, i) => (
                        <span
                            key={`r1-${i}`}
                            className={`mx-3 sm:mx-5 text-5xl sm:text-7xl lg:text-8xl xl:text-[110px] font-bold tracking-[-0.04em] select-none ${word === "•"
                                    ? "text-[#0a0a0a]/5 text-3xl sm:text-5xl"
                                    : i % 4 === 0
                                        ? "text-transparent marquee-stroke"
                                        : "text-[#0a0a0a]/[0.04]"
                                }`}
                        >
                            {word}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Scrolling text — row 2 (right to left, offset) */}
            <div className="relative overflow-hidden mt-2 sm:mt-4">
                <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap"
                >
                    {[...words].reverse().map((word, i) => (
                        <span
                            key={`r2-${i}`}
                            className={`mx-3 sm:mx-5 text-5xl sm:text-7xl lg:text-8xl xl:text-[110px] font-bold tracking-[-0.04em] select-none ${word === "•"
                                    ? "text-[#0a0a0a]/5 text-3xl sm:text-5xl"
                                    : i % 3 === 0
                                        ? "text-[#0a0a0a]/[0.06]"
                                        : "text-transparent marquee-stroke"
                                }`}
                        >
                            {word}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Edge fades */}
            <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#fafaf8] to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#fafaf8] to-transparent pointer-events-none z-10" />

            {/* Bottom subtle line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </section>
    );
}
