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
  const {name, isSuperadmin } = useAdminRole();
  

  const router = useRouter();

  //  useEffect(() => {
  //   const loadRole = async () => {
  //     const role = await getAdminRole();
  //     setIsSuperadmin(role.isSuperadmin);
  //     setLoadingRole(false);
  //   };

  //   loadRole();
  // }, []);

  // if (loadingRole) return null;

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
  <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 sm:p-8">
    
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Product Management
        </h1>

        {name && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>
              Welcome back,
              <span className="ml-1 font-semibold text-gray-900 dark:text-gray-200">
                {name}
              </span>
            </span>

            {isSuperadmin && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-600">
                Superadmin
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        
        {isSuperadmin && (
          <button
            onClick={() => router.push("/admin/superadmin")}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition"
          >
            Manage Users
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          Logout
        </button>

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
          className="w-full px-4 py-3 bg-white dark:bg-orange-400/5 border border-gray-200 dark:border-orange-400/20 rounded-full focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
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

    {/* Table Card */}
    <div className="rounded-3xl border border-gray-200 dark:border-orange-400/20 bg-white dark:bg-background-dark overflow-hidden">
      
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-left">
          
          <thead className="bg-gray-50 dark:bg-orange-400/10">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">
                Name
              </th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">
                Category
              </th>
              <th className="px-6 py-4 text-sm font-semibold whitespace-nowrap">
                Price
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-right whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-orange-400/10">
            {filtered.map(product => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-orange-400/5 transition"
              >
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {product.category || "-"}
                </td>

                <td className="px-6 py-4 font-semibold whitespace-nowrap">
                  ₹{product.price}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/products/${product.slug}/edit`)
                      }
                      className="px-4 py-1.5 text-sm font-semibold bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition"
                    >
                      Edit
                    </button>

                    <button className="px-4 py-1.5 text-sm font-semibold bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition">
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
  </div>
);

}
