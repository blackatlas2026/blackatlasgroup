"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {v4 as uuidv4} from "uuid";

export default function AddProductPage() {
  const router = useRouter();
  
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [variantAttributes, setVariantAttributes] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [externalLinks, setExternalLinks] = useState([]);
  const [slugStatus, setSlugStatus] = useState("idle");
  const [facetSchema, setFacetSchema] = useState(null);
  const [facets, setFacets] = useState({});
  const [brandOptions, setBrandOptions] = useState([]);



  const [imageFiles, setImageFiles] = useState([]); // File[]
  const [images, setImages] = useState({
    main: "",
    gallery: [],
  });

  
// useEffect(() => {
//   console.log(facets);
// },[facets])

 const [form, setForm] = useState({
  slug: "",
  brand: "",
  category: "",
  name: "",
  description: "",
  price: "",
  inStock: true,
  featuredProducts: false, // ✅ NEW
});

useEffect(() => {
  if (!form.slug) return;

  const timeout = setTimeout(async () => {
    setSlugStatus("checking");

    try {
      const res = await fetch(
        `/api/admin/products/check-slug?slug=${form.slug}`
      );
      const data = await res.json();

      if (data.available) {
        setSlugStatus("available");
      } else {
        setSlugStatus("taken");
      }
    } catch (err) {
      setSlugStatus("idle");
    }
  }, 500); // debounce 500ms

  return () => clearTimeout(timeout);
}, [form.slug]);


  
useEffect(() => {
  if (!form.brand || !form.category) {
    setFacetSchema(null);
    setFacets({});
    return;
  }

  async function loadSchema() {
    const res = await fetch(
      `/api/products/facets/schema?brand=${form.brand}&category=${form.category}`
    );

    if (!res.ok) {
      setFacetSchema(null);
      setFacets({});
      return;
    }

    const data = await res.json();
    setFacetSchema(data);

    const initial = {};
    data.facets.forEach(f => {
      initial[f.key] = [];
    });
    setFacets(initial);
  }

  loadSchema();
}, [form.brand, form.category]);


    useEffect(() => {
      if (!form.name) return;

      const slug = form.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      setForm(f => ({ ...f, slug }));
    }, [form.name]);

  useEffect(() => {
    async function loadBrands() {
      const res = await fetch("/api/products/brands");
      const data = await res.json();
      setBrandOptions(data);
    }

    loadBrands();
  }, []);


  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  

//   async function uploadImages(files) {
//   const uploadedUrls = await Promise.all(
//     files.map(async (file) => {
//       const data = new FormData();
//       data.append("file", file);

//       const res = await fetch("/api/admin/upload-image", {
//         method: "POST",
//         body: data,
//       });

//       if (!res.ok) {
//         throw new Error("Image upload failed");
//       }

//       const img = await res.json();
//       return img.url;
//     })
//   );

//   return uploadedUrls;
// }


async function uploadImages(files) {
  if (!files?.length) return [];

  // 1️⃣ Get signed upload data (protected route)
  const sigRes = await fetch("/api/admin/sign-cloudinary", {
    method: "POST",
  });

  if (!sigRes.ok) {
    throw new Error("Failed to get upload signature");
  }

  const { timestamp, signature, apiKey, cloudName } =
    await sigRes.json();

  
  const uploadedUrls = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "products");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        throw new Error("Image upload failed");
      }

      const data = await uploadRes.json();


      return data.secure_url;
    })
  );

  return uploadedUrls;
}




 




  async function submit() {
    if (imageFiles.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      setSubmitStatus("uploading");

      const uploadedUrls = await uploadImages(imageFiles);

      const mainImage = uploadedUrls[mainImageIndex];
      const galleryImages = uploadedUrls.filter(
        (_, idx) => idx !== mainImageIndex
      );

      setSubmitStatus("creating");

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
          facets,
        }),
      });

      if (!res.ok) throw new Error("Create failed");

      router.push("/admin");
    } catch (err) {
      alert(err.message);
      setSubmitStatus("idle");
    }
  }




  function addVariantAttribute() {
  setVariantAttributes(v => [
    ...v,
    {
      id: uuidv4(),
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
      id: uuidv4(),
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
    <div className="max-w-3xl mx-auto p-8 border border-gray-200 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>

      <div className="grid gap-4">
        
        {/* Brand */}
        <select
          value={form.brand}
          onChange={e =>
            setForm(f => ({
              ...f,
              brand: e.target.value,
              category: "", // reset category on brand change
            }))
          }
          className="border border-gray-200 rounded-lg px-4 py-2"
        >
          <option value="">Select brand</option>
          {brandOptions?.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Category */}
        {form.brand && (
          <select
            value={form.category}
            onChange={e => update("category", e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2"
          >
            <option value="">Select category</option>
            {brandOptions
              .find(b => b.id === form.brand)
              ?.categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        )}

        
        <input placeholder="Product Name" onChange={e => update("name", e.target.value)} className="input  border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
       
        <div>
          <input placeholder="Slug" value={form.slug} onChange={e => update("slug", e.target.value)} className="input w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          <p className="text-sm text-gray-500">
            URL: /products/{form.slug}
          </p>
          <div className="text-sm mt-1">
            {slugStatus === "checking" && (
              <span className="text-gray-500">
                Checking availability...
              </span>
            )}
            {slugStatus === "available" && (
              <span className="text-green-600">
                ✓ Slug is available
              </span>
            )}
            {slugStatus === "taken" && (
              <span className="text-orange-500">
                ✗ Slug already taken
              </span>
            )}
          </div>
        
        </div>
        <textarea
          placeholder="Description"
          className="h-32 input  border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onChange={e => update("description", e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          onChange={e => update("price", e.target.value)}
          className="input  border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* 🔥 Image Upload */}
        {/* 🔥 Image Upload */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={e => setImageFiles(Array.from(e.target.files))}
          className="w-full border border-gray-200 rounded-xl p-1  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-800 file:text-white hover:file:bg-gray-900"        />

        {imageFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {imageFiles.map((file, idx) => {
              const preview = URL.createObjectURL(file);

              return (
                <div
                  key={idx}
                  className={`relative border border-gray-200 rounded-lg p-2 cursor-pointer ${
                    mainImageIndex === idx ? "ring-2 ring-orange-400" : ""
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
                    <span className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
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
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-slate-100"
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
            className="p-4 rounded-xl border border-gray-200 bg-slate-50 space-y-4"
          >
            <div className="grid md:grid-cols-3 gap-3">
              <input
                placeholder="Key (e.g. color)"
                value={attr.key}
                onChange={e =>
                  updateVariantAttr(attr.id, "key", e.target.value)
                }
                className="border border-gray-200 rounded-lg px-3 py-2"
              />

              <input
                placeholder="Label (e.g. Color)"
                value={attr.label}
                onChange={e =>
                  updateVariantAttr(attr.id, "label", e.target.value)
                }
                className="border border-gray-200 rounded-lg px-3 py-2"
              />

              <select
                value={attr.type}
                onChange={e =>
                  updateVariantAttr(attr.id, "type", e.target.value)
                }
                className="border border-gray-200 rounded-lg px-3 py-2"
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
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(attr.id, i)}
                      className="text-orange-400"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addOption(attr.id)}
                  className="text-sm text-orange-500 hover:underline"
                >
                  + Add option
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => removeVariantAttribute(attr.id)}
              className="text-sm text-orange-400"
            >
              Remove Attribute
            </button>
          </div>
        ))}
      </div>
    </div>


    {/* 🧩 Facets */}
{facetSchema && (
  <div className="space-y-4 border-t pt-6">
    <h2 className="text-lg font-semibold">Product Facets</h2>

    <div className="space-y-6">
      {facetSchema.facets.map(facet => (
        <div
          key={facet.key}
          className="p-4 rounded-xl border border-gray-200 bg-slate-50 space-y-3"
        >
          <p className="text-sm font-medium">{facet.label}</p>

          <div className="flex flex-wrap gap-3">
            {facet.options.map(opt => {
              const selected = facets[facet.key]?.includes(opt);

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setFacets(prev => ({
                      ...prev,
                      [facet.key]: selected
                        ? prev[facet.key].filter(v => v !== opt)
                        : [...prev[facet.key], opt],
                    }))
                  }
                  className={`px-3 py-1.5 rounded-lg border border-gray-200 text-sm transition
                    ${
                      selected
                        ? "bg-gray-800 text-white"
                        : "bg-white hover:bg-slate-100"
                    }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
)}


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
                  className="absolute top-2 right-2 text-slate-400 hover:text-orange-400"
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
            checked={form.featuredProducts}
            onChange={e => update("featuredProducts", e.target.checked)}
          />
          Featured product
        </label>

        <button
          disabled={
            submitStatus !== "idle" ||
            slugStatus === "taken" ||
            slugStatus === "checking"
          }
          onClick={submit}
          className="bg-gray-800 text-white py-3 rounded-lg hover:bg-orange-500 transition disabled:bg-gray-200"
        >
          {submitStatus === "uploading" && "Uploading Images..."}
          {submitStatus === "creating" && "Creating Product..."}
          {submitStatus === "idle" && "Create Product"}
        </button>

      </div>
    </div>
  );
}
