"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { products, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

function ProductCard({ product }: { product: Product }) {
    const { addToCart, isInCart } = useCart();
    const { toast } = useToast();
    const [hovered, setHovered] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const inCart = isInCart(product.id);

    return (
        <motion.div variants={cardVariants}>
            <Link
                href={`/product/${product.id}`}
                className="group block relative overflow-hidden rounded-xl bg-gray-50 card-lift"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Product image — no swap, subtle zoom on hover */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered ? "scale-[1.04]" : "scale-100"}`}
                        sizes="(max-width: 640px) 50vw, 25vw"
                    />

                    {/* Badge */}
                    {product.badge && (
                        <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase bg-[#0a0a0a] text-white rounded-full z-10">
                            {product.badge}
                        </span>
                    )}

                    {/* Wishlist */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setWishlist((v) => !v);
                            toast(wishlist ? "Removed from wishlist" : "Added to wishlist", "info");
                        }}
                        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-sm ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                        aria-label="Add to wishlist"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill={wishlist ? "#0a0a0a" : "none"} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>

                    {/* Quick Add */}
                    <div className={`absolute inset-x-0 bottom-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                toast(`${product.name} added to cart`);
                            }}
                            className={`w-full py-4 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 flex items-center justify-center gap-2 ${inCart ? "bg-[#0a0a0a] text-white" : "bg-white/90 backdrop-blur-sm text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"}`}
                        >
                            {inCart ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                    In Cart
                                </>
                            ) : "Add to Cart"}
                        </button>
                    </div>
                </div>

                {/* Info below image */}
                <div className="px-4 py-5 space-y-1.5">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-medium">{product.category}</p>
                    <h3 className="text-[15px] font-medium text-[#0a0a0a] group-hover:text-[#0a0a0a]/60 transition-colors duration-300">{product.name}</h3>
                </div>
            </Link>
        </motion.div>
    );
}

export default function BestSellers() {
    const bestSellers = products.slice(0, 4);

    return (
        <section className="relative w-full py-24 sm:py-32 bg-[#fafaf8] overflow-hidden">
            {/* Ambient blobs */}
            <div className="ambient-blob w-[350px] h-[350px] bg-stone-300 top-[5%] right-[-5%]" />
            <div className="ambient-blob-alt w-[300px] h-[300px] bg-slate-300 bottom-[10%] left-[-3%]" />

            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
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
                                Top Picks
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
                                Best Sellers
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
                            All products
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
                >
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

