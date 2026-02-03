// components/product/ProductHero.jsx
'use client'
import React from "react";

export default function ProductHero({ product }) {
  const [activeImage, setActiveImage] = React.useState(
    product.images.main
  );
  const [activeColor, setActiveColor] = React.useState(
    product.colors[0]
  );
  const [activeSize, setActiveSize] = React.useState(
    product.sizes[1] ?? product.sizes[0]
  );

  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating - fullStars >= 0.5;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
      {/* Left: gallery */}
      <div className="space-y-6 p-5 md:p-24">
  {/* Main image - centered, larger */}
  <div className="relative bg-white dark:bg-zinc-900 rounded-4xl   aspect-square flex items-center justify-center overflow-hidden  shadow-xl shadow-gray-200/50 dark:shadow-none">
    <img
      src={activeImage}
      alt={product.name}
      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute top-6 right-6">
      <button className="bg-white/90 dark:bg-zinc-800/90 p-3 rounded-full shadow-lg text-gray-400 hover:text-red-600 transition-colors">
        <span className="material-symbols-outlined">favorite_border</span>
      </button>
    </div>
  </div>

  {/* Horizontal thumbnails below */}
  <div className="flex justify-center gap-4 px-12">
  {[product.images.main, ...product.images.thumbnails].slice(0, 3).map((thumb, idx) => (
    <button
      key={thumb}
      onClick={() => setActiveImage(thumb)}
      className={`relative w-20 h-20 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden transition-all cursor-pointer ${
        activeImage === thumb
          ? "border-2 border-red-600 shadow-lg ring-2 ring-red-200"
          : " hover:border-gray-300 hover:shadow-md"
      }`}
    >
      <img
        src={thumb}
        alt={`Thumbnail ${idx + 1}`}
        className="w-full h-full object-cover rounded-xl"
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
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-light text-slate-900 dark:text-white">
              ₹{product.price.toFixed(2)}
            </span>

            
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-md leading-relaxed max-w-lg">
          {product.description}
        </p>

        {/* Colors */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Available Colors
          </h3>
          <div className="flex gap-4">
            {product.colors.map((color) => {
              const selected = activeColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setActiveColor(color)}
                  className={
                    "w-10 h-10 rounded-full p-0.5 " +
                    (selected
                      ? "border-2 border-red-600 ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark"
                      : "border border-gray-200 dark:border-zinc-700")
                  }
                  style={
                    selected
                      ? { boxShadow: "0 0 0 2px rgba(248, 113, 113, 0.35)" }
                      : undefined
                  }
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <div className="flex justify-between items-center max-w-xs">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Select Size
            </h3>
            <button className="text-xs text-red-600 underline underline-offset-4 font-medium">
              Size guide
            </button>
          </div>
          <div className="flex gap-3">
            {product.sizes.map((size) => {
              const selected = activeSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setActiveSize(size)}
                  className={
                    "px-6 py-3 rounded-xl text-sm transition-all " +
                    (selected
                      ? "border border-slate-900 dark:border-white font-bold bg-slate-900 dark:bg-white text-white dark:text-black"
                      : "border border-gray-200 dark:border-zinc-800 font-semibold hover:border-slate-900 dark:hover:border-white")
                  }
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 space-y-4">
          <button
            type="button"
            disabled={!product.inStock}
            className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold text-md hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {product.inStock ? "Buy Now" : "Out of Stock"}
          </button>

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
