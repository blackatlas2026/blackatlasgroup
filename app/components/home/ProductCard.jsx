export default function ProductCard({ product }) {
  return (
    <div className="border border-pink-100 rounded-2xl p-6 flex flex-col items-center bg-white text-center">

      {/* Category */}
      <span className="mb-4 inline-block rounded-full border border-red-500 px-3 py-1 text-xs font-bold tracking-widest text-rose-700">
        {product.category.toUpperCase()}
      </span>

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-contain mb-6"
      />

      {/* Rating */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex text-yellow-400">
          {"★★★★★".slice(0, Math.round(product.rating))}
        </div>
        <span className="text-sm text-black/60">
          {product.reviews.toLocaleString()}+ Reviews
        </span>
      </div>

      {/* Name */}
      <h3 className="font-semibold text-lg mb-4">
        {product.name}
      </h3>

      {/* Price */}
      <p className="font-bold mb-6">
        ₹{product.price.toFixed(2)}
      </p>

      {/* CTA */}
      <button className="mt-auto w-full rounded-full bg-black py-3 text-white font-bold">
        ADD TO CART
      </button>

    </div>
  )
}
