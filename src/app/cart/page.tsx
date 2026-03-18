"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

export default function CartPage() {
    const { items: cartItems, totalItems, increment, decrement, removeFromCart, clearCart } = useCart();
    const { toast } = useToast();

    return (
        <section className="w-full min-h-screen pt-28 sm:pt-36 pb-24 bg-white">
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a]/35 font-medium mb-4">
                        Shopping
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0a0a0a] tracking-[-0.03em]">
                        Your Cart {totalItems > 0 && <span className="text-xl font-light text-[#0a0a0a]/25">({totalItems})</span>}
                    </h1>
                </motion.div>

                {totalItems > 0 && (
                    <div className="mb-8 flex justify-end">
                        <button
                            onClick={() => { clearCart(); toast("Cart cleared", "info"); }}
                            className="text-[11px] tracking-[0.15em] uppercase text-[#0a0a0a]/25 hover:text-[#0a0a0a] transition-colors duration-300"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                {/* Cart Items */}
                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 space-y-8"
                    >
                        <p className="text-lg text-[#0a0a0a]/35 font-light">
                            Your cart is empty
                        </p>
                        <Link
                            href="/collection"
                            className="btn-scale inline-flex items-center justify-center px-10 py-4 bg-[#0a0a0a] text-white text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full"
                        >
                            Continue Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-0">
                        {/* Column labels */}
                        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_auto] gap-8 items-center pb-4 border-b border-[#0a0a0a]/8">
                            <span className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/25 font-medium">
                                Product
                            </span>
                            <span className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/25 font-medium w-24 text-center">
                                Quantity
                            </span>
                            <span className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/25 font-medium w-10">
                                &nbsp;
                            </span>
                        </div>

                        <AnimatePresence initial={false}>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 sm:gap-8 items-center py-6 border-b border-[#0a0a0a]/8"
                                >
                                    {/* Product Info */}
                                    <div className="flex items-center gap-5">
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#f5f5f3] flex-shrink-0 overflow-hidden rounded-xl">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                sizes="96px"
                                            />
                                        </div>
                                        <div className="space-y-1.5 min-w-0">
                                            <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/30 font-medium">
                                                {item.category}
                                            </p>
                                            <h3 className="text-sm font-medium text-[#0a0a0a] truncate">
                                                {item.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3 w-24 justify-center">
                                        <button
                                            onClick={() => decrement(item.id)}
                                            className="w-8 h-8 flex items-center justify-center border border-[#0a0a0a]/10 text-[#0a0a0a]/50 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors duration-200 text-sm cursor-pointer rounded-full"
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <span className="text-sm font-medium w-6 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => increment(item.id)}
                                            className="w-8 h-8 flex items-center justify-center border border-[#0a0a0a]/10 text-[#0a0a0a]/50 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors duration-200 text-sm cursor-pointer rounded-full"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => { removeFromCart(item.id); toast(`${item.name} removed`, "info"); }}
                                        className="text-[#0a0a0a]/25 hover:text-[#0a0a0a] transition-colors duration-200 w-10 flex justify-center cursor-pointer"
                                        aria-label="Remove item"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18 18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 pt-10 justify-between items-center"
                        >
                            <Link
                                href="/collection"
                                className="inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                </svg>
                                Continue Shopping
                            </Link>
                            <button className="btn-scale px-12 py-4 bg-[#0a0a0a] text-white text-[12px] font-semibold tracking-[0.08em] uppercase rounded-full cursor-pointer">
                                Checkout
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
