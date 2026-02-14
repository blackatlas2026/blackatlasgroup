"use client";

import { useEffect, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";

export default function ShopSidebar({ value, onChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [open, setOpen] = useState({
    brands: true,
  });

  const [brandOptions, setBrandOptions] = useState([]);
  const [facetSchema, setFacetSchema] = useState(null);

  const selectedBrand = value?.brand || null;

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ----------------------------------
     Load Brands from API
  ---------------------------------- */
  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await fetch("/api/products/brands");
        if (!res.ok) return;

        const data = await res.json();
        setBrandOptions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load brands", err);
      }
    }

    loadBrands();
  }, []);

  /* ----------------------------------
     Load Facet Schema when brand selected
  ---------------------------------- */
useEffect(() => {
  if (!value?.brand || !value?.category) {
    setFacetSchema(null);
    return;
  }

  async function loadSchema() {
    try {
      const res = await fetch(
        `/api/products/facets/schema?brand=${value.brand}&category=${value.category}`
      );

      if (!res.ok) {
        setFacetSchema(null);
        return;
      }

      const data = await res.json();
      setFacetSchema(data);
    } catch (err) {
      console.error("Failed to load facet schema", err);
    }
  }

  loadSchema();
}, [value?.brand, value?.category]);




  useEffect(() => {
    console.log(facetSchema)
  },[facetSchema])


  /* ----------------------------------
     Handlers
  ---------------------------------- */

  const handleBrandSelect = (brandId) => {
    onChange({
      brand: brandId,
      category: null,
      facets: {},
      price: [0, 10000],
    });
  };

  const handleFacetChange = (key, option) => {
    const normalizedKey = key.toLowerCase();
    const normalizedOption = option.toLowerCase();

    const current = value?.facets?.[normalizedKey] || [];

    const next = current.includes(normalizedOption)
      ? current.filter((o) => o !== normalizedOption)
      : [...current, normalizedOption];

    onChange({
      ...value,
      facets: {
        ...value.facets,
        [normalizedKey]: next,
      },
    });
  };


  const resetFilters = () => {
    onChange({
      brand: null,
      category: null,
      facets: {},
      price: [0, 10000],
    });

    setFacetSchema(null);
  };


  /* ----------------------------------
     Render
  ---------------------------------- */

  return (
    <aside className="w-full lg:w-64 space-y-6 lg:space-y-10">

      {/* Mobile Header */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="w-full lg:hidden py-3 px-6 rounded-lg border-2 border-slate-900 font-bold text-sm uppercase flex items-center justify-between tracking-widest hover:bg-slate-900 hover:text-white transition-all"
      >
        Filters
        <span className="material-symbols-outlined text-xl">
          {mobileOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${mobileOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
          lg:max-h-none lg:opacity-100
        `}
      >
        <div className="pt-6 lg:pt-0 space-y-8">

          {/* ----------------------------------
              Shop by Brand (Always visible)
          ---------------------------------- */}
          <MobileSection
            title="Shop by Brand"
            isOpen={open.brands}
            onToggle={() => toggle("brands")}
          >
            {brandOptions.map((b) => (
              <label
                key={b.id}
                className="flex justify-between items-center cursor-pointer"
              >
                <div className="flex gap-3 items-center">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === b.id}
                    onChange={() => handleBrandSelect(b.id)}
                    className="w-5 h-5 accent-red-500"
                  />
                  <span className="text-sm">{b.name}</span>
                </div>
              </label>
            ))}
          </MobileSection>
          <MobileSection
                title="Price Range"
                isOpen={true}
                onToggle={() => {}}
              >
                <PriceRangeSlider
                  value={value?.price}
                  onChange={(price) =>
                    onChange({ ...value, price })
                  }
                />
              </MobileSection>


          {/* CATEGORY (only after brand selected) */}
            {selectedBrand && (
              <MobileSection
                title="Category"
                isOpen={true}
                onToggle={() => {}}
              >
                {brandOptions
                  .find((b) => b.id === selectedBrand)
                  ?.categories?.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={value?.category === cat}
                        onChange={() =>
                          onChange({
                            ...value,
                            category: cat,
                            facets: {}, // reset facets when category changes
                          })
                        }
                        className="w-4 h-4 accent-red-500"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
              </MobileSection>
            )}


          {/* ----------------------------------
              Dynamic Facets (Only after brand selected)
          ---------------------------------- */}
          {selectedBrand && value?.category && facetSchema && (
            <>
              
                

              {facetSchema.facets?.map((facet) => (
                <MobileSection
                  key={facet.key}
                  title={facet.label}
                  isOpen={true}
                  onToggle={() => {}}
                >
                  {facet.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          value?.facets?.[facet.key]?.includes(option.toLowerCase()) || false
                        }
                        onChange={() =>
                          handleFacetChange(facet.key, option)
                        }
                        className="w-4 h-4 accent-red-500"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </MobileSection>
              ))}

              
              

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full py-3 px-6 rounded-lg border-2 border-slate-900 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
              >
                Reset All Filters
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ----------------------------------
   Reusable Section Component
---------------------------------- */
function MobileSection({ title, isOpen, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-sm font-bold uppercase border-b pb-3"
      >
        {title}
        <span className="lg:hidden text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isOpen ? "max-h-[1000px] mt-4" : "max-h-0"}
          lg:max-h-none lg:mt-6
        `}
      >
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
