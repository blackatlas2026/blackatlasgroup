

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
    const storyData = [
  {
    title: "Made from naturally fallen palm leaves",
    text: "We don't cut down trees. Every plate begins its life as a naturally shed leaf from the Areca palm tree, harvested sustainably by local communities.",
    image: "/images/wayleafCards/1.jpg",
  },
  {
    title: "No chemicals, no coatings, no plastics",
    text: "Our process uses only water and heat. Pure, tactile, and completely safe for your family without any hidden toxins.",
    image: "/images/wayleafCards/2.jpg",
  },
  {
    title: "Hot, cold, and oily food safe",
    text: "Engineered by nature to handle everything from steaming pastas to chilled desserts without leaking or warping.",
    image: "/images/wayleafCards/3.jpg",
  },
  {
    title: "Perfect for events & weddings",
    text: "The elegant wood-like grain adds a premium touch to gatherings while keeping sustainability at the center.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcoazEDdM2IsSClwH-VoYjM8FhiRPkUyPoFppn6sPn5m3hMYupsT3P2liKhp2wIM9ow9-SB6_jOp_J-FC2hg1XesQAiebBgEf_OsGbdvcNqWzJ7UDipOwba7pIUbc6KGBxtrwfTUSsUreqEFk_e-lVkcTgoMe5Q6nt6sZtEY-Vo60mQvllGcW3FM0D-VlFOri-gM3GMRLV4oIcrKhPq0gp7IihSvGSdT7vI3tsW1voepiP9EG6YiQ38QI7H9q615ycbNPeJEo",
  },
];

  

  // 1. Product fetch
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    
    fetch(`/api/products/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        setProduct(data);
      })
      .catch(err => {
        console.error('Product fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false); // ✅ CRITICAL - always hide skeleton
      });
  }, [slug]);

  // 2. Brand fetch (only if product exists AND has brand)
  useEffect(() => {
    if (!product?.brand) {
      setStorySection(null);
      return;
    }

    const brandId = product.brand;
    fetch(`/api/admin/products/brands/${brandId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch brand');
        return res.json();
      })
      .then(brandData => {
        setStorySection(brandData.storySection || null);
      })
      .catch(err => {
        console.error('Brand fetch failed:', err);
        setStorySection(null);
      });
  }, [product?.brand]); // ✅ Only depend on brand ID

  // ✅ SINGLE loading check
  if (loading) {
    return <ProductHeroSkeleton />;
  }

  if (!storySection) {
  return <ProductHeroSkeleton />;
}

  // ✅ SINGLE error check  
  if (error || !product) {
    return notFound(); // or <div>{error || 'Product not found'}</div>
  }

  // ✅ Render content
  return (
    <>
      <ProductHero product={product} />
      <StoryCards 
        stories={storySection?.stories } 
        title={storySection?.title || ""}
      />
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
