// components/TailwindTest.jsx - Drop this anywhere to test
export default function TailwindTest() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-zinc-900 rounded-3xl border border-blue-200 dark:border-zinc-700">
      
      {/* Typography */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Tailwind Test
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          If you see proper styling below, Tailwind is working!
        </p>
      </div>

      {/* Colors + Dark mode */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transition-all">
          red-500 → red-600
        </div>
        <div className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition-all dark:bg-zinc-800 dark:hover:bg-zinc-700">
          Blue + Dark
        </div>
        <div className="p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl shadow-lg">
          Gradient
        </div>
        <div className="p-4 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-zinc-700 rounded-xl">
          Custom colors
        </div>
      </div>

      {/* Layout + Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Grid Layout</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            grid-cols-3 + gap-6 working
          </p>
        </div>
        <div className="h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-md animate-pulse" />
        <div className="flex flex-col justify-center">
          <span className="text-2xl font-bold text-red-600">✓ Pass</span>
        </div>
      </div>

      {/* Custom classes + Arbitrary */}
      <div className="p-6 rounded-[1.5rem] bg-gradient-to-b from-orange-50 to-amber-100 dark:from-zinc-800 dark:to-zinc-900 border-2 border-orange-200 dark:border-zinc-600">
        <p className="text-lg font-medium">
          Custom: rounded-[1.5rem] ✓
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 w-[65%]"
            style={{ width: '65%' }}
          />
        </div>
      </div>

      {/* Flex + Responsive */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center p-6 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl">
        <div className="w-24 h-24 bg-emerald-500 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-lg">
          sm:flex-row
        </div>
        <span className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
          Responsive flex working
        </span>
      </div>
    </div>
  );
}
