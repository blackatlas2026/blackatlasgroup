import ComingSoon from "@/app/components/ComingSoon";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Hero2 from "./components/home/Hero2";
import ShopByBrand from "./components/home/ShopByBrand";
import FeaturedProducts from "./components/home/FeaturedProducts";
import ShopByBrand2  from "./components/home/ShopByBrand2";
const products = [
  {
    id: "1",
    name: "Grass-Fed Collagen Peptides",
    category: "Collagen",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 5979,
    price: 43.99
  },
  {
    id: "2",
    name: "Collagen Protein Bars",
    category: "Bars",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 1503,
    price: 44.99
  },
  {
    id: "3",
    name: "Nola Bars",
    category: "Bars",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 1282,
    price: 24.99
  },
  {
    id: "4",
    name: "Base Ketones",
    category: "Exogenous Ketones",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 5031,
    price: 42.99
  },
  {
    id: "5",
    name: "Grass-Fed Collagen Peptides",
    category: "Collagen",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 5979,
    price: 43.99
  },
  {
    id: "6",
    name: "Collagen Protein Bars",
    category: "Bars",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 1503,
    price: 44.99
  },
  {
    id: "7",
    name: "Nola Bars",
    category: "Bars",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 1282,
    price: 24.99
  },
  {
    id: "8",
    name: "Base Ketones",
    category: "Exogenous Ketones",
    image: "/images/product1.webp",
    rating: 5,
    reviews: 5031,
    price: 42.99
  }
]


export default function Home() {
  return (<div>
            <Hero/>
            {/* <ShopByBrand/> */}
            <ShopByBrand2/>
            <FeaturedProducts products={products} />

          </div>
          
          
  );
}
