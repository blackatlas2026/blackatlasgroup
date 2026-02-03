"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [form, setForm] = useState({
    slug: "",
    brand: "",
    category: "",
    name: "",
    description: "",
    price: "",
    inStock: true,
  });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", imageFile);

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error("Image upload failed");

    const img = await res.json();
    return img.url;
  }

  async function submit() {
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const uploadedUrl = await uploadImage();
      setImageUrl(uploadedUrl);

      const res = await fetch("/api/admin/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          images: {
            main: uploadedUrl,
            thumbnails: [],
          },
          colors: [],
          sizes: [],
          specs: [],
        }),
      });

      if (!res.ok) throw new Error("Create failed");

      router.push("/admin/products");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <div className="grid gap-4">
        <input placeholder="Slug" onChange={e => update("slug", e.target.value)} className="input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
        <input placeholder="Brand" onChange={e => update("brand", e.target.value)} className="input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
        <input placeholder="Category" onChange={e => update("category", e.target.value)} className="input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
        <input placeholder="Product Name" onChange={e => update("name", e.target.value)} className="input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />

        <textarea
          placeholder="Description"
          className="h-32 input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={e => update("description", e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          onChange={e => update("price", e.target.value)}
          className="input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* 🔥 Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          className="border rounded-lg p-2"
        />

        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-40 rounded-lg border"
          />
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={e => update("inStock", e.target.checked)}
          />
          In stock
        </label>

        <button
          disabled={loading}
          onClick={submit}
          className="bg-black text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
}
