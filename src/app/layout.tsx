import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { ToastProvider } from "@/lib/toast-context";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
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
        <html lang="en" className={inter.variable}>
            <body className="w-full min-h-screen overflow-x-hidden bg-white text-[#0a0a0a] antialiased">
                <CartProvider>
                    <ToastProvider>
                        <Navbar />
                        <main className="w-full overflow-x-hidden">{children}</main>
                        <Footer />
                    </ToastProvider>
                </CartProvider>
            </body>
        </html>
    );
}
