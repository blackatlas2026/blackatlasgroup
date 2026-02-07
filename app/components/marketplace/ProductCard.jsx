export default function ProductCard({ product }) {
  return (
    <div className="group">
      <div
        className="
          flex md:block
          gap-4 md:gap-0
          rounded-2xl
          bg-white
          overflow-hidden
          group cursor-pointer
          transition-all
        "
      >
        {/* IMAGE */}
        <div
          className="
            relative
            w-2/5 
            md:w-full md:aspect-square
            bg-slate-100
            flex items-center justify-center
            transition-transform duration-500
            md:group-hover:scale-[1.02]
            rounded-2xl overflow-hidden
          "
        >
          <img
            src={product.images.main}
            alt={product.name}
            className="max-w-full max-h-full  mix-blend-multiply "
          />

          {product.badge && (
            <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest">
              {product.badge}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-3 md:p-0 md:pt-4 space-y-1">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500/90">
            {product.brand}
          </h4>

          <h3 className="font-bold text-sm md:text-lg leading-snug">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-bold text-md md:text-base">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* COLORS */}
          {/* <div className="flex gap-1.5 pt-1 md:pt-2">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border"
                style={{ backgroundColor: c }}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
