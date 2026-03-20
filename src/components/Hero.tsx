"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ticker = ["Free Shipping", "2-Year Warranty", "Premium Quality", "Curated Electronics", "Carbon Neutral"];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
    return (
        <section className="relative w-full min-h-[94vh] flex flex-col bg-[linear-gradient(180deg,#f8f6f1_0%,#fafaf8_40%,#ffffff_100%)] overflow-hidden noise-overlay">
            {/* Ambient blobs */}
            <div className="ambient-blob w-[600px] h-[600px] bg-slate-300 top-[-8%] right-[5%]" />
            <div className="ambient-blob-alt w-[500px] h-[500px] bg-stone-300 bottom-[5%] left-[-5%]" />
            <div className="absolute top-[15%] left-[35%] w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(212,190,152,0.18),transparent_66%)] blur-3xl pointer-events-none" />

            {/* Main content */}
            <div className="flex-1 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center pt-16">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center py-10 lg:py-0">

                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-7 text-center lg:text-left order-2 lg:order-1"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.7, ease }}
                            className="inline-flex items-center gap-2.5 bg-white/60 backdrop-blur-sm border border-black/[0.06] rounded-full px-5 py-2.5"
                        >
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[11px] font-medium text-[#0a0a0a]/50 tracking-widest uppercase">New Collection</span>
                        </motion.div>

                        <div className="space-y-2">
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.9, ease }}
                                    className="text-6xl sm:text-7xl lg:text-8xl xl:text-[96px] font-bold text-[#0a0a0a] leading-[0.92] tracking-[-0.03em]"
                                >
                                    Your Style.
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.35, duration: 0.9, ease }}
                                    className="display-font text-shine text-6xl sm:text-7xl lg:text-8xl xl:text-[96px] font-medium italic leading-[0.92] tracking-[-0.02em]"
                                >
                                    Your Choice.
                                </motion.h1>
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.7, ease }}
                            className="text-base sm:text-lg text-[#3e444d] font-light max-w-xl mx-auto lg:mx-0 leading-[1.8]"
                        >
                            Premium electronics curated for those who demand perfection.
                            Minimalist aesthetics. Maximum performance.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.7, ease }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="/collection"
                                className="btn-scale group inline-flex items-center justify-center gap-2.5 px-10 py-4.5 bg-[#0a0a0a] text-white text-[13px] font-medium tracking-[0.08em] uppercase rounded-full"
                            >
                                Shop Collection
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/about"
                                className="btn-scale inline-flex items-center justify-center px-10 py-4.5 border border-[#0a0a0a]/12 text-[#0a0a0a]/70 text-[13px] font-medium tracking-[0.08em] uppercase rounded-full hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a]"
                            >
                                Our Story
                            </Link>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="flex items-center gap-5 justify-center lg:justify-start pt-1"
                        >
                            <div className="flex -space-x-2.5">
                                {[
                                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                                ].map((src, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-[2.5px] border-[#fafaf8] overflow-hidden relative shadow-sm">
                                        <Image src={src} alt="Customer" fill className="object-cover" sizes="40px" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-400">
                                <span className="font-semibold text-[#0a0a0a]">4.9★</span>{" "}
                                from 2,400+ reviews
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.7, ease }}
                            className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0"
                        >
                            {[
                                { value: "24H", label: "Dispatch" },
                                { value: "30+", label: "Top Brands" },
                                { value: "98%", label: "Client Love" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur-sm px-3 py-3 text-center"
                                >
                                    <p className="text-lg sm:text-xl font-semibold text-[#141920] tracking-tight">{stat.value}</p>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#5d6571]">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — Product image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, ease }}
                        className="relative flex items-center justify-center order-1 lg:order-2 lg:-mr-8"
                    >
                        {/* Ambient glow */}
                        <div className="absolute inset-[8%] bg-gradient-to-br from-[#d8c3a7]/35 via-white/80 to-[#d2dde8]/30 rounded-full blur-3xl" />

                        {/* Main image with subtle float — bigger */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-lg sm:max-w-2xl lg:max-w-none mx-auto aspect-square lg:scale-[1.08]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=900&q=85"
                                alt="AirPods Pro Max — Premium Audio"
                                fill
                                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
                                priority
                                sizes="(max-width: 768px) 90vw, 50vw"
                            />
                        </motion.div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8, ease }}
                            className="absolute bottom-6 sm:bottom-10 left-0 sm:-left-4 glass rounded-2xl px-5 py-3.5 shadow-lg shadow-black/[0.04] flex items-center gap-3"
                        >
                            <div className="w-9 h-9 bg-[#0a0a0a] rounded-full flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-medium">Free Shipping</p>
                                <p className="text-[12px] font-semibold text-[#0a0a0a]">On all orders</p>
                            </div>
                        </motion.div>

                        {/* Second floating badge on the right */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, y: -20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8, ease }}
                            className="absolute top-6 sm:top-12 right-0 sm:-right-2 glass rounded-2xl px-4 py-3 shadow-lg shadow-black/[0.04] flex items-center gap-2.5"
                        >
                            <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#10b981" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-400 font-medium">New Drop</p>
                                <p className="text-[12px] font-semibold text-[#0a0a0a]">2024 Collection</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Ticker strip */}
            <div className="relative z-20 w-full border-t border-black/[0.04] bg-white/50 backdrop-blur-sm overflow-hidden py-4">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-14 whitespace-nowrap"
                >
                    {[...ticker, ...ticker].map((item, i) => (
                        <span key={i} className="leading-none text-[11px] font-medium tracking-[0.2em] uppercase text-[#0a0a0a]/20 flex items-center gap-5">
                            {item}
                            <span className="w-1 h-1 bg-[#0a0a0a]/15 rounded-full" />
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
