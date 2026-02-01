"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch products from backend
  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products/list");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered products for search
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Add Product
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Product table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{product.title}</td>
                <td className="px-4 py-2 border">{product.category || "-"}</td>
                <td className="px-4 py-2 border">{product.price || "-"}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <button className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">
                    Edit
                  </button>
                  <button className="bg-red-500 px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
