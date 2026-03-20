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
        <footer className="w-full bg-neutral-900 text-white">
            <div className="w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-10 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="display-font text-2xl font-semibold tracking-tight text-white">MyChoices</h3>
                        <p className="text-[13px] text-gray-400 font-light leading-[1.8] max-w-xs">
                            Premium electronics curated for modern living. Your Style. Your
                            Choice.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([label, links]) => (
                        <div key={label} className="space-y-4">
                            <h4 className="text-[11px] font-medium tracking-[0.25em] uppercase text-gray-300">
                                {label}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-[13px] text-gray-400 hover:text-white transition-colors duration-300"
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
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-gray-400 tracking-wide">
                        &copy; {new Date().getFullYear()} MyChoices. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="#"
                            className="text-[11px] text-gray-400 hover:text-white transition-colors duration-300 tracking-wide"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="text-[11px] text-gray-400 hover:text-white transition-colors duration-300 tracking-wide"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
