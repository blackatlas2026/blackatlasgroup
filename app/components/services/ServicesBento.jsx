// components/ServicesBento.jsx
import BentoCard from "./BentoCard";
import { servicesCards } from "@/app/data/servicesCards";




export default function ServicesBento() {
  return (
    
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[320px]">
        {servicesCards.map((card) => (
          <BentoCard key={card.id} card={card} />
        ))}
      </div>
   
  );
}
