"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "4.9", label: "Average Rating" },
    { value: "24/7", label: "Customer Support" },
    { value: "2yr", label: "Warranty Included" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function TrustBanner() {
    return (
        <section className="relative w-full pt-14 pb-0 sm:pt-16 bg-white overflow-hidden">
            {/* Subtle top gradient from previous dark section */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Stats row */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-14 sm:mb-16"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="text-center py-6 sm:py-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/80 hover:border-gray-200 transition-all duration-500 hover:shadow-lg hover:shadow-black/[0.03]"
                        >
                            <p className="text-3xl sm:text-4xl font-bold text-[#0a0a0a] tracking-[-0.03em]">{stat.value}</p>
                            <p className="text-[12px] text-gray-400 font-medium tracking-wide mt-1.5 uppercase">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Newsletter / CTA strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a0a0a] via-[#141414] to-[#1a1a1a] px-8 sm:px-14 py-10 sm:py-12"
                >
                    {/* Ambient glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-white/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-[20%] w-[300px] h-[300px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em]">
                                Stay in the loop
                            </h3>
                            <p className="text-[14px] text-white/35 font-light mt-2 max-w-md">
                                Get exclusive drops, early access deals, and curated picks — delivered to your inbox.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 lg:w-64 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                            />
                            <Link
                                href="/collection"
                                className="btn-scale inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0a0a0a] text-[12px] font-semibold tracking-[0.06em] uppercase rounded-full whitespace-nowrap"
                            >
                                Subscribe
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Gradient transition into footer */}
            <div className="h-8 sm:h-10 bg-gradient-to-b from-white to-[#0a0a0a]" />
        </section>
    );
}
