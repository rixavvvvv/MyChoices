import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Create admin user
    const adminPassword = await hash("admin123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@mychoices.com" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@mychoices.com",
            password: adminPassword,
            role: "ADMIN",
        },
    });
    console.log("Admin user created:", admin.email);

    // Create categories
    const categoriesData = [
        {
            name: "Audio",
            slug: "audio",
            image:
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=85",
        },
        {
            name: "Wearables",
            slug: "wearables",
            image:
                "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=900&q=85",
        },
        {
            name: "Accessories",
            slug: "accessories",
            image:
                "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=85",
        },
        {
            name: "Displays",
            slug: "displays",
            image:
                "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=900&q=85",
        },
    ];

    const categories: Record<string, string> = {};
    for (const cat of categoriesData) {
        const created = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
        categories[cat.slug] = created.id;
    }
    console.log("Categories created:", Object.keys(categories).length);

    // Create products
    const productsData = [
        {
            name: "AirPods Pro Max",
            slug: "airpods-pro-max",
            description:
                "High-fidelity audio meets active noise cancellation. Custom-built driver and amplifier delivers pure, distortion-free sound across the entire audible range.",
            price: 549.0,
            image:
                "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=900&q=85",
            hoverImage:
                "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=900&q=85",
            badge: "Best Seller",
            features: ["Active Noise Cancellation", "30-Hour Battery", "Spatial Audio"],
            stock: 50,
            categorySlug: "audio",
        },
        {
            name: "Galaxy Watch Ultra",
            slug: "galaxy-watch-ultra",
            description:
                "Titanium-grade build with sapphire crystal glass. Advanced health sensors track heart rate, SpO2, and ECG with medical-grade precision.",
            price: 699.0,
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85",
            hoverImage:
                "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=85",
            badge: "New",
            features: ["Health Monitoring", "7-Day Battery", "Titanium Case"],
            stock: 30,
            categorySlug: "wearables",
        },
        {
            name: "Studio Over-Ear Headphones",
            slug: "studio-over-ear-headphones",
            description:
                "Reference-class sound in a breathable over-ear design. 45mm neodymium drivers with custom-tuned frequency response for studio accuracy.",
            price: 349.0,
            image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85",
            hoverImage:
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=85",
            features: ["45mm Drivers", "40hr Battery", "Foldable Design"],
            stock: 45,
            categorySlug: "audio",
        },
        {
            name: "True Wireless Earbuds",
            slug: "true-wireless-earbuds",
            description:
                "Completely wire-free earbuds with dual-mic call quality and custom EQ profiles. Secure fit for all-day comfort during work or workouts.",
            price: 179.0,
            image:
                "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=85",
            hoverImage:
                "https://images.unsplash.com/photo-1560707854-fb9a2f3e91e9?w=900&q=85",
            badge: "Popular",
            features: ["IPX5 Water Resistant", "30hr Total Battery", "Touch Controls"],
            stock: 100,
            categorySlug: "audio",
        },
        {
            name: "ProBook Laptop Stand",
            slug: "probook-laptop-stand",
            description:
                "Aerospace-grade aluminium construction with seven adjustable angles. Precision-milled surface dissipates heat while elevating your workflow.",
            price: 89.0,
            image:
                "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85",
            features: ["7 Angles", "Universal Fit", "Anodised Aluminium"],
            stock: 75,
            categorySlug: "accessories",
        },
        {
            name: "Magnetic Power Bank",
            slug: "magnetic-power-bank",
            description:
                "10,000 mAh slimline power bank with MagSafe-compatible wireless charging. Snap-on convenience with 20W USB-C pass-through fast charging.",
            price: 59.0,
            image:
                "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=85",
            badge: "New",
            features: ["10,000 mAh", "MagSafe Compatible", "20W Fast Charge"],
            stock: 120,
            categorySlug: "accessories",
        },
    ];

    for (const p of productsData) {
        const { categorySlug, ...productData } = p;
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                ...productData,
                categoryId: categories[categorySlug],
            },
        });
    }
    console.log("Products created:", productsData.length);

    console.log("Seeding complete!");
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
