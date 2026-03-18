"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-white/85 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
                : "bg-transparent"
                }`}
        >
            <nav className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Logo */}
                    <Link href="/" className="relative z-50 flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[#0a0a0a]">
                            MyChoices
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover-underline text-sm font-medium text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right icons */}
                    <div className="flex items-center gap-1 sm:gap-2">

                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="relative z-50 p-2.5 text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors duration-200 rounded-full hover:bg-black/[0.04]"
                            aria-label="Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2.5 text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors duration-200 rounded-full hover:bg-black/[0.04]"
                            aria-label="Shopping cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        key="badge"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                        className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#0a0a0a] text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 leading-none"
                                    >
                                        {totalItems > 99 ? "99+" : totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden relative z-50 p-2.5 rounded-full hover:bg-black/[0.04]"
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 h-3.5 flex flex-col justify-between">
                                <span className={`block h-[1.5px] bg-[#0a0a0a] transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
                                <span className={`block h-[1.5px] bg-[#0a0a0a] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                                <span className={`block h-[1.5px] bg-[#0a0a0a] transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Search Bar Dropdown */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden border-t border-black/[0.06]"
                        >
                            <div className="flex items-center gap-3 py-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#0a0a0a]/30 flex-shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search products…"
                                    className="w-full bg-transparent text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:outline-none py-1"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="text-xs text-[#0a0a0a]/30 hover:text-[#0a0a0a]/60 transition-colors flex-shrink-0"
                                >
                                    ESC
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-white z-40 md:hidden flex flex-col"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 12 }}
                                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-4xl font-light text-[#0a0a0a] hover:opacity-40 transition-opacity duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-10"
                            >
                                <Link
                                    href="/cart"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm text-[#0a0a0a]/40 flex items-center gap-2"
                                >
                                    Cart
                                    {totalItems > 0 && (
                                        <span className="px-2 py-0.5 bg-[#0a0a0a] text-white text-xs rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
