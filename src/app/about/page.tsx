"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutPage() {
    return (
        <section className="w-full min-h-screen pt-28 sm:pt-36 pb-24 bg-[linear-gradient(180deg,#fbfaf7_0%,#ffffff_40%,#fbfaf8_100%)]">
            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto"
                >
                    <p className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a]/35 font-medium mb-4">
                        Our Story
                    </p>
                    <h1 className="display-font text-4xl sm:text-5xl lg:text-[58px] font-semibold text-[#111418] tracking-[-0.02em] mb-7">
                        About MyChoices
                    </h1>
                    <p className="text-[15px] sm:text-base text-[#0a0a0a]/45 font-light leading-[1.8]">
                        At MyChoices, there&apos;s nothing more we&apos;d like to do than bring
                        smart gadgets and tech lovers together. Our stellar collection is a
                        fine showcase of masterpieces that exhibit craftsmanship, designs
                        that represent timeless tradition, and embrace innovation — featuring
                        over 30 top international labels that inspire people to upgrade
                        their everyday tech.
                    </p>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    className="relative w-full aspect-[21/9] mb-20 sm:mb-24 overflow-hidden rounded-2xl"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                        alt="MyChoices workspace"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </motion.div>

                {/* Values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-10 max-w-5xl mx-auto">
                    {[
                        {
                            title: "Easy Payments",
                            desc: "Multiple secure payment modes so you can shop with confidence, every time.",
                        },
                        {
                            title: "Worldwide Shipping",
                            desc: "We ship all over the world — your favourite products delivered right to your doorstep.",
                        },
                        {
                            title: "Quality Compliance",
                            desc: "Strong focus on quality assurance. Every item is tested and verified before it reaches you.",
                        },
                        {
                            title: "24/7 Support",
                            desc: "Our customer support team is always here for you — around the clock, any day of the week.",
                        },
                        {
                            title: "Easy Returns",
                            desc: "Hassle-free return policy. Not satisfied? We make it simple to send it back.",
                        },
                        {
                            title: "Fastest Delivery",
                            desc: "Lowest rates and fastest delivery guaranteed — because you shouldn't have to wait.",
                        },
                    ].map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease }}
                            className="text-center space-y-4 rounded-2xl border border-black/[0.07] bg-white/75 backdrop-blur-sm px-5 py-6"
                        >
                            <h3 className="text-lg font-bold text-[#0a0a0a] tracking-[-0.02em]">
                                {value.title}
                            </h3>
                            <p className="text-[13px] text-[#0a0a0a]/40 font-light leading-[1.8]">
                                {value.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
