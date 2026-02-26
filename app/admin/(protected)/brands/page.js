"use client";

import { useEffect, useState } from "react";
import BrandForm from "@/app/components/admin/BrandForm";
import Modal from "@/app/components/Modal";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedBrand, setSelectedBrand] = useState(null)

  const saveBrand = async (data) => {
    const url =
        formMode === "create"
        ? "/api/admin/products/brands"
        : `/api/admin/products/brands/${selectedBrand.id}`;

    const method = formMode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save brand");
    }

    return res.json();
    };

    const fetchBrands = async () => {
        const res = await fetch("/api/admin/products/brands");
        if (!res.ok) throw new Error("Failed to fetch brands");
        const data = await res.json();
        setBrands(data);
    };

  useEffect(() => {
  fetchBrands().catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);


  return (
    <div className="min-h-screen p-6 md:p-8">
      
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Brand Management
          </h1>
          <p className="text-gray-500">
            Create, edit, and organize your store's brands.
          </p>
        </div>

        <button
            onClick={() => {
                setFormMode("create");
                setSelectedBrand(null);
                setIsModalOpen(true);
            }}
            className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:opacity-90 transition"
            >
            + Add New Brand
        </button>
      </header>

      {/* Table */}
      <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-sm font-semibold">Categories</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {brands.map((brand) => (
                <tr
                  key={brand.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium uppercase">
                    {brand.name}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {brand.categories?.length ? (
                        brand.categories.map((cat, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full"
                          >
                            {cat}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full">
                      {brand.status || "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                            setFormMode("edit");
                            setSelectedBrand(brand);
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-1.5 text-sm font-semibold bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition"
                        >
                        Edit
                    </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && brands.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-10">
                    No brands found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
            <BrandForm
            isOpen={isModalOpen}
            onClose={() => {setIsModalOpen(false)
                            setSelectedBrand(null)
                            }}
            mode={formMode}
            initialData={selectedBrand}
           onSubmit={async (data) => {
                try {
                    await saveBrand(data);
                    await fetchBrands();
                    setIsModalOpen(false);
                    setSelectedBrand(null);
                } catch (err) {
                    console.error(err);
                    alert(err.message);
                }
                }}
            />
    </div>
  );
}