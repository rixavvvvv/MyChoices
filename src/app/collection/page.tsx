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
      className="group relative transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f3] rounded-xl border border-black/[0.05]">
          {/* Single product image with subtle home-style hover zoom */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${hovered ? "scale-[1.03]" : "scale-100"
              }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
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
        <div className="py-3.5 space-y-1">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/30 font-medium">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-[#0a0a0a] group-hover:opacity-60 transition-opacity duration-300">
            {product.name}
          </h3>
          <div className="h-px w-full bg-gradient-to-r from-black/[0.08] to-transparent mt-1" />
        </div>
      </Link>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <section className="w-full min-h-screen pt-24 sm:pt-28 pb-14 sm:pb-16 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-9"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a]/35 font-medium mb-4">
            All Products
          </p>
          <h1 className="display-font text-4xl sm:text-5xl lg:text-[58px] font-semibold text-[#111418] tracking-[-0.02em]">
            Collection
          </h1>
          <p className="text-sm text-gray-500 mt-3">
            Explore our curated premium tech collection
          </p>
        </motion.div>

        <div className="mb-5 text-[11px] tracking-[0.16em] uppercase text-[#0a0a0a]/40 font-medium text-right">
          {products.length} Products
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
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
