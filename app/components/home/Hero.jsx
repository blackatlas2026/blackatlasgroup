'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  
  const slides = [
    {
      badge: '10K+ HAPPY CUSTOMERS',
      titleB: 'Your Product',
      titleR: 'Made Simple',
      desc: 'Short line about how this product helps users stay energized, focused, and on track.',
      img: '/images/product.png',
      dotColor: 'bg-red-400',
      buttonText: 'Buy Now'
    },
    {
      badge: 'PROFESSIONAL SERVICES',
      title: 'Custom Solutions\nFor Your Business',
      desc: 'Tailored services to accelerate your growth with cutting-edge technology.',
      img: '/images/services.png',
      dotColor: 'bg-red-400',
      buttonText: 'Get Quote'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-[#fcfcfc]">
      {/* SVG mask */}
      
      
      <div className="relative mx-auto max-w-7xl px-6 z-10">
        {/* Height container */}
        <div className="h-[70vh] md:h-[80vh] relative"> 
          {/* Card 1 - Scale/Fade */}
          <div 
            className={`absolute inset-0  organic-shape px-8 py-14 md:px-16 transition-all duration-700 ease-out flex items-center ${
              current === 0 
                ? 'opacity-100 scale-100 z-20 ' 
                : 'opacity-0 scale-90 z-10'  // Scale down + fade out
            }`}
            style={{ backgroundColor: '#f0f9ff' }}
          >
            <div className="grid gap-12 md:grid-cols-2 w-full">
              <div className="space-y-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-black/60">
                  {slides[0].badge}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-none" 
                     >{slides[0].titleB}<br/> <span className='text-red-600 font-chamberi font-semibold'>{slides[0].titleR}</span>
                      </h1>
                <p className="text-sm md:text-base text-black/60 max-w-md">
                  {slides[0].desc}
                </p>
                <button className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-md hover:bg-black/90 transition">
                  {slides[0].buttonText}
                  <span className={`h-2 w-2 rounded-full ${slides[0].dotColor}`} />
                </button>
              </div>
              <div className="flex justify-center md:justify-end">
                <img src={slides[0].img} alt="Product" className="max-h-[340px] w-auto object-contain" />
              </div>
            </div>
          </div>

          {/* Card 2 - Scale/Fade */}
          <div 
            className={`absolute inset-0  rounded-[40px] px-8 py-14 md:px-16 transition-all duration-700 ease-out flex items-center ${
              current === 1 
                ? 'opacity-100 scale-100 z-20 ' 
                : 'opacity-0 scale-90 z-10'  // Scale down + fade out
            }`}
            style={{ backgroundColor: '#f0f9ff' }}
          >
            <div className="grid gap-12 md:grid-cols-2 w-full">
              <div className="space-y-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-black/60">
                  {slides[1].badge}
                </p>
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight" 
                    dangerouslySetInnerHTML={{ __html: slides[1].title.replace('\n', '<br/>') }} />
                <p className="text-sm md:text-base text-black/60 max-w-md">
                  {slides[1].desc}
                </p>
                <button className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-md hover:bg-black/90 transition">
                  {slides[1].buttonText}
                  <span className={`h-2 w-2 rounded-full ${slides[1].dotColor}`} />
                </button>
              </div>
              <div className="flex justify-center md:justify-end">
                <img src={slides[1].img} alt="Services" className="max-h-[340px] w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-12">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? 'bg-black w-8' : 'bg-black/30 hover:bg-black'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
