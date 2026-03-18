"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ticker = ["Free Shipping", "2-Year Warranty", "Premium Quality", "Curated Electronics", "Carbon Neutral"];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col bg-[#fafaf8] overflow-hidden noise-overlay">
            {/* Ambient blobs */}
            <div className="ambient-blob w-[500px] h-[500px] bg-slate-300 top-[-10%] right-[10%]" />
            <div className="ambient-blob-alt w-[400px] h-[400px] bg-stone-300 bottom-[10%] left-[-5%]" />

            {/* Main content */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center pt-20">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center py-20 lg:py-0">

                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10 text-center lg:text-left order-2 lg:order-1"
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

                        <div className="space-y-3">
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.9, ease }}
                                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-bold text-[#0a0a0a] leading-[0.92] tracking-[-0.03em]"
                                >
                                    Your Style.
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.35, duration: 0.9, ease }}
                                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-extralight italic text-[#0a0a0a] leading-[0.92] tracking-[-0.02em]"
                                >
                                    Your Choice.
                                </motion.h1>
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.7, ease }}
                            className="text-[15px] sm:text-base text-gray-500 font-light max-w-lg mx-auto lg:mx-0 leading-[1.75]"
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
                                className="btn-scale group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#0a0a0a] text-white text-[13px] font-medium tracking-[0.08em] uppercase rounded-full"
                            >
                                Shop Collection
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/about"
                                className="btn-scale inline-flex items-center justify-center px-9 py-4 border border-[#0a0a0a]/12 text-[#0a0a0a]/70 text-[13px] font-medium tracking-[0.08em] uppercase rounded-full hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a]"
                            >
                                Our Story
                            </Link>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="flex items-center gap-5 justify-center lg:justify-start pt-4"
                        >
                            <div className="flex -space-x-2.5">
                                {[
                                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                                ].map((src, i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border-[2.5px] border-[#fafaf8] overflow-hidden relative shadow-sm">
                                        <Image src={src} alt="Customer" fill className="object-cover" sizes="36px" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-[13px] text-gray-400">
                                <span className="font-semibold text-[#0a0a0a]">4.9★</span>{" "}
                                from 2,400+ reviews
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — Product image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2, ease }}
                        className="relative flex items-center justify-center order-1 lg:order-2"
                    >
                        {/* Ambient glow */}
                        <div className="absolute inset-[12%] bg-gradient-to-br from-stone-200/50 via-white/80 to-stone-100/30 rounded-full blur-3xl" />

                        {/* Main image with subtle float */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-md sm:max-w-xl lg:max-w-full mx-auto aspect-square"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=900&q=85"
                                alt="AirPods Pro Max — Premium Audio"
                                fill
                                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
                                priority
                                sizes="(max-width: 768px) 80vw, 45vw"
                            />
                        </motion.div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8, ease }}
                            className="absolute bottom-8 sm:bottom-12 left-0 sm:-left-2 glass rounded-2xl px-5 py-3.5 shadow-lg shadow-black/[0.04] flex items-center gap-3"
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
                    </motion.div>
                </div>
            </div>

            {/* Ticker strip */}
            <div className="w-full border-t border-black/[0.04] bg-white/40 backdrop-blur-sm overflow-hidden py-4">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="flex gap-14 whitespace-nowrap"
                >
                    {[...ticker, ...ticker].map((item, i) => (
                        <span key={i} className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#0a0a0a]/20 flex items-center gap-5">
                            {item}
                            <span className="w-1 h-1 bg-[#0a0a0a]/15 rounded-full" />
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
