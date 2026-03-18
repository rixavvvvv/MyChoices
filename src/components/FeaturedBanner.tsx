"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FeaturedBanner() {
    return (
        <section className="relative w-full py-24 sm:py-32 bg-white overflow-hidden">
            {/* Top separator */}
            <div className="section-divider w-full absolute top-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease }}
                className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a] w-full rounded-none sm:rounded-none"
            >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] sm:min-h-[600px] lg:min-h-[680px]">
                    {/* Text side */}
                    <div className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-28 py-20 sm:py-24 space-y-8 order-2 lg:order-1 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8, ease }}
                            className="space-y-4"
                        >
                            <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 font-medium">
                                Featured Drop
                            </p>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.02]">
                                Precision
                                <br />
                                <span className="font-extralight italic text-white/80">meets Design.</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35, duration: 0.7, ease }}
                            className="text-white/35 font-light max-w-sm leading-[1.8] text-[15px]"
                        >
                            Where engineering excellence and minimalist aesthetics converge.
                            Technology that speaks through silence.
                        </motion.p>

                        {/* Feature pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.45, duration: 0.6, ease }}
                            className="flex flex-wrap gap-2.5"
                        >
                            {["30hr Battery", "ANC", "Titanium Build"].map((f) => (
                                <span key={f} className="px-4 py-2 rounded-full border border-white/10 text-white/40 text-[11px] font-medium tracking-wide">
                                    {f}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55, duration: 0.6, ease }}
                            className="flex gap-4 flex-wrap pt-2"
                        >
                            <Link
                                href="/collection"
                                className="btn-scale group inline-flex items-center gap-2.5 px-9 py-4 bg-white text-[#0a0a0a] text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full"
                            >
                                Shop Now
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/product/3"
                                className="btn-scale inline-flex items-center gap-2 px-9 py-4 border border-white/15 text-white/60 text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full hover:border-white/30 hover:text-white"
                            >
                                View Product
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image side */}
                    <div className="relative min-h-[300px] lg:min-h-full order-1 lg:order-2">
                        <Image
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85"
                            alt="Featured headphones"
                            fill
                            className="object-cover opacity-80"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent lg:bg-gradient-to-l" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
