export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    hoverImage?: string;
    badge?: string;
    features?: string[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "AirPods Pro Max",
        category: "Audio",
        description:
            "High-fidelity audio meets active noise cancellation. Custom-built driver and amplifier delivers pure, distortion-free sound across the entire audible range.",
        image:
            "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=900&q=85",
        hoverImage:
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=900&q=85",
        badge: "Best Seller",
        features: ["Active Noise Cancellation", "30-Hour Battery", "Spatial Audio"],
    },
    {
        id: "2",
        name: "Galaxy Watch Ultra",
        category: "Wearables",
        description:
            "Titanium-grade build with sapphire crystal glass. Advanced health sensors track heart rate, SpO2, and ECG with medical-grade precision.",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
        hoverImage:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=85",
        badge: "New",
        features: ["Health Monitoring", "7-Day Battery", "Titanium Case"],
    },
    {
        id: "3",
        name: "Studio Over-Ear Headphones",
        category: "Audio",
        description:
            "Reference-class sound in a breathable over-ear design. 45mm neodymium drivers with custom-tuned frequency response for studio accuracy.",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85",
        hoverImage:
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=85",
        features: ["45mm Drivers", "40hr Battery", "Foldable Design"],
    },
    {
        id: "4",
        name: "True Wireless Earbuds",
        category: "Audio",
        description:
            "Completely wire-free earbuds with dual-mic call quality and custom EQ profiles. Secure fit for all-day comfort during work or workouts.",
        image:
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=85",
        badge: "Popular",
        features: ["IPX5 Water Resistant", "30hr Total Battery", "Touch Controls"],
    },
    {
        id: "5",
        name: "ProBook Laptop Stand",
        category: "Accessories",
        description:
            "Aerospace-grade aluminium construction with seven adjustable angles. Precision-milled surface dissipates heat while elevating your workflow.",
        image:
            "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85",
        features: ["7 Angles", "Universal Fit", "Anodised Aluminium"],
    },
    {
        id: "6",
        name: "Magnetic Power Bank",
        category: "Accessories",
        description:
            "10,000 mAh slimline power bank with MagSafe-compatible wireless charging. Snap-on convenience with 20W USB-C pass-through fast charging.",
        image:
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=85",
        badge: "New",
        features: ["10,000 mAh", "MagSafe Compatible", "20W Fast Charge"],
    },
];

export const categories = [
    {
        name: "Audio",
        image:
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=85",
        slug: "audio",
        count: "12 Products",
    },
    {
        name: "Wearables",
        image:
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=900&q=85",
        slug: "wearables",
        count: "8 Products",
    },
    {
        name: "Accessories",
        image:
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=85",
        slug: "accessories",
        count: "15 Products",
    },
    {
        name: "Displays",
        image:
            "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&q=85",
        slug: "displays",
        count: "6 Products",
    },
];
