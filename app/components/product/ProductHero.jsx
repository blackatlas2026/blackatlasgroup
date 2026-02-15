// components/product/ProductHero.jsx
'use client'
import React from "react";

export default function ProductHero({ product }) {
  const [activeImage, setActiveImage] = React.useState(
    product.images.main
  );


  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating - fullStars >= 0.5;

   const [selectedVariants, setSelectedVariants] = React.useState(() => {
    const initial = {};
    product.variantAttributes?.forEach(attr => {
      initial[attr.key] = attr.options?.[0] ?? "";
    });
    return initial;
  });

  function updateVariant(key, value) {
    setSelectedVariants(v => ({ ...v, [key]: value }));
  }


  function buildWhatsAppLink(product, selectedVariants) {
    const variantText = Object.entries(selectedVariants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    const message = `
  Hi, I'm interested in this product:

  ${product.brand}
  ${product.name}
  Price: ₹${product.price}
  ${variantText ? `Options: ${variantText}` : ""}

  Please let me know availability.
    `.trim();

    return `https://wa.me/918848378237?text=${encodeURIComponent(message)}`;
  }


  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
  {/* Left: gallery */}
      <div className="space-y-6 p-5 md:p-24">
        <div className="relative bg-white :bg-zinc-900 rounded-4xl aspect-square flex items-center justify-center overflow-hidden shadow-xl">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700"
          />
        </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-[420px] mx-auto">
        {[product.images.main, ...product.images.gallery].map((img, idx) => (
          <button
            key={`${img}-${idx}`}
            type="button"
            onClick={() => setActiveImage(img)}
            className={`w-[22%] min-w-[70px] max-w-[90px] aspect-square
              rounded-2xl overflow-hidden border transition
              ${
                activeImage === img
                  ? "border-red-600 ring-2 ring-red-200"
                  : "hover:border-gray-300"
              }
            `}
          >
            <img
              src={img}
              alt="Product thumbnail"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>



      </div>


      {/* Right: details */}
      <div className="flex flex-col justify-center space-y-8 p-6 md:mr-20">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase mb-3 block">
            {product.brand}
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900  leading-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-light text-slate-900 ">
              ₹{product.price.toFixed(2)}
            </span>

            
          </div>
        </div>

        <p className="text-slate-600  text-md leading-relaxed max-w-lg">
          {product.description}
        </p>

        {/* Colors */}
          {/* 🔥 Variant Attributes */}
        {product.variantAttributes?.map(attr => (
          <div key={attr.key} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {attr.label}
            </h3>

            {/* COLOR TYPE */}
            {attr.type === "color" && (
              <div className="flex gap-4">
                {attr.options.map(opt => {
                  const selected = selectedVariants[attr.key] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => updateVariant(attr.key, opt)}
                      className={`w-10 h-10 rounded-full p-0.5 ${
                        selected
                          ? "border-2 border-red-600 ring-2 ring-red-300"
                          : "border-2 border-gray-200"
                      }`}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: opt }}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* SELECT TYPE */}
            {attr.type === "select" && (
              <div className="flex gap-3 flex-wrap">
                {attr.options.map(opt => {
                  const selected = selectedVariants[attr.key] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => updateVariant(attr.key, opt)}
                      className={`px-6 py-3 rounded-xl text-sm transition-all ${
                        selected
                          ? "border bg-slate-900 text-white font-bold"
                          : "border border-gray-200 hover:border-slate-900"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* TEXT TYPE */}
            {attr.type === "text" && (
              <input
                value={selectedVariants[attr.key]}
                onChange={e => updateVariant(attr.key, e.target.value)}
                className="border rounded-lg px-4 py-2 w-full max-w-sm"
                placeholder={`Enter ${attr.label}`}
              />
            )}
          </div>
        ))}

        {/* CTA */}
        {/* CTA */}
<div className="pt-4 space-y-4">
  <div className="relative buy-group">
    <button
      type="button"
      disabled={!product.inStock}
      className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold text-md hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {product.inStock ? "Buy Now" : "Out of Stock"}
      <span className="material-symbols-outlined">expand_more</span>
    </button>

    {/* Dropdown */}
    <div className="buy-dropdown absolute left-0 right-0 top-full mt-3 bg-white :bg-zinc-900 rounded-[1.25rem] border border-gray-100 :border-zinc-800 shadow-2xl opacity-0 invisible translate-y-2 transition-all duration-300 z-40 overflow-hidden">
  <div className="flex flex-col">

    {/* External platforms */}
    {product.externalLinks?.map((link) => (
      <a
        key={link.platform}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-4 font-semibold flex items-center justify-between hover:bg-gray-50 :hover:bg-zinc-800 hover:text-red-600 transition-colors border-b border-gray-50 :border-zinc-800"
      >
        Buy on {link.platform}
        <span className="material-symbols-outlined text-sm opacity-50">
          open_in_new
        </span>
      </a>
    ))}

    {/* WhatsApp (computed link) */}
    <a
      href={buildWhatsAppLink(product, selectedVariants)}
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-4 font-semibold flex items-center gap-3 hover:bg-gray-50 :hover:bg-zinc-800 hover:text-red-600 transition-colors"
    >
      <span className="material-symbols-outlined text-green-600">
        chat
      </span>
      WhatsApp for Bulk Orders
    </a>

  </div>
</div>

      </div>

      {/* Stock info */}
      <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-red-600">
            inventory_2
          </span>
          {product.inStock ? "In Stock" : "Backorder"}
        </div>
      </div>
    </div>

      </div>
    </section>
  );
}
