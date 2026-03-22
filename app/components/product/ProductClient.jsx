"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import ProductHero from "@/app/components/product/ProductHero";
import ProductHeroSkeleton from "@/app/components/product/ProductHeroSkeleton";
import StoryCards from "@/app/components/product/StoryCards";

export default function ProductClient({ slug }) {
  const [product, setProduct] = useState(null);
  const [storySection, setStorySection] = useState(null);
  const [loading, setLoading] = useState(true); // single loading flag
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) { setLoading(false); return; }

    setLoading(true);
    setError("");

    async function fetchAll() {
      // 1. Fetch product
      const productRes = await fetch(`/api/products/${slug}`);
      if (!productRes.ok) throw new Error("Product not found");
      const productData = await productRes.json();
      if (productData.error) throw new Error(productData.error);

      // 2. Fetch brand story in the same async chain — no intermediate render
      if (productData.brand) {
        const brandRes = await fetch(`/api/admin/products/brands/${productData.brand}`);
        if (brandRes.ok) {
          const brandData = await brandRes.json();
          const sections = brandData.storySections || [];
          if (productData.brandStoryId && sections.length > 0) {
            const matched = sections.find(s => s.id === productData.brandStoryId);
            setStorySection(matched || null);
          }
        }
      }

      // 3. Set everything at once — single render, no flicker
      setProduct(productData);
    }

    fetchAll()
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <ProductHeroSkeleton />;
  if (error || !product) return notFound();

  return (
    <>
      <ProductHero product={product} />

      {storySection && (
        <StoryCards
          stories={storySection.stories}
          title={storySection.title || ""}
        />
      )}

      <div className="w-full mx-auto px-6 mt-9 py-24 text-center bg-white rounded-4xl flex flex-col items-center">
        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Bulk & Institutional Orders</h3>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">
          For bulk purchases, corporate gifting, events, hotels, or export requirements — get in touch with us directly for custom pricing and volumes.
        </p>
        <Link
          className="inline-block bg-red-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-100"
          href="/contact"
        >
          Enquire Now
        </Link>
      </div>
    </>
  );
}