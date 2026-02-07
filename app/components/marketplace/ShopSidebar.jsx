"use client";

import { useState } from "react";
import { brands, categories, colors } from "@/app/data/filters";
import PriceRangeSlider from "./PriceRangeSlider";

export default function ShopSidebar({ value, onChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [open, setOpen] = useState({
    brands: false,
    categories: false,
    price: false,
    colors: false,
  });

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="w-full lg:w-64 space-y-6 lg:space-y-10">

        {/* Mobile Filters Header */}
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
    <div className="pt-6 lg:pt-0 space-y-6 lg:space-y-10">
      
      {/* Brands */}
      <MobileSection
        title="Shop by Brand"
        isOpen={open.brands}
        onToggle={() => toggle("brands")}
      >
        {brands.map((b) => (
          <label key={b.name} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 rounded accent-red-500 border-slate-300"
              />
              <span className="text-sm">{b.name}</span>
            </div>
            <span className="text-xs text-slate-400">{b.count}</span>
          </label>
        ))}
      </MobileSection>

      {/* Categories */}
      <MobileSection
        title="Categories"
        isOpen={open.categories}
        onToggle={() => toggle("categories")}
      >
        {categories.map((c) => (
          <a key={c} className="block text-sm hover:text-red-500">
            {c}
          </a>
        ))}
      </MobileSection>

      {/* Price */}
      <MobileSection
        title="Price Range"
        isOpen={open.price}
        onToggle={() => toggle("price")}
      >
        <PriceRangeSlider value={value} onChange={onChange} />
      </MobileSection>

      {/* Colors */}
      <MobileSection
        title="Colors"
        isOpen={open.colors}
        onToggle={() => toggle("colors")}
      >
        <div className="flex gap-3 flex-wrap">
          {colors.map((c, i) => (
            <button
              key={i}
              className="w-7 h-7 rounded-full border"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </MobileSection>

      {/* Reset */}
      <button className="w-full py-3 px-6 rounded-lg border-2 border-slate-900 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
        Reset All Filters
      </button>
      </div>
      </div>
    </aside>
  );
}


function MobileSection({ title, isOpen, onToggle, children }) {
  return (
    <div>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-sm font-bold uppercase border-b pb-3 lg:pb-0 "
      >
        {title}
        <span className="lg:hidden text-xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
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
function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase border-b pb-3 mb-6">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}