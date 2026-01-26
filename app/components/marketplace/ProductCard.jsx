export default function ProductCard({ product }) {
  return (
    <div className="group">
      <div className="relative aspect-square mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 overflow-hidden flex items-center justify-center  transition-transform duration-500 group-hover:scale-[1.02]">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
        />

        {product.badge && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
            {product.badge}
          </span>
        
        )}

        
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="font-bold">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex gap-1.5 pt-2">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function IconButton({ icon }) {
  return (
    <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
      <span className="material-symbols-outlined text-sm">{icon}</span>
    </button>
  );
}
