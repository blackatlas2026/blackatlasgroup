"use client";

import { useEffect, useState } from "react";
import BrandForm from "@/app/components/admin/BrandForm";
import BrandStory from "@/app/components/admin/BrandStory";

function BrandRow({ brand, onEdit, onDelete, onEditSection, onDeleteSection, onAddSection }) {
  const [open, setOpen] = useState(false);
  const sections = brand.storySections || [];

  return (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-6 py-4 font-medium uppercase">{brand.name}</td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {brand.categories?.length
              ? brand.categories.map((cat, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">{cat}</span>
                ))
              : <span className="text-gray-400">-</span>}
          </div>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition"
          >
            <span className={`transition-transform duration-200 inline-block ${open ? "rotate-180" : ""}`}>▾</span>
            {sections.length} section{sections.length !== 1 ? "s" : ""}
          </button>
        </td>
        <td className="px-6 py-4">
          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full">
            {brand.status || "Active"}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onEdit(brand)}
              className="px-4 py-1.5 text-sm font-semibold bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(brand.id)}
              className="px-4 py-1.5 text-sm font-semibold bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {open && (
        <tr>
          <td colSpan={5} className="px-6 py-4 bg-purple-50/40 border-b border-gray-100">
            <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">Story sections</p>
            <div className="flex flex-wrap gap-2">
              {sections.map(section => (
                <div
                  key={section.id}
                  className="flex items-center gap-2 bg-white border border-purple-200 rounded-xl px-3 py-2 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800 max-w-[160px] truncate">
                      {section.title || "Untitled"}
                    </p>
                    <p className="text-xs text-gray-400">{section.stories?.length || 0} items</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => onEditSection(brand, section)}
                      className="text-xs text-purple-500 hover:text-purple-700 font-semibold px-1.5 py-0.5 rounded hover:bg-purple-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteSection(brand.id, section.id)}
                      className="text-xs text-red-400 hover:text-red-600 font-semibold px-1.5 py-0.5 rounded hover:bg-red-50 transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => onAddSection(brand)}
                className="flex items-center gap-1 text-xs font-semibold text-purple-600 border border-dashed border-purple-300 hover:bg-purple-100 px-3 py-2 rounded-xl transition"
              >
                + Add section
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [storyModalMode, setStoryModalMode] = useState("create");
  const [editingSection, setEditingSection] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [deletingStoryId, setDeletingStoryId] = useState(null);

  const fetchBrands = async () => {
    const res = await fetch("/api/admin/products/brands");
    if (!res.ok) throw new Error("Failed to fetch brands");
    const data = await res.json();
    setBrands(data);
  };

  useEffect(() => {
    fetchBrands().catch(err => setError(err.message)).finally(() => setLoading(false));
  }, []);

  const saveBrand = async (data) => {
    const url = formMode === "create"
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

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/products/brands/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete brand");
      setBrands(prev => prev.filter(b => b.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleStorySectionSubmit = async (sectionData) => {
    await fetch(`/api/admin/products/brands/${selectedBrand.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: storyModalMode === "create" ? "add" : "edit",
        section: sectionData,
      }),
    });
    await fetchBrands();
    setIsStoryModalOpen(false);
    setEditingSection(null);
  };

  const handleDeleteStorySection = async () => {
    if (!deletingStoryId) return;
    await fetch(`/api/admin/products/brands/${deletingStoryId.brandId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", sectionId: deletingStoryId.sectionId }),
    });
    await fetchBrands();
    setDeletingStoryId(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
          <p className="text-gray-500">Create, edit, and organize your store's brands.</p>
        </div>
        <button
          onClick={() => { setFormMode("create"); setSelectedBrand(null); setIsModalOpen(true); }}
          className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:opacity-90 transition"
        >
          + Add New Brand
        </button>
      </header>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">{error}</div>
      )}

      <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-sm font-semibold">Categories</th>
                <th className="px-6 py-4 text-sm font-semibold">Stories</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {brands.map(brand => (
                <BrandRow
                  key={brand.id}
                  brand={brand}
                  onEdit={(b) => { setFormMode("edit"); setSelectedBrand(b); setIsModalOpen(true); }}
                  onDelete={(id) => setDeleteId(id)}
                  onEditSection={(b, section) => {
                    setSelectedBrand(b);
                    setEditingSection(section);
                    setStoryModalMode("edit");
                    setIsStoryModalOpen(true);
                  }}
                  onDeleteSection={(brandId, sectionId) => setDeletingStoryId({ brandId, sectionId })}
                  onAddSection={(b) => {
                    setSelectedBrand(b);
                    setEditingSection(null);
                    setStoryModalMode("create");
                    setIsStoryModalOpen(true);
                  }}
                />
              ))}

              {!loading && brands.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-10">No brands found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BrandForm
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedBrand(null); }}
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

      <BrandStory
        isOpen={isStoryModalOpen}
        onClose={() => { setIsStoryModalOpen(false); setEditingSection(null); }}
        mode={storyModalMode}
        initialData={editingSection}
        onSubmit={handleStorySectionSubmit}
      />

      {/* Delete Brand Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Delete Brand?</h3>
              <p className="text-sm text-zinc-500 mt-2">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm rounded-lg border border-zinc-200 hover:bg-zinc-50 transition"
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

      {/* Delete Story Section Confirmation */}
      {deletingStoryId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Delete Story Section?</h3>
              <p className="text-sm text-zinc-500 mt-2">
                This cannot be undone. Products using this section will lose their story reference.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingStoryId(null)}
                className="px-4 py-2 text-sm rounded-lg border border-zinc-200 hover:bg-zinc-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStorySection}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}