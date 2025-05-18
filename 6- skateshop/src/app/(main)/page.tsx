import { HeroSection } from "@/modules/shared/HeroSection"
import { FeaturedProducts } from "@/modules/products/components/products/FeaturedProducts"
import { FeaturedCategories } from "@/modules/categories/components/FeaturedCategories"
import { PromoSection } from "@/modules/shared/PromoSection"
// import { LearningCenter } from "@/modules/lerning-center/page";
import Map from "@/modules/skate-map/map";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <HeroSection />
      <FeaturedCategories />
      <PromoSection />
      <FeaturedProducts />
      {/* <LearningCenter /> */}
      <Map />

    </div>
  );
}