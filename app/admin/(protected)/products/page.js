"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAdminRole } from "@/lib/context/AdminRoleContext";
import { useRef } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { name, isSuperadmin } = useAdminRole();
  const router = useRouter();
  const loadMoreRef = useRef(null);
  const fetchingRef = useRef(false);

  

  const fetchProducts = useCallback(
  async ({ reset = false, cursor = null } = {}) => {
    if (fetchingRef.current) return;

    fetchingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.set("limit", "20");

      if (!reset && cursor) {
        params.set("cursor", cursor);
      }

      const res = await fetch(`/api/admin/products/list?${params}`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      setProducts(prev => {
        const merged = reset ? data.products : [...prev, ...data.products];

        const unique = Array.from(
          new Map(merged.map(p => [p.id, p])).values()
        );

        return unique;
      });

      setNextCursor(data.nextCursor || null);
      setHasMore(Boolean(data.hasMore));
    } catch (err) {
      setError(err.message);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  },
  []
);

  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/admin/products/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts(prev => prev.filter(p => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  // Initial Load
  useEffect(() => {
    fetchProducts({ reset: true });
  }, []);



  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  
  useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      if (
        entries[0].isIntersecting &&
        hasMore &&
        !loading
      ) {
        fetchProducts({ cursor: nextCursor });
      }
    },
    {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    }
  );

  if (loadMoreRef.current) {
    observer.observe(loadMoreRef.current);
  }

  return () => observer.disconnect();
}, [hasMore, loading, nextCursor, fetchProducts]);

  return (
    <div className="flex flex-col min-h-screen bg-background-light p-4 sm:p-8 gap-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between lg:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Product Management
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Manage products.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-4 pr-4 py-2 bg-white border border-zinc-200 rounded-full text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none w-full transition-all"
              />
            </div>

            <button
              onClick={() => router.push("/admin/products/new")}
              className="w-full sm:w-auto bg-orange-400 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-orange-400/90 transition-colors"
            >
              + Add Product
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-sm font-semibold">Brand</th>
                <th className="px-6 py-4 text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-sm font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 font-medium uppercase">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {product.category || "-"}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/products/${product.slug}/edit`
                          )
                        }
                        className="px-4 py-1.5 text-sm font-semibold bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="px-4 py-1.5 text-sm font-semibold bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-10">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loader Indicator */}
      {loading && (
        <div className="flex justify-center py-6 text-gray-500">
          Loading more products...
        </div>
      )}

      {!hasMore && (
        <div className="flex justify-center py-6 text-gray-400 text-sm">
          No more products
        </div>
      )}

      <div ref={loadMoreRef} className="h-10" />
      {/* ✅ Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white   rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900  ">
                Delete Product?
              </h3>
              <p className="text-sm text-zinc-500 mt-2">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm rounded-lg border border-zinc-200   hover:bg-zinc-50   transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>



  );
}