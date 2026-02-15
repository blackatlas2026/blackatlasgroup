"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

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

      const res = await fetch(`/api/products/list?${params.toString()}`);
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

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      // Redirect to admin login
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  useEffect(() => {
    fetchProducts({ reset: true });
  }, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={() => router.push("/admin/products/new")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add Product
        </button>
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* Product table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">
                  {product.category || "-"}
                </td>
                <td className="px-4 py-2 border">
                  ₹{product.price}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                      onClick={() =>
                        router.push(`/admin/products/${product.slug}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {hasMore && (
          <button
            onClick={() => fetchProducts()}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
