'use client'
import ProductCard from "../components/marketplace/ProductCard";
import ShopSidebar from "../components/marketplace/ShopSidebar";
import { products } from "@/app/data/products";
import { useState } from "react";
export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([50, 500]);

  return (
    
    <main className="max-w-7xl mx-auto px-6 py-12">
      <Header />

      <div className="flex flex-col lg:flex-row gap-12">
        <ShopSidebar value={priceRange} onChange={setPriceRange}/>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-red-600/40">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Explore Our <span className="text-red-600">Collection</span></h1>
      <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500 dark:text-slate-400">Showing 1 - {products.length} of 84 results</span>
      <select className="bg-transparent p-2 border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-red-600 focus:border-red-600">
        <option>Sort by: Newest</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Popularity</option>
      </select>
      </div>
    </div>
  );
}


