"use client";
import { useEffect, useState } from "react";
import ProductHero from "@/app/components/product/ProductHero";
import ProductBento from "@/app/components/product/ProductBento";
import ProductTable from "@/app/components/product/ProductTable";
import WayLeafCards from "@/app/components/product/WayLeafCards";
import { productPageCards } from "@/app/data/servicesCards";

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

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <ProductHero product={product} />
      {/* <ProductBento cards={productPageCards} /> */}
      <WayLeafCards></WayLeafCards>
      {product.specs != null && <ProductTable specs={product.specs} />}
    </>
  );
}
