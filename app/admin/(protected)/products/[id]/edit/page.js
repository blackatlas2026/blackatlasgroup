"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {v4 as uuidv4} from "uuid";



export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [variantAttributes, setVariantAttributes] = useState([]);
  const [externalLinks, setExternalLinks] = useState([]);
  const [facetSchema, setFacetSchema] = useState(null);
  const [facets, setFacets] = useState({});
  const [brandOptions, setBrandOptions] = useState([]);
  const [slugStatus, setSlugStatus] = useState("idle");
  
const [mainImageUrl, setMainImageUrl] = useState(null); // existing main URL
const [existingImages, setExistingImages] = useState([]);
const [imageFiles, setImageFiles] = useState([]);
const [newPreviews, setNewPreviews] = useState([]);
const [mainImageId, setMainImageId] = useState(null);

 

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
    featuredProducts: false,
  });




  // 🔥 Load existing product
  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        alert("Product not found");
        router.push("/admin");
        return;
      }

      const data = await res.json();
      // console.log(data);

      setForm({
        slug: data.slug || "",
        brand: data.brand || "",
        category: data.category || "",
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        inStock: data.inStock ?? true,
        featuredProducts: data.featuredProducts ?? false,
      });

      setVariantAttributes(data.variantAttributes || []);
      setExternalLinks(data.externalLinks || []);
      setFacets(data.facets || {});
      const mainUrl = data.images?.main || null;
      const galleryUrls = data.images?.gallery || [];

      setMainImageUrl(mainUrl);
      setExistingImages(galleryUrls);
      setMainImageId(mainUrl ? "existing-main" : null);

      

      setInitialLoading(false);
    }

    loadProduct();
  }, [id, router]);

  // 🔥 Slug check (exclude current product)
  useEffect(() => {
    if (!form.slug) return;

    const timeout = setTimeout(async () => {
      setSlugStatus("checking");

      const res = await fetch(
        `/api/admin/products/check-slug?slug=${form.slug}&exclude=${id}`
      );
      const data = await res.json();

      setSlugStatus(data.available ? "available" : "taken");
    }, 500);

    return () => clearTimeout(timeout);
  }, [form.slug, id]);

  // 🔥 Load brands
  useEffect(() => {
    async function loadBrands() {
      const res = await fetch("/api/products/brands");
      const data = await res.json();
      setBrandOptions(data);
    }
    loadBrands();
  }, []);

//   useEffect(() =>{
//   console.log(variantAttributes);
// },[variantAttributes])


  // 🔥 Load facet schema
  useEffect(() => {
    if (!form.brand || !form.category) return;

    async function loadSchema() {
      const res = await fetch(
        `/api/products/facets/schema?brand=${form.brand}&category=${form.category}`
      );

      if (!res.ok) return;

      const data = await res.json();
      setFacetSchema(data);
    }

    loadSchema();
  }, [form.brand, form.category]);

  function update(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function uploadImages(files) {
  const uploadedUrls = await Promise.all(
    files.map(async (file) => {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const img = await res.json();
      return img.url;
    })
  );

  return uploadedUrls;
}


 async function submit() {
  try {
    setSubmitStatus("uploading");

    let uploadedUrls = [];

    if (imageFiles.length > 0) {
      uploadedUrls = await uploadImages(imageFiles);
    }

    setSubmitStatus("saving");

    const selectedImage = allImages.find(
      img => img.id === mainImageId
    );

    let finalMain = null;

    if (selectedImage) {
      if (selectedImage.type === "existing") {
        finalMain = selectedImage.value;
      } else {
        const index = imageFiles.findIndex(
          (_, i) => `new-${i}` === selectedImage.id
        );
        finalMain = uploadedUrls[index];
      }
    }

    const finalGallery = [
      ...existingImages,
      ...uploadedUrls,
    ].filter(url => url !== finalMain);

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        images: {
          main: finalMain,
          gallery: finalGallery,
        },
        variantAttributes,
        externalLinks,
        facets,
      }),
    });

    if (!res.ok) throw new Error("Update failed");

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

const oldPreviews = [
  ...(mainImageUrl
    ? [{
        id: "existing-main",
        type: "existing",
        value: mainImageUrl,
        preview: mainImageUrl,
      }]
    : []),

  ...existingImages.map((url, index) => ({
    id: `existing-${index}`,
    type: "existing",
    value: url,
    preview: url,
  })),
];



useEffect(() => {
  const previews = imageFiles.map((file, index) => ({
    id: `new-${index}`,
    type: "new",
    value: file,
    preview: URL.createObjectURL(file),
  }));

  setNewPreviews(previews);

  return () => {
    previews.forEach(p => URL.revokeObjectURL(p.preview));
  };
}, [imageFiles]);

const allImages = [...oldPreviews, ...newPreviews];




  // console.log(allImages);

  if (initialLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

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
          className="border rounded-lg px-4 py-2"
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
            className="border rounded-lg px-4 py-2"
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

        
        <input placeholder="Product Name" value={form.name} onChange={e => update("name", e.target.value)} className="input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
       
        <div>
          <input placeholder="Slug" value={form.slug} onChange={e => update("slug", e.target.value)} className="input w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
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
              <span className="text-red-600">
                ✗ Slug already taken
              </span>
            )}
          </div>
        
        </div>
        <textarea
          value={form.description}
          placeholder="Description"
          className="h-32 input  border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={e => update("description", e.target.value)}
        />

        <input
          type="number"
          value={form.price}
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
          className="w-full border border-gray-200 rounded-xl p-1  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-800 file:text-white hover:file:bg-gray-900"        />


{allImages.length > 0 && (
  <div className="grid grid-cols-3 gap-4 mt-4">
    {allImages.map((img) => (
      <div
        key={img.id}
        className={`relative border rounded-lg p-2 cursor-pointer ${
          mainImageId === img.id ? "ring-2 ring-red-500" : ""
        }`}
        onClick={() => setMainImageId(img.id)}
      >
        <img
          src={img.preview}
          alt="Preview"
          className="h-28 w-full object-cover rounded"
        />

        {mainImageId === img.id && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
            Main
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            if (img.type === "existing") {
              if (img.id === "existing-main") {
                setMainImageId(null);
              } else {
                setExistingImages(prev =>
                  prev.filter((_, i) => `existing-${i}` !== img.id)
                );
              }
            } else {
              setImageFiles(prev =>
                prev.filter((_, i) => `new-${i}` !== img.id)
              );
            }

            if (mainImageId === img.id) {
              const remaining = allImages.filter(i => i.id !== img.id);
              setMainImageId(remaining[0]?.id || null);
            }
          }}
          className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-0.5 rounded"
        >
          ✕
        </button>
      </div>
    ))}
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


    {/* 🧩 Facets */}
{facetSchema && (
  <div className="space-y-4 border-t pt-6">
    <h2 className="text-lg font-semibold">Product Facets</h2>

    <div className="space-y-6">
      {facetSchema.facets.map(facet => (
        <div
          key={facet.key}
          className="p-4 rounded-xl border bg-slate-50 space-y-3"
        >
          <p className="text-sm font-medium">{facet.label}</p>

          <div className="flex flex-wrap gap-3">
            {facet.options.map(opt => {
              const selected = (facets[facet.key] || []).some(
                v => v.toLowerCase() === opt.toLowerCase()
              );

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setFacets(prev => {
                      const current = prev[facet.key] || [];

                      const exists = current.some(
                        v => v.toLowerCase() === opt.toLowerCase()
                      );

                      return {
                        ...prev,
                        [facet.key]: exists
                          ? current.filter(
                              v => v.toLowerCase() !== opt.toLowerCase()
                            )
                          : [...current, opt],
                      };
                    })
                  }


                  className={`px-3 py-1.5 rounded-lg border text-sm transition
                    ${
                      selected
                        ? "bg-black text-white"
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
            checked={form.featuredProducts}
            onChange={e => update("featuredProducts", e.target.checked)}
          />
          Featured product
        </label>

        <button
          disabled={submitStatus !== "idle"}
          onClick={submit}
          className="bg-black text-white py-3 rounded-lg hover:bg-red-600 transition disabled:bg-gray-300"
        >
          {submitStatus === "uploading" && "Uploading Images..."}
          {submitStatus === "saving" && "Saving Changes..."}
          {submitStatus === "idle" && "Edit Product"}

          {submitStatus !== "idle" && (
            <span className="ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </button>

      </div>
    </div>
  );
}
