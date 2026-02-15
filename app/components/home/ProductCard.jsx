import Link from "next/link";


export default function ProductCard({ product }) {
  return (
    <div className="border border-pink-100 rounded-2xl p-6 flex flex-col items-center bg-white text-center shadow-xl">

      {/* Category */}
      <span className="mb-4 inline-block rounded-full border border-red-500 px-3 py-1 text-xs font-bold tracking-widest text-rose-700">
        {product.brand.toUpperCase()}
      </span>

      {/* Image */}
      <img
        src={product.images.main}
        alt={product.name}
        className="h-60 object-contain mb-6 rounded-2xl"
      />

      {/* Rating */}
      {/* <div className="flex items-center gap-2 mb-2">
        <div className="flex text-yellow-400">
          {"★★★★★".slice(0, Math.round(product.rating))}
        </div>
        <span className="text-sm text-black/60">
          {product.reviews.toLocaleString()}+ Reviews
        </span>
      </div> */}

      {/* Name */}
      <h3 className="font-semibold text-lg mb-2">
        {product.name}
      </h3>

      {/* Price */}
      <p className="font-bold mb-4">
        ₹{product.price.toFixed(2)}
      </p>

      {/* CTA */}
      <Link
        href={`/product/${product.slug}`}
        className="mt-auto w-full rounded-full px-8 py-4 bg-slate-900 text-white font-bold transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/30 text-center"
      >
        Buy Now
      </Link>

    </div>
  )
}
