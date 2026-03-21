import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { ToastProvider } from "@/lib/toast-context";

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
});

export const metadata: Metadata = {
    title: "MyChoices — Premium Electronics",
    description:
        "Your Style. Your Choice. Discover premium electronics curated for modern living.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${sora.variable} ${playfair.variable}`}>
            <body className="w-full min-h-screen overflow-x-hidden bg-white text-[#0a0a0a] antialiased">
                <div className="site-shell">
                    <CartProvider>
                        <ToastProvider>
                            <Navbar />
                            <main className="w-full overflow-x-hidden">{children}</main>
                            <div className="mt-6 h-px border-t border-gray-200 bg-transparent" />
                            <Footer />
                        </ToastProvider>
                    </CartProvider>
                </div>
            </body>
        </html>
    );
}
