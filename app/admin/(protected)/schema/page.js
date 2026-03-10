"use client";

import { slugify } from "@/lib/slugify";
import { useState, useEffect } from "react";

export default function ProductSchemaPage() {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [facets, setFacets] = useState([
    {
      key: "",
      label: "",
      type: "select",
       options: [],
    },
  ]);

  const [loadingSchema, setLoadingSchema] = useState(false);

  // ===============================
  // Fetch All Brands on Mount
  // ===============================
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/products/brands");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Failed to fetch brands");
      }
    };

    fetchBrands();
  }, []);

  // ===============================
  // When Brand Changes → Load Categories
  // ===============================
  useEffect(() => {
    if (!brand) return;

    const selectedBrand = brands.find((b) => b.name === brand);
    
    if (selectedBrand) {
      setCategories(selectedBrand.categories || []);
      setCategory("");
      setFacets([
        { key: "", label: "", type: "select",  options: [] },
      ]);
    }
  }, [brand, brands]);

  // ===============================
  // Fetch Schema When Brand + Category Selected
  // ===============================
  useEffect(() => {
    if (!brand || !category) return;

    const fetchSchema = async () => {
      setLoadingSchema(true);
      try {
        const formattedCategory = slugify(category);
        const formattedBrand = slugify(brand);

        const res = await fetch(
        `/api/products/facets/schema?brand=${formattedBrand}&category=${formattedCategory}`
        );

        if (res.ok) {
          const data = await res.json();
          if (data?.facets?.length) {
            setFacets(data.facets);
          } else {
            setFacets([
              { key: "", label: "", type: "select",  options: [] },
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch schema");
      } finally {
        setLoadingSchema(false);
      }
    };

    fetchSchema();
  }, [brand, category]);

  // ===============================
  // Schema Functions
  // ===============================
  const addFacet = () => {
    setFacets([
      ...facets,
      { key: "", label: "", type: "select",  options: [] },
    ]);
  };

  const removeFacet = (index) => {
    setFacets(facets.filter((_, i) => i !== index));
  };

  const updateFacet = (index, key, value) => {
    const newFacets = [...facets];
    newFacets[index][key] = value;
    setFacets(newFacets);
  };

  const updateOption = (facetIndex, optionIndex, value) => {
    const newFacets = [...facets];
    newFacets[facetIndex].options[optionIndex] = value;
    setFacets(newFacets);
  };

  const addOption = (facetIndex) => {
    const newFacets = [...facets];
    newFacets[facetIndex].options.push("");
    setFacets(newFacets);
  };

  const removeOption = (facetIndex, optionIndex) => {
    const newFacets = [...facets];
    newFacets[facetIndex].options = newFacets[facetIndex].options.filter(
        (_, i) => i !== optionIndex
    );
    setFacets(newFacets);
  };

  const saveSchema = async () => {
    await fetch("/api/products/facets/schema", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        brand,
        category,
        facets,
        }),
    });

    setBrand("");
    setFacets([
        {
            key: "",
            label: "",
            type: "select",
             options: [],
        },
    ]);
    setCategory("");
    alert("Schema saved successfully");
};

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      {/* Header */}
      <header className="mb-8 p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Schema
          </h1>
          <p className="text-gray-500">
            Define and manage dynamic attributes for your product catalog.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
  <button
    onClick={() => {
      setBrand("");
      setFacets([
        {
          key: "",
          label: "",
          type: "select",
           options: [],
        },
      ]);
      setCategory("");
    }}
    className="w-full sm:w-auto border border-gray-200 px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition text-gray-700 hover:bg-gray-50"
  >
    Discard Changes
  </button>

  <button
    onClick={saveSchema}
    className="w-full sm:w-auto bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:opacity-90 transition"
  >
    Save Schema
  </button>
</div>
      </header>

      <div className="p-4 md:p-8 max-w-7xl bg-white mx-auto w-full space-y-8">
        {/* Brand + Category Selection */}
        <section className="bg-white p-6 rounded-3xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Brand */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Target Brand
              </label>
              <select
                className="w-full rounded-3xl border border-gray-200 text-sm px-4 py-2 focus:ring-2 focus:ring-orange-400"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Product Category
              </label>
              <select
                className="w-full rounded-3xl border border-gray-200 text-sm px-4 py-2 focus:ring-2 focus:ring-orange-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!categories.length}
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Schema Builder */}
        {loadingSchema ? (
          <p className="text-gray-500 text-sm">Loading schema...</p>
        ) : (
          <section className="space-y-6">
            {facets.map((facet, fIndex) => (
              <div
                key={fIndex}
                className="bg-white border border-gray-200 rounded-3xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-900">
                    Facet {fIndex + 1}
                  </h3>
                  <button
                    className="text-xs font-semibold text-red-600"
                    onClick={() => removeFacet(fIndex)}
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    className="w-full rounded-3xl border border-gray-200 text-sm px-4 py-2"
                    placeholder="Key"
                    value={facet.key}
                    onChange={(e) =>
                      updateFacet(fIndex, "key", e.target.value)
                    }
                  />
                  <input
                    className="w-full rounded-3xl border border-gray-200 text-sm px-4 py-2"
                    placeholder="Label"
                    value={facet.label}
                    onChange={(e) =>
                      updateFacet(fIndex, "label", e.target.value)
                    }
                  />
                  <select
                    className="w-full rounded-3xl border border-gray-200 text-sm px-4 py-2"
                    value={facet.type}
                    onChange={(e) =>
                      updateFacet(fIndex, "type", e.target.value)
                    }
                  >
                    <option value={"select"}>select</option>
                    {/* <option>Text</option>
                    <option>Number</option> */}
                   
                  </select>
                </div>

                {facet.type === "select" && (
  <>
    {facet.options.map((opt, oIndex) => (
      <div key={oIndex} className="flex gap-2 mb-2">
        <input
          className="flex-1 rounded-3xl border border-gray-200 text-sm px-4 py-2"
          placeholder={`Option ${oIndex + 1}`}
          value={opt}
          onChange={(e) =>
            updateOption(fIndex, oIndex, e.target.value)
          }
        />

        <button
          type="button"
          className="text-md font-semibold text-red-600"
          onClick={() => removeOption(fIndex, oIndex)}
        >
          x
        </button>
      </div>
    ))}

    <button
      type="button"
      className="text-xs font-semibold text-purple-600"
      onClick={() => addOption(fIndex)}
    >
      Add Option
    </button>
  </>
)}


              </div>
            ))}

            <button
              type="button"
              className="px-4 py-2 bg-orange-500 text-white rounded-3xl text-sm font-semibold"
              onClick={addFacet}
            >
              Add Facet
            </button>
          </section>
        )}
      </div>
    </div>
  );
}