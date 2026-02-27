"use client";

import { useDebugValue, useEffect, useState } from "react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, productsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/products/list?limit=5"),
        ]);

        const statsData = await statsRes.json();
        const productsData = await productsRes.json();

        setStats(statsData);
        setRecentProducts(productsData.products);
      } catch (error) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
//   useEffect(() => {
//     console.log("Rcent producyt", recentProducts)
//   },[recentProducts])

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Overview
        </h2>
        <p className="text-slate-500 mt-1">
          Welcome back! Here's what's happening across your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Products" value={stats?.totalProducts} />
        <StatCard label="Total Brands" value={stats?.totalBrands} />
        <StatCard label="Total Categories" value={stats?.totalCategories} />
   
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recently Added Products
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <TableHead>Product Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Date Added</TableHead>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {product.brand.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4">
                    <StockBadge stock={product.stock} />
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
  {product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-GB")
    : "—"}
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentProducts.length === 0 && (
          <div className="p-6 text-center text-slate-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================= */
/* Components */
/* ============================= */

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-slate-900">
        {value?.toLocaleString() ?? 0}
      </h3>
    </div>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
      {children}
    </th>
  );
}

function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-600">
        Out of stock
      </span>
    );
  }

  if (stock < 10) {
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600">
        {stock} low stock
      </span>
    );
  }

  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600">
      {stock} in stock
    </span>
  );
}