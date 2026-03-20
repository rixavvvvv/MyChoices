"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FeaturedBanner() {
    return (
        <section className="relative w-full pt-8 pb-0 sm:pt-10 bg-[#fafaf8] overflow-hidden -mt-2">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease }}
                className="relative overflow-hidden bg-gradient-to-br from-[#1a1f26] via-[#222a35] to-[#151a20] w-full"
            >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,_rgba(224,190,138,0.18)_0%,_transparent_50%)]" />
                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
                    {/* Text side */}
                    <div className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-28 py-16 sm:py-20 space-y-6 order-2 lg:order-1 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8, ease }}
                            className="space-y-3"
                        >
                            <div className="flex items-center gap-3">
                                <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 font-medium">
                                    Featured Drop
                                </p>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">Live</span>
                                </span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-[-0.03em] leading-[1.02]">
                                Precision
                                <br />
                                <span className="display-font font-medium italic text-[#f3ddbc]">meets Design.</span>
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
                            className="flex flex-wrap gap-2"
                        >
                            {[
                                { icon: "30h", label: "Battery" },
                                { icon: "ANC", label: "Noise Cancel" },
                                { icon: "Ti", label: "Titanium Build" },
                            ].map((f) => (
                                <span key={f.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/45 text-[11px] font-medium tracking-wide hover:border-[#f3ddbc]/35 hover:text-[#f3ddbc] transition-all duration-300">
                                    <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-white/5 px-2 py-0.5 text-[10px] tracking-[0.08em] text-[#f3ddbc]">{f.icon}</span>
                                    {f.label}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55, duration: 0.6, ease }}
                            className="flex gap-4 flex-wrap pt-1"
                        >
                            <Link
                                href="/collection"
                                className="btn-scale group inline-flex items-center gap-2.5 px-9 py-4 bg-[#f3ddbc] text-[#111418] text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full"
                            >
                                Shop Now
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/product/3"
                                className="btn-scale inline-flex items-center gap-2 px-9 py-4 border border-[#f3ddbc]/25 text-[#f6e9d4]/80 text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full hover:border-[#f3ddbc]/60 hover:text-[#f3ddbc]"
                            >
                                View Product
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image side */}
                    <div className="relative min-h-[280px] lg:min-h-full order-1 lg:order-2">
                        <Image
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85"
                            alt="Featured headphones"
                            fill
                            className="object-cover opacity-75"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#141920] via-[#141920]/35 to-transparent lg:bg-gradient-to-l" />

                        {/* Floating price tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.7, ease }}
                            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 glass rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3"
                        >
                            <div className="w-8 h-8 bg-[#141920] rounded-full flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#6b7280] font-medium uppercase tracking-wider">Limited Edition</p>
                                <p className="text-[13px] font-bold text-[#141920]">Shop Now →</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
