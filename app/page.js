


import ComingSoon from "@/app/components/ComingSoon";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Hero2 from "./components/home/Hero2";
import ShopByBrand from "./components/home/ShopByBrand";
import FeaturedProducts from "./components/home/FeaturedProducts";
import TailwindTest from "./components/TailwindTest";
import ShopByBrand2  from "./components/home/ShopByBrand2";


import { getFeaturedProducts } from "@/lib/services/productService";



export default async function Home() {

  const products = await getFeaturedProducts();
  return (<div>
            

            <Hero/>
            {/* <WayLeafCards></WayLeafCards> */}
            <ShopByBrand2/>
            <FeaturedProducts products={products} />

          </div>
          
          
  );
}
