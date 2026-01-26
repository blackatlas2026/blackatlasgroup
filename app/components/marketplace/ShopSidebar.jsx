import { brands, categories, colors } from "@/app/data/filters";
import PriceRangeSlider from "./PriceRangeSlider";

export default function ShopSidebar ({value, onChange})  {
  return (
    <aside className="w-full lg:w-64 space-y-10">
      {/* Brands */}
      <Section title="Shop by Brand">
        {brands.map((b) => (
          <label key={b.name} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <input type="checkbox" className="w-5 h-5 rounded accent-red-500 border-slate-300 text-red-500 focus:ring-red-500 dark:bg-slate-800 dark:border-slate-700" />
              <span className="text-sm">{b.name}</span>
            </div>
            <span className="text-xs text-slate-400">{b.count}</span>
          </label>
        ))}
      </Section>


      {/* Categories */}
      <Section title="Categories">
        {categories.map((c) => (
          <a key={c} className="block text-sm hover:text-red-500">
            {c}
          </a>
        ))}
      </Section>

      <PriceRangeSlider value={value} onChange={onChange}/>

      {/* Colors */}
      <Section title="Colors">
        <div className="flex gap-3 flex-wrap">
          {colors.map((c, i) => (
            <button
              key={i}
              className="w-7 h-7 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </Section>

      <button className="w-full py-3 px-6 rounded-lg border-2 border-slate-900 dark:border-slate-700 font-bold text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-all">
        Reset All Filters
      </button>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase border-b pb-3 mb-6">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
