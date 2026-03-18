import Link from "next/link";

const footerLinks = {
    Shop: [
        { name: "All Products", href: "/collection" },
        { name: "Smart Watches", href: "/collection?category=smartwatches" },
        { name: "Airpods", href: "/collection?category=airpods" },
        { name: "New Offers", href: "/collection?category=new-offers" },
    ],
    Company: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ],
    Support: [
        { name: "Shipping", href: "#" },
        { name: "Returns", href: "#" },
        { name: "FAQ", href: "#" },
    ],
};

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#111] text-white relative">
            {/* Subtle top fade */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 sm:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="space-y-5">
                        <h3 className="text-xl font-bold tracking-[-0.03em]">MyChoices</h3>
                        <p className="text-[13px] text-white/35 font-light leading-[1.8] max-w-xs">
                            Premium electronics curated for modern living. Your Style. Your
                            Choice.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([label, links]) => (
                        <div key={label} className="space-y-5">
                            <h4 className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/50">
                                {label}
                            </h4>
                            <ul className="space-y-3.5">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-[13px] text-white/35 hover:text-white transition-colors duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-white/25 tracking-wide">
                        &copy; {new Date().getFullYear()} MyChoices. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="#"
                            className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-300 tracking-wide"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-300 tracking-wide"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
