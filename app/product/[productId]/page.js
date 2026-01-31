import ProductHero from "@/app/components/product/ProductHero";
import ProductBento from "@/app/components/product/ProductBento";
import { products } from "@/app/data/products";

import { productPageCards } from "@/app/data/servicesCards";
import TailwindTest from "@/app/components/TailwindTest";

export default function ShopPage() {
    const product = products.find((p) => p.id === "aura-elite");
    return(  <>
        {/* <TailwindTest/> */}
        <ProductHero product={product}/>
        <ProductBento cards={productPageCards}></ProductBento>
    </>);
}