"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const foundProduct = products.find((p) => p.id === id);

    if (!foundProduct) return notFound();

    const product = foundProduct;

    const { addToCart, isInCart } = useCart();
    const { toast } = useToast();
    const [activeImg, setActiveImg] = useState(0);
    const [wishlist, setWishlist] = useState(false);
    const [adding, setAdding] = useState(false);
    const inCart = isInCart(product.id);

    const images = [product.image, ...(product.hoverImage ? [product.hoverImage] : [])];
    const related = products.filter((p) => p.id !== product.id).slice(0, 4);

    async function handleAdd() {
        setAdding(true);
        addToCart(product);
        toast(`${product.name} added to cart`);
        await new Promise((r) => setTimeout(r, 800));
        setAdding(false);
    }

    return (
        <div className="w-full min-h-screen bg-white">
            <section className="w-full pt-28 sm:pt-32 pb-20 sm:pb-24">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 sm:mb-14"
                    >
                        <ol className="flex items-center gap-2 text-[11px] text-[#0a0a0a]/30 font-medium tracking-wide">
                            <li><Link href="/" className="hover:text-[#0a0a0a] transition-colors duration-300">Home</Link></li>
                            <li>/</li>
                            <li><Link href="/collection" className="hover:text-[#0a0a0a] transition-colors duration-300">Collection</Link></li>
                            <li>/</li>
                            <li className="text-[#0a0a0a]/60">{product.name}</li>
                        </ol>
                    </motion.nav>

                    {/* Product Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                        {/* Left — Images */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease }}
                            className="space-y-3"
                        >
                            <div className="relative aspect-square bg-[#f5f5f3] overflow-hidden rounded-xl">
                                <Image
                                    src={images[activeImg]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {product.badge && (
                                    <span className="absolute top-5 left-5 px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] uppercase bg-[#0a0a0a] text-white rounded-full">
                                        {product.badge}
                                    </span>
                                )}
                            </div>
                            {images.length > 1 && (
                                <div className="flex gap-2.5">
                                    {images.map((src, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImg(i)}
                                            className={`relative w-20 h-20 bg-[#f5f5f3] overflow-hidden flex-shrink-0 transition-all duration-200 rounded-lg ${activeImg === i ? "ring-1 ring-[#0a0a0a]" : "opacity-50 hover:opacity-80"
                                                }`}
                                        >
                                            <Image src={src} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Right — Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.12, ease }}
                            className="flex flex-col justify-start space-y-8 lg:pt-4"
                        >
                            <div className="space-y-4">
                                <p className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a]/30 font-medium">{product.category}</p>
                                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0a0a0a] tracking-[-0.03em] leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <p className="text-[15px] text-[#0a0a0a]/45 font-light leading-[1.8]">
                                {product.description}
                            </p>

                            {product.features && (
                                <ul className="space-y-2.5">
                                    {product.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-[13px] text-[#0a0a0a]/55">
                                            <span className="w-1 h-1 bg-[#0a0a0a]/30 rounded-full flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="h-px bg-black/[0.06]" />

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <motion.button
                                    onClick={handleAdd}
                                    whileTap={{ scale: 0.97 }}
                                    disabled={adding}
                                    className={`btn-scale flex-1 py-4 text-[12px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-full ${adding
                                        ? "bg-[#0a0a0a]/70 text-white cursor-wait"
                                        : inCart
                                            ? "bg-[#0a0a0a] text-white"
                                            : "bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]"
                                        }`}
                                >
                                    {adding ? (
                                        <>
                                            <svg className="animate-spin w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Adding…
                                        </>
                                    ) : inCart ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            Added to Cart
                                        </>
                                    ) : (
                                        "Add to Cart"
                                    )}
                                </motion.button>

                                <button
                                    onClick={() => {
                                        setWishlist((v) => !v);
                                        toast(wishlist ? "Removed from wishlist" : "Saved to wishlist", "info");
                                    }}
                                    className="w-14 h-14 border border-[#0a0a0a]/10 flex items-center justify-center hover:border-[#0a0a0a]/30 transition-colors duration-200 rounded-full"
                                    aria-label="Wishlist"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill={wishlist ? "#0a0a0a" : "none"} className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {["Free shipping on all orders", "2-year manufacturer warranty", "30-day hassle-free returns"].map((text) => (
                                    <div key={text} className="flex items-center gap-2.5 text-[11px] text-[#0a0a0a]/35">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related products */}
            <section className="w-full py-24 sm:py-32 bg-[#fafaf8]">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl font-bold text-[#0a0a0a] tracking-[-0.03em] mb-12"
                    >
                        You may also like
                    </motion.h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {related.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.6 }}
                            >
                                <Link href={`/product/${p.id}`} className="group block">
                                    <div className="relative aspect-square overflow-hidden bg-[#f5f5f3] rounded-xl">
                                        <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                                    </div>
                                    <div className="pt-4 space-y-1.5">
                                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/30 font-medium">{p.category}</p>
                                        <h3 className="text-xs sm:text-sm font-medium text-[#0a0a0a] group-hover:opacity-60 transition-opacity duration-300">{p.name}</h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
