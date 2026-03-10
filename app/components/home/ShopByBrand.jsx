'use client';

export default function ShopByBrand({ brands = [] }) {
  // Fallback data if backend array is empty
  const defaultBrands = [
    {
      name: 'Collagen',
      image: '/brands/logo.png',
      description: 'For Joint health & beauty',
      ctaText: 'Shop Now',
    },
    {
      name: 'Fasting Support',
      image: '/brands/logo.png',
      description: 'Fasting while support',
      ctaText: 'Shop Now',
    },
  ];

  const brandsToShow = brands.length > 0 ? brands : defaultBrands;

  return (
    <section className="w-full bg-white relative py-16 lg:py-24">
    <div className="absolute inset-x-0 top-0 pointer-events-none z-0 opacity-40 pt-0">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50,150 C200,50 400,600 600,400 C800,200 1000,750 1250,650" fill="none" stroke="#E11D48" strokeLinecap="round" strokeWidth="1"></path>
        <path d="M-50,155 C200,50 400,600 600,400 C800,205 1000,755 1250,650" fill="none" stroke="#E11D48" strokeDasharray="4 4" strokeOpacity="0.3" strokeWidth="0.75"></path>
      </svg>
    </div>


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
          <div>
            <p className="text-sm lg:text-base font-semibold uppercase tracking-widest text-red-600">
              Shop by brand
            </p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Find your favorite labels
            </h2>
          </div>
          <button className="group inline-flex items-center gap-2 text-base font-semibold text-red-600 hover:text-red-400 transition-all duration-300">
            Explore all
            <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 h-full gap-6 lg:gap-8">
          {brandsToShow.map((brand, index) => (
            <div
              key={index}
              className="group relative h-72 lg:h-84 w-full overflow-hidden rounded-3xl backdrop-blur-xs shadow-lg border border-gray-400/10 bg-white/80 px-8 py-14 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Large background logo */}
              <img
                src={brand.image}
                alt=""
                className="
                  pointer-events-none absolute right-[-10%] top-1/2
                  h-[120%] max-w-none -translate-y-1/2
                  opacity-40 
                  transition-all duration-500
                  
                "
              />


              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between">
                
                {/* Top section */}
                <div>
                  {/* Small logo badge */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-8 w-8 object-contain"
                    />
                  </div>

                  {/* Heading */}
                  <h3 className="mb-3 text-2xl font-bold text-slate-900">
                    {brand.name}
                  </h3>

                  {/* Description */}
                  <p className="max-w-md text-sm lg:text-base leading-relaxed text-slate-700">
                    {brand.description}
                  </p>
                </div>

                {/* CTA */}
                <div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600">
                    {brand.ctaText}
                    <span aria-hidden>→</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
