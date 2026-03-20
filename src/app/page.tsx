import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import FeaturedBanner from "@/components/FeaturedBanner";

export default function Home() {
    return (
        <div className="relative overflow-hidden">
            <Hero />
            <Categories />
            <BestSellers />
            <FeaturedBanner />
        </div>
    );
}
