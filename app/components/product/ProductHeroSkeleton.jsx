export default function ProductHeroSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 animate-pulse">
      
      {/* Left - Image */}
      <div className="space-y-6 p-5 md:p-24">
        <div className="bg-gray-200 rounded-4xl aspect-square" />

        <div className="flex flex-wrap justify-center gap-4 max-w-[420px] mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[22%] min-w-[70px] max-w-[90px] aspect-square bg-gray-200 rounded-2xl"
            />
          ))}
        </div>
      </div>

      {/* Right - Content */}
      <div className="flex flex-col justify-center space-y-8 p-6 md:mr-20">
        
        <div className="space-y-4">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-10 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>

        <div className="h-14 w-full bg-gray-200 rounded-2xl" />

      </div>
    </section>
  );
}
