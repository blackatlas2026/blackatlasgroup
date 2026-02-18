export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex md:block gap-4 md:gap-0 bg-white rounded-2xl">
        {/* IMAGE */}
        <div className="w-2/5 md:w-full md:aspect-square bg-slate-200 rounded-2xl" />

        {/* CONTENT */}
        <div className="flex-1 p-3 md:p-0 md:pt-4 space-y-3 w-full">
          <div className="h-3 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="flex gap-2 pt-2">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
