"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ContactPage() {
    return (
        <section className="w-full min-h-screen pt-28 sm:pt-36 pb-24 bg-[linear-gradient(180deg,#fbfaf7_0%,#ffffff_40%,#fbfaf8_100%)]">
            <div className="w-full max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <p className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a]/35 font-medium mb-4">
                        Get in Touch
                    </p>
                    <h1 className="display-font text-4xl sm:text-5xl lg:text-[58px] font-semibold text-[#111418] tracking-[-0.02em] mb-7">
                        Contact Us
                    </h1>
                    <p className="text-[15px] text-[#0a0a0a]/45 font-light leading-[1.8] max-w-md mx-auto">
                        Have a question or need help? We&apos;d love to hear from you.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease }}
                    className="space-y-8 rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur-sm px-6 py-7 sm:px-8 sm:py-9"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2.5">
                            <label
                                htmlFor="name"
                                className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/35 font-medium"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/10 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:border-[#0a0a0a] focus:outline-none transition-colors duration-300"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label
                                htmlFor="email"
                                className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/35 font-medium"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/10 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:border-[#0a0a0a] focus:outline-none transition-colors duration-300"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label
                            htmlFor="subject"
                            className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/35 font-medium"
                        >
                            Subject
                        </label>
                        <input
                            id="subject"
                            type="text"
                            className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/10 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:border-[#0a0a0a] focus:outline-none transition-colors duration-300"
                            placeholder="How can we help?"
                        />
                    </div>

                    <div className="space-y-2.5">
                        <label
                            htmlFor="message"
                            className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/35 font-medium"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/10 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:border-[#0a0a0a] focus:outline-none transition-colors duration-300 resize-none"
                            placeholder="Tell us more..."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="btn-scale w-full sm:w-auto px-12 py-4 bg-[#0a0a0a] text-white text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full cursor-pointer"
                        >
                            Send Message
                        </button>
                    </div>
                </motion.form>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease }}
                    className="mt-24 pt-12 border-t border-[#0a0a0a]/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
                >
                    <div className="space-y-2.5">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/25 font-medium">
                            Email
                        </p>
                        <p className="text-sm text-[#0a0a0a]">info@shoppingvelleys.com</p>
                    </div>
                    <div className="space-y-2.5">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/25 font-medium">
                            Phone
                        </p>
                        <p className="text-sm text-[#0a0a0a]">+91 97185 16023</p>
                    </div>
                    <div className="space-y-2.5">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/25 font-medium">
                            Location
                        </p>
                        <p className="text-sm text-[#0a0a0a]">New Delhi, India</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
