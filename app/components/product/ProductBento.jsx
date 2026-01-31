// components/ServicesBento.jsx
import BentoCard from "../services/BentoCard";





export default function ProductBento({cards}) {
  return (
    
      <div className="grid grid-cols-1 p-5 md:py-6 md:px-48 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[320px]">
        {cards.map((card) => (
          <BentoCard key={card.id} card={card} />
        ))}
      </div>
   
  );
}
