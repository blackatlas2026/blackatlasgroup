"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [variantAttributes, setVariantAttributes] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [externalLinks, setExternalLinks] = useState([]);
  const [imageUrl, setImageUrl] = useState("");


  const [imageFiles, setImageFiles] = useState([]); // File[]
  const [images, setImages] = useState({
    main: "",
    gallery: [],
  });

 const [form, setForm] = useState({
  slug: "",
  brand: "",
  category: "",
  name: "",
  description: "",
  price: "",
  inStock: true,
  featuredProduct: false, // ✅ NEW
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

  async function uploadImages(files) {
    const uploaded = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const img = await res.json();
      uploaded.push(img.url);
    }

    return uploaded;
  }

 

  async function submit() {
  if (imageFiles.length === 0) {
    alert("Please upload at least one image");
    return;
  }

  setLoading(true);

  try {
    const uploadedUrls = await uploadImages(imageFiles);

    const mainImage = uploadedUrls[mainImageIndex];

    const galleryImages = uploadedUrls.filter(
      (_, idx) => idx !== mainImageIndex
    );

    const res = await fetch("/api/admin/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),

        images: {
          main: mainImage,
          gallery: galleryImages,
        },

        variantAttributes,
        externalLinks,
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



  function addVariantAttribute() {
  setVariantAttributes(v => [
    ...v,
    {
      id: crypto.randomUUID(),
      key: "",
      label: "",
      type: "select",
      options: [],
    },
  ]);
}

function updateVariantAttr(id, field, value) {
  setVariantAttributes(v =>
    v.map(attr =>
      attr.id === id ? { ...attr, [field]: value } : attr
    )
  );
}

function addOption(id) {
  setVariantAttributes(v =>
    v.map(attr =>
      attr.id === id
        ? { ...attr, options: [...attr.options, ""] }
        : attr
    )
  );
}

function updateOption(id, index, value) {
  setVariantAttributes(v =>
    v.map(attr =>
      attr.id === id
        ? {
            ...attr,
            options: attr.options.map((o, i) =>
              i === index ? value : o
            ),
          }
        : attr
    )
  );
}

function removeOption(id, index) {
  setVariantAttributes(v =>
    v.map(attr =>
      attr.id === id
        ? {
            ...attr,
            options: attr.options.filter((_, i) => i !== index),
          }
        : attr
    )
  );
}

function removeVariantAttribute(id) {
  setVariantAttributes(v => v.filter(attr => attr.id !== id));
}


function addExternalLink() {
  setExternalLinks(l => [
    ...l,
    {
      id: crypto.randomUUID(),
      platform: "",
      url: "",
    },
  ]);
}

function updateExternalLink(id, key, value) {
  setExternalLinks(l =>
    l.map(link =>
      link.id === id ? { ...link, [key]: value } : link
    )
  );
}

function removeExternalLink(id) {
  setExternalLinks(l => l.filter(link => link.id !== id));
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
        {/* 🔥 Image Upload */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={e => setImageFiles(Array.from(e.target.files))}
          className="border rounded-lg p-2"
        />

        {imageFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {imageFiles.map((file, idx) => {
              const preview = URL.createObjectURL(file);

              return (
                <div
                  key={idx}
                  className={`relative border rounded-lg p-2 cursor-pointer ${
                    mainImageIndex === idx ? "ring-2 ring-red-500" : ""
                  }`}
                  onClick={() => setMainImageIndex(idx)}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-28 w-full object-cover rounded"
                    onLoad={() => URL.revokeObjectURL(preview)}
                  />

                  {mainImageIndex === idx && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                      Main
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}



        

    {/* 🔹 Variant Attributes */}
    <div className="space-y-4 border-t pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Variant Attributes</h2>
        <button
          type="button"
          onClick={addVariantAttribute}
          className="text-sm px-4 py-2 rounded-lg border hover:bg-slate-100"
        >
          + Add Attribute
        </button>
      </div>

      {variantAttributes.length === 0 && (
        <p className="text-sm text-slate-500">
          No variant attributes. Product will have no selectable variations.
        </p>
      )}

      <div className="space-y-6">
        {variantAttributes.map(attr => (
          <div
            key={attr.id}
            className="p-4 rounded-xl border bg-slate-50 space-y-4"
          >
            <div className="grid md:grid-cols-3 gap-3">
              <input
                placeholder="Key (e.g. color)"
                value={attr.key}
                onChange={e =>
                  updateVariantAttr(attr.id, "key", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
              />

              <input
                placeholder="Label (e.g. Color)"
                value={attr.label}
                onChange={e =>
                  updateVariantAttr(attr.id, "label", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
              />

              <select
                value={attr.type}
                onChange={e =>
                  updateVariantAttr(attr.id, "type", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
              >
                <option value="select">Select</option>
                <option value="color">Color</option>
                <option value="text">Text</option>
              </select>
            </div>

            {/* Options */}
            {attr.type !== "text" && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Options</p>

                {attr.options.map((opt, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={opt}
                      onChange={e =>
                        updateOption(attr.id, i, e.target.value)
                      }
                      placeholder="Option value"
                      className="flex-1 border rounded-lg px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(attr.id, i)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addOption(attr.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  + Add option
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => removeVariantAttribute(attr.id)}
              className="text-sm text-red-500"
            >
              Remove Attribute
            </button>
          </div>
        ))}
      </div>
    </div>

        {/* 🔗 External Product Links */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">External Listings</h2>
            <button
              type="button"
              onClick={addExternalLink}
              className="text-sm px-4 py-2 rounded-lg border hover:bg-slate-100"
            >
              + Add Link
            </button>
          </div>

          {externalLinks.length === 0 && (
            <p className="text-sm text-slate-500">
              No external listings added. Product will only be available on this store.
            </p>
          )}

          <div className="space-y-4">
            {externalLinks.map(link => (
              <div
                key={link.id}
                className="relative grid md:grid-cols-2 gap-3 p-4 rounded-xl border bg-slate-50"
              >
                <input
                  placeholder="Platform (e.g. Amazon)"
                  value={link.platform}
                  onChange={e =>
                    updateExternalLink(link.id, "platform", e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                />

                <input
                  placeholder="Product URL"
                  value={link.url}
                  onChange={e =>
                    updateExternalLink(link.id, "url", e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                  type="url"
                />

                <button
                  type="button"
                  onClick={() => removeExternalLink(link.id)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>




        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={e => update("inStock", e.target.checked)}
          />
          In stock
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featuredProduct}
            onChange={e => update("featuredProduct", e.target.checked)}
          />
          Featured product
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
