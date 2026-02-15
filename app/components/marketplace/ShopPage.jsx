'use client';

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


import ProductCard from "./ProductCard";
import ShopSidebar from "./ShopSidebar";


export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");


   const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand"); // e.g., "Nike"


  const [filters, setFilters] = useState({
    brand: initialBrand || null,
    category: null,
    facets: {},
    price: [0, 10000],
  });

  const pageSize = 12;

async function fetchProducts(append = false, customCursor = null) {
  if (!hasMore && append) return;

  setLoading(true);

  try {
    const url = new URL("/api/products/list", window.location.origin);
    url.searchParams.set("limit", pageSize);

    if (append && customCursor) {
      url.searchParams.set("cursor", customCursor);
    }

    if (search) {
      url.searchParams.set("search", search);
    }

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



//   useEffect(() => {
//     console.log(products);
//   },[products])


//   useEffect(() => {
//   setCursor(null);
//   setHasMore(true);
//   fetchProducts(false);
// }, [search]);

useEffect(() => {
  const delay = setTimeout(() => {
    setCursor(null);
    setHasMore(true);
    fetchProducts(false, null);
  }, 400);

  return () => clearTimeout(delay);
}, [search]);
  // useEffect(() => {
  //   console.log(filters);
  // },[filters])

  const filtered = products.filter((p) => {
    /* -------------------------
      1. Brand Filter
    --------------------------*/
    // console.log(p)
    if (filters.brand && p.brand !== filters.brand) {
      return false;
    }

    /* -------------------------
      2. Category Filter
    --------------------------*/
    if (filters.category && p.category !== filters.category) {
      return false;
    }

    /* -------------------------
      3. Price Filter
    --------------------------*/
    const price = Number(p.price) || 0;
    const min = filters.price?.[0] ?? 0;
    const max = filters.price?.[1] ?? 10000;

    if (price < min || price > max) {
      return false;
    }

    /* -------------------------
      4. Facet Filters (Dynamic)
    --------------------------*/
    const activeFacets = filters.facets || {};

    for (const key in activeFacets) {
      const selectedOptions = activeFacets[key];

      if (!selectedOptions || selectedOptions.length === 0) continue;

      const productValues = p.facets?.[key] || [];

      // At least one selected option must match
      const hasMatch = selectedOptions.some((opt) =>
        productValues.includes(opt)
      );

      if (!hasMatch) {
        return false;
      }
    }

    return true;
  });



  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <Header total={filtered.length} search={search} setSearch={setSearch} />

      <div className="flex flex-col lg:flex-row gap-12">
        <ShopSidebar value={filters} onChange={setFilters} />

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
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Explore Our <span className="text-red-600 font-chamberi">Collection</span>
      </h1>

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 w-full md:w-auto">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-auto bg-transparent p-2 border-slate-400 rounded-lg text-sm focus:ring-red-600 focus:border-red-600 border"
        />

        {/* Showing total results */}
        <span className="text-sm text-slate-500 md:ml-3">
          Showing {total} results
        </span>
      </div>
    </div>
  );
}

