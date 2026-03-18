"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

export default function Categories() {
    return (
        <section className="relative w-full py-24 sm:py-32 bg-white overflow-hidden">
            {/* Top separator */}
            <div className="section-divider w-full absolute top-0" />

            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16">
                    <div>
                        <div className="overflow-hidden mb-3">
                            <motion.p
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease }}
                                className="text-[11px] tracking-[0.3em] uppercase text-gray-400 font-medium"
                            >
                                Browse
                            </motion.p>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.06, duration: 0.7, ease }}
                                className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0a0a0a] tracking-[-0.03em]"
                            >
                                Categories
                            </motion.h2>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Link
                            href="/collection"
                            className="group text-[13px] text-gray-400 hover:text-[#0a0a0a] transition-colors duration-300 flex items-center gap-2"
                        >
                            View all
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
                >
                    {categories.map((cat) => (
                        <motion.div key={cat.slug} variants={itemVariants}>
                            <Link
                                href={`/collection?category=${cat.slug}`}
                                className="group block relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                                    sizes="(max-width: 640px) 50vw, 25vw"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />

                                {/* Arrow */}
                                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center transition-all duration-400 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#0a0a0a" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </div>

                                {/* Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug group-hover:-translate-y-1 transition-transform duration-400">
                                        {cat.name}
                                    </h3>
                                    <div className="overflow-hidden mt-1">
                                        <p className="text-[13px] text-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-400 delay-75">
                                            {cat.count}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
