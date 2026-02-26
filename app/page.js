


import ComingSoon from "@/app/components/ComingSoon";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Hero2 from "./components/home/Hero2";
import ShopByBrand from "./components/home/ShopByBrand";
import FeaturedProducts from "./components/home/FeaturedProducts";
import TailwindTest from "./components/TailwindTest";
import ShopByBrand2  from "./components/home/ShopByBrand2";
import { getAllBrands } from "@/lib/services/productService";

import { getFeaturedProducts } from "@/lib/services/productService";

export const dynamic = 'force-dynamic'; 

export default async function Home() {

  const products = await getFeaturedProducts();
  const brands = await getAllBrands();
  const brandData = brands.map(brand => ({
    name: brand.name,
    tagline: brand.tagline,
    logo: brand.logo
  }));
  return (<div>
            

            <Hero/>
            {/* <WayLeafCards></WayLeafCards> */}
            <ShopByBrand2 brands={brandData}/>
            <FeaturedProducts products={products} />

          </div>
          
          
  );
}
