// components/BentoCard.jsx

const variantClasses = {
  wide: "lg:col-span-8 md:col-span-4",
  tall: "lg:col-span-4 md:col-span-2 md:row-span-2",
  small: "lg:col-span-4 md:col-span-2",
};

export default function BentoCard({ card }) {
  return (
    <div
      className={`
        relative group overflow-hidden rounded-4xl
        border border-slate-200 bento-card
        ${variantClasses[card.variant]}
      `}
    >
      {/* Background image */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-overlay" />

      {/* Optional badge */}
      {card.badge && (
        <div className="absolute top-6 left-6 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
          {card.badge}
        </div>
      )}

      {/* Optional icon */}
      {card.icon && (
        <div className="absolute top-6 right-6 z-20 bg-red-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined">
            {card.icon}
          </span>
        </div>
      )}


      {card.arrow && (<div className="absolute top-6 right-6 z-20">
<span className="material-symbols-outlined text-red-500 text-3xl font-bold">arrow_outward</span>
</div>)}

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 z-10">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
          {card.title}
        </h3>
        <p className="mt-2 text-slate-300 text-sm max-w-md">
          {card.description}
        </p>

        {card.cta && (
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
            {card.cta}
          </button>
        )}
      </div>
    </div>
  );
}
