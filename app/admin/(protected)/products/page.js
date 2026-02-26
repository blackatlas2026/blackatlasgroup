"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminRole } from "@/lib/context/AdminRoleContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // ✅ delete states
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { name, isSuperadmin } = useAdminRole();
  const router = useRouter();

  async function fetchProducts({ reset = false } = {}) {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.set("limit", "20");

      if (!reset && nextCursor) {
        params.set("cursor", nextCursor);
      }

      const res = await fetch(`/api/admin/products/list?${params}`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      setProducts(prev =>
        reset ? data.products : [...prev, ...data.products]
      );
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/admin/products/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      // ✅ Optimistic UI update
      setProducts(prev => prev.filter(p => p.id !== deleteId));

      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  useEffect(() => {
    fetchProducts({ reset: true });
  }, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-light  p-4 sm:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Product Management
          </h1>

          {name && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              Welcome back,
              <span className="ml-1 font-semibold text-gray-900  ">
                {name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

          

          

        </div>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">

        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-white   border border-gray-200   rounded-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
          />
        </div>

        <button
          onClick={() => router.push("/admin/products/new")}
          className="w-full sm:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-orange-400/20 transition"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-3xl border border-gray-200   bg-white   overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left">

            <thead className="bg-gray-50  ">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-sm font-semibold">Brand</th>
                <th className="px-6 py-4 text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-sm font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100  ">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-50   transition">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 font-medium uppercase">{product.brand}</td>
                  <td className="px-6 py-4 text-gray-500">{product.category || "-"}</td>
                  <td className="px-6 py-4 font-semibold">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() =>
                          router.push(`/admin/products/${product.slug}/edit`)
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
                  <td colSpan={4} className="text-center text-gray-400 py-10">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchProducts()}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

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
