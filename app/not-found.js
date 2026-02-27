import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:py-24 text-center">
      
      <div className="relative mb-8">
        <h1 className="text-[120px] md:text-[220px] font-black leading-none tracking-tighter text-slate-200   select-none">
          404
        </h1>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600/10   p-8 rounded-full border-2 border-dashed border-red-600 animate-pulse">
            <span className="material-symbols-outlined text-red-600 text-6xl md:text-8xl">
              remove_shopping_cart
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900   leading-tight">
          Looks like this aisle is empty.
        </h2>

        <p className="text-lg text-slate-600   font-medium">
          The product or page you are looking for has been moved, deleted, or never existed.
          Let’s get you back to the shop.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
        
        {/* Home */}
        <Link
          href="/"
          className="flex-1 bg-red-600 hover:bg-red-600/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">home</span>
          Back to Home
        </Link>

        {/* Shop */}
        <Link
          href="/marketplace"
          className="flex-1 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600/5 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">explore</span>
          Browse Shop
        </Link>

      </div>
    </div>
  );
}
