"use client";

import { useState, useEffect } from "react";

export default function BrandForm({
  isOpen,
  onClose,
  mode = "create",
  initialData = null,
  onSubmit,
}) {
  const [brandName, setBrandName] = useState("");
  const [categories, setCategories] = useState([""]);
  const [logo, setLogo] = useState(null);
  const [tagline, setTagline] = useState("");
  const [loading, setLoading] = useState(false);


  const getSignature = async () => {
    const res = await fetch("/api/admin/sign-cloudinary", {
        method: "POST",
        body: JSON.stringify({ folder: "brands" }),
    });

    return res.json();
    };


    const uploadToCloudinary = async (file) => {
        const { timestamp, signature, apiKey, cloudName } = await getSignature();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "brands"); // must match signed params

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
            method: "POST",
            body: formData,
            }
        );

        const data = await res.json();
        return data.secure_url;
    };

  useEffect(() => {
  if (mode === "edit" && initialData) {
    setBrandName(initialData.name || "");
    setTagline(initialData.tagline || "");
    setCategories(
      initialData.categories?.length
        ? initialData.categories
        : [""]
    );
  }

  if (mode === "create") {
    setBrandName("");
    setTagline("");
    setCategories([""]);
    setLogo(null);
  }
}, [mode, initialData]);

  if (!isOpen) return null;

  const handleCategoryChange = (value, index) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const removeCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated.length ? updated : [""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        let logoUrl = initialData?.logo || "";

        // Upload new logo if selected
        if (logo instanceof File) {
        logoUrl = await uploadToCloudinary(logo);
        }

        const payload = {
        name: brandName,
        tagline,
        categories: categories.filter((c) => c.trim() !== ""),
        logo: logoUrl,
        };

        await onSubmit?.(payload);

        onClose();
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold">
            {mode === "edit" ? "Edit Brand" : "Create New Brand"}
          </h3>
          <button onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

          {/* Brand Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">
              Brand Name
            </label>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 border rounded-lg"
              placeholder="e.g. Nike"
            />
          </div>

            {/* Company Tagline */}
            <div className="space-y-2">
            <label className="block text-sm font-bold">
                Company Tagline
            </label>

            <input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border rounded-lg"
                placeholder="e.g. Just Do It"
            />

            <p className="text-xs text-gray-500">
                This tagline will be displayed on the homepage.
            </p>
            </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">
              Brand Logo
            </label>
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full px-4 py-3 bg-gray-50 border rounded-lg"
            />
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <label className="block text-sm font-bold">
              Categories
            </label>

            {categories.map((cat, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={cat}
                  onChange={(e) =>
                    handleCategoryChange(e.target.value, index)
                  }
                  className="flex-1 px-4 py-3 bg-gray-50 border rounded-lg"
                  placeholder="Category name"
                />
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="px-3 text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addCategory}
              className="text-sm font-semibold text-orange-400 hover:underline"
            >
              + Add Category
            </button>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-400 text-white font-bold py-3 rounded-lg disabled:opacity-60"
            >
              {loading
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                ? "Update Brand"
                : "Create Brand"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-orange-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}