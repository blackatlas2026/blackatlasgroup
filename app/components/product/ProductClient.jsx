"use client";
import { useEffect, useState } from "react";
import ProductHero from "@/app/components/product/ProductHero";
import ProductHeroSkeleton from "@/app/components/product/ProductHeroSkeleton";


import WayLeafCards from "@/app/components/product/WayLeafCards";


export default function ProductClient({ slug }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setProduct(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
      return (
        <>
          <ProductHeroSkeleton />
        </>
      );
    }

  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <ProductHero product={product} />
      {/* <ProductBento cards={productPageCards} /> */}
      <WayLeafCards></WayLeafCards>
      {/* {product.specs != null && <ProductTable specs={product.specs} />} */}
      <div className="w-full mx-auto px-6  mt-9 py-24 text-center bg-white rounded-4xl flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Bulk & Institutional Orders</h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">For bulk purchases, corporate gifting, events, hotels, or export requirements — get in touch with us directly for custom pricing and volumes.</p>
            <a className="inline-block bg-red-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-100 " href="#">Enquire Now</a>
        </div>
    </>
  );
}
