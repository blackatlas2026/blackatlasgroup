'use client';

import { useEffect, useState } from "react";
import ProductCard from "../components/marketplace/ProductCard";
import ShopSidebar from "../components/marketplace/ShopSidebar";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const pageSize = 12;

  async function fetchProducts(append = false) {
    if (!hasMore && append) return;

    setLoading(true);
    try {
      const url = new URL("/api/products/list", window.location.origin);
      url.searchParams.set("limit", pageSize);
      if (cursor) url.searchParams.set("cursor", cursor);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      if (append) {
        setProducts(prev => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }

      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(false);
  }, [search]);

  const filtered = products.filter(p => {
    const price = Number(p.price) || 0;
    return price >= priceRange[0] && price <= priceRange[1];
  });

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <Header total={products.length} search={search} setSearch={setSearch} />

      <div className="flex flex-col lg:flex-row gap-12">
        <ShopSidebar value={priceRange} onChange={setPriceRange} />

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          <div className="mt-16 text-center">
            {hasMore ? (
              <button
                onClick={() => fetchProducts(true)}
                disabled={loading}
                className="bg-slate-900 text-white px-12 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-red-600 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-red-600/40"
              >
                {loading ? "Loading..." : "Load More Products"}
              </button>
            ) : (
              <p className="text-gray-500 mt-4">No more products</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Header({ total, search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Explore Our <span className="text-red-600">Collection</span>
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">
          Showing {total} results
        </span>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-transparent p-2 border-slate-200 rounded-lg text-sm focus:ring-red-600 focus:border-red-600"
        />
      </div>
    </div>
  );
}
