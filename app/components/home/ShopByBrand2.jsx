// components/ShopByBrand2.jsx
"use client";

const mockBrands = [
  {
    id: "luxtech",
    name: "Lux Tech Series",
    logo: "/brands/logo.png",
    tagline: "Luxury tech series with sustainable precision",
    productCount: 128,
  },
  {
    id: "aura",
    name: "Aura Essential",
    logo: "/brands/logo.png",
    tagline: "Sustainable fashion design",
    productCount: 97,
  },
  {
    id: "puma",
    name: "Puma",
    logo: "/brands/logo.png",
    tagline: "Fast styles on and off track",
    productCount: 64,
  },
  {
    id: "new-balance",
    name: "New Balance",
    logo: "/brands/logo.png",
    tagline: "Comfort meets everyday style",
    productCount: 52,
  },
];

export function ShopByBrand2({ brands = mockBrands, onBrandClick }) {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <p className="text-sm lg:text-base font-semibold uppercase tracking-widest text-slate-600">
              Shop by brand
            </p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Find your favorite labels
            </h2>
          </div>
          <button
            type="button"
            className="group inline-flex items-center gap-2 text-base font-semibold text-slate-900 hover:text-black transition-colors"
          >
            Explore all
            <svg
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {brands.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => onBrandClick && onBrandClick(brand.id)}
              className="group relative flex h-48 w-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50/90 to-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-200 hover:shadow-slate-300/50 hover:shadow-2xl hover:shadow-slate-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 lg:h-52"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent" />
              
              {/* Logo */}
              <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 shadow-lg group-hover:shadow-slate-300/50">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 w-10 object-contain"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 mb-6 flex flex-1 flex-col">
                <h3 className="mb-1 text-lg font-bold text-slate-900 group-hover:text-slate-950">
                  {brand.name}
                </h3>
                <p className="text-sm text-slate-600 group-hover:text-slate-700">
                  {brand.tagline}
                </p>
              </div>

              {/* Product count badge */}
              <div className="relative z-10 mb-3 flex items-center justify-between">
                <span className="rounded-full bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                  {brand.productCount} items
                </span>
              </div>

              {/* Bottom CTA */}
              <div className="relative z-10 flex items-center gap-2 text-sm text-slate-600 group-hover:text-slate-900">
                <span className="h-px flex-1 bg-slate-200 group-hover:bg-slate-300 transition-colors" />
                <span className="font-medium">Explore collection</span>
                <svg
                  className="h-4 w-4 flex-shrink-0 transform transition group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
