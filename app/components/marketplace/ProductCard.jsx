import Link from "next/link";




export default function ProductCard({ product }) {
  const colorVariant = product.variantAttributes?.find(
    v => v.key === "color"
  );

  return (
    <Link href={`/product/${product?.slug}`} className="group block">
    <div className="group">
      <div
        className="
          flex md:block
          gap-4 md:gap-0
         
          bg-white
          overflow-hidden
          cursor-pointer
          transition-all
          rounded-t-2xl
     
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
            className="max-w-full max-h-full mix-blend-multiply"
          />

          {/* BADGE */}
          {!product.inStock && (
            <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest">
              Out of stock
            </span>
          )}

          {product.badge && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
              {product.badge}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-3 md:p-0 md:pt-4 space-y-1.5">
          {/* CATEGORY */}
          {product.category && (
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              {product.category}
            </p>
          )}

          {/* BRAND */}
          <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500/90">
            {product.brand}
          </h4>

          {/* NAME */}
          <h3 className="font-bold text-md md:text-lg leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* PRICE */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-md md:text-base">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* COLOR VARIANTS */}
          {colorVariant?.options?.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {colorVariant.options.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-black/10"
                  title={c}
                  style={{ backgroundColor: c.toLowerCase() }}
                />
              ))}

              {colorVariant.options.length > 4 && (
                <span className="text-[11px] text-slate-400 ml-1">
                  +{colorVariant.options.length - 4}
                </span>
              )}
            </div>
          )}

          {/* EXTERNAL AVAILABILITY */}
          {product.externalLinks?.length > 0 && (
            <p className="text-[10px] uppercase tracking-wider text-slate-400 pt-1">
              Available on {product.externalLinks[0].platform}
            </p>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
