"use client";

export default function ShopByBrand2() {
  // Mock backend data
  const brands = [
    {
      name: "Brand 1",
      description:
        "Premium bio-available formulas for joint health, hair, and skin elasticity.",
      logo: "/brands/logo.png", // same image used everywhere
      cta: "Shop Now",
    },
    {
      name: "Brand 2",
      description:
        "Electrolyte-balanced supplements designed to sustain you through your fast.",
      logo: "/brands/logo.png",
      cta: "Shop Now",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 px-6 lg:px-12 max-w-7xl mx-auto font-display text-slate-900">

      {/* Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 100C150 50 400 350 600 300C800 250 1000 500 1250 450"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            opacity="0.4"
          />
          <path
            d="M-100 200C100 150 350 450 650 350C950 250 1100 600 1300 500"
            stroke="#EF4444"
            strokeWidth="0.75"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="absolute top-1/4 left-10 w-3 h-3 bg-red-600 rounded-full opacity-30 animate-pulse" /> <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-red-600 rounded-full opacity-20" /> <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-red-600 rounded-full opacity-40" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-16">
        <div className="space-y-2">
          <span className="text-red-600 font-bold tracking-widest uppercase text-sm">
            Shop by Brand
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Find your favorite labels
          </h2>
        </div>

        <a
          href="#"
          className="group flex items-center gap-2 text-red-600 font-semibold hover:gap-4 transition-all duration-300 mt-6 md:mt-0"
        >
          Explore all 
          <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </a>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl glass-card border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
          >
            {/* Watermark logo */}
            <img
              src={brand.logo}
              alt=""
              className="
                pointer-events-none absolute -right-8 -bottom-8 
                h-[90%] max-w-none
                opacity-10 grayscale
                transition-all duration-700
                group-hover:opacity-20
                group-hover:grayscale-0
                group-hover:scale-110
              "
            />

            {/* Content */}
            <div className="relative p-10 lg:p-14 flex flex-col h-full min-h-[400px]">
              {/* Small logo */}
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-8">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-8 object-contain"
                />
              </div>

              <div className="mt-auto">
                <h3 className="text-3xl font-bold mb-3">
                  {brand.name}
                </h3>

                <p className="text-slate-500 max-w-xs mb-8">
                  {brand.description}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-full transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/30"
                >
                  {brand.cta}
                  <span aria-hidden> →</span>
                </a>
              </div>
            </div>

            {/* Accent dot */}
            <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-red-600/5 border border-red-600/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
