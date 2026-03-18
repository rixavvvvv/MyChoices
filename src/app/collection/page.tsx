"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import type { Product } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const [hovered, setHovered] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const inCart = isInCart(product.id);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#f5f5f3] rounded-xl">
          {/* Primary image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${hovered && product.hoverImage ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover image */}
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-700 absolute inset-0 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] uppercase bg-[#0a0a0a] text-white rounded-full z-10">
              {product.badge}
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setWishlist((v) => !v);
              toast(wishlist ? "Removed from wishlist" : "Saved to wishlist", "info");
            }}
            className={`absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full transition-all duration-300 ${hovered || wishlist ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              }`}
            aria-label="Wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill={wishlist ? "#0a0a0a" : "none"} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          {/* Quick Add overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                toast(`${product.name} added to cart`);
              }}
              className={`btn-scale w-full py-3 text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full transition-colors duration-200 ${inCart
                ? "bg-[#0a0a0a] text-white"
                : "bg-white/95 backdrop-blur-sm text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
                }`}
            >
              {inCart ? "✓ Added" : "Quick Add"}
            </button>
          </div>
        </div>
        <div className="py-4 space-y-1.5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/30 font-medium">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-[#0a0a0a] group-hover:opacity-60 transition-opacity duration-300">
            {product.name}
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <section className="w-full min-h-screen pt-28 sm:pt-36 pb-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a]/35 font-medium mb-4">
            All Products
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0a0a0a] tracking-[-0.03em]">
            Collection
          </h1>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
