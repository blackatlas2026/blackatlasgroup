'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  
  const slides = [
    {
      badge: '10K+ HAPPY CUSTOMERS',
      titleB: 'Built from',
      titleR: 'Thought to Thing',
      desc: 'From concept sketches to finished products — we design, engineer, and manufacture ideas.',
      img: '/images/hero/hero_01_2.jpg',
      dotColor: 'bg-red-400',
      buttonText: 'Get Quote'
    },
    {
      badge: 'PROFESSIONAL SERVICES',
      titleB: 'Made With',
      titleR: "Meaning",
      desc: 'In-house products inspired by heritage, sustainability, and thoughtful design.',
      img: '/images/hero/hero_02.jpg',
      dotColor: 'bg-red-400',
      buttonText: 'Buy Now'
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
      
      
      <div className="relative mx-auto max-w-7xl px-6 z-10 ">
        {/* Height container */}
        <div className="h-[70vh] md:h-[80vh] relative"> 
          {/* Card 1 - Scale/Fade */}
          <div 
            className={`absolute inset-0 rounded-[20px_200px_20px_100px]  md:rounded-[40px_300px_40px_150px] px-8 py-14 md:px-16 transition-all duration-700 ease-out flex items-center ${
              current === 1 
                ? 'opacity-100 scale-100 z-20' 
                : 'opacity-0 scale-90 z-10'
            }`}
            style={{ 
              backgroundImage: `url(${slides[0].img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="grid gap-12 md:grid-cols-2 w-full">
              <div className="space-y-5 relative z-10  rounded-[4rem] p-6 md:p-8 ">
                <p className="text-xs font-semibold tracking-[0.2em] text-gray-800/80">
                  {slides[0].badge}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-none">
                  {slides[0].titleB}<br/> 
                  <span className='text-red-600 font-chamberi font-semibold'>{slides[0].titleR}</span>
                </h1>
                <p className="text-sm md:text-base text-black/70 max-w-md">
                  {slides[0].desc}
                </p>
                <button className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-xl hover:bg-black/90 transition-all backdrop-blur-sm">
                  {slides[0].buttonText}
                  <span className={`h-2 w-2 rounded-full ${slides[0].dotColor}`} />
                </button>
              </div>
              {/* Empty second column for balance */}
              <div></div>
            </div>
          </div>


          {/* Card 2 - Scale/Fade */}
          <div 
            className={`absolute inset-0 organic-shape px-8 py-14 md:px-16 transition-all duration-700 ease-out flex items-center ${
              current === 0 
                ? 'opacity-100 scale-100 z-20' 
                : 'opacity-0 scale-90 z-10'
            }`}
            style={{ 
              backgroundImage: `url(${slides[1].img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="grid gap-12 md:grid-cols-2 w-full">
              <div className="space-y-5 relative z-10  rounded-[4rem] p-6 md:p-8 ">
                <p className="text-xs font-semibold tracking-[0.2em] text-gray-800/80">
                  {slides[1].badge}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-none ">
                  {slides[1].titleB}<br/> 
                  <span className='text-red-600 font-chamberi font-semibold'>{slides[1].titleR}</span>
                </h1>
                <p className="text-sm md:text-base text-black/70 max-w-md">
                  {slides[1].desc}
                </p>
                <button className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-xl hover:bg-black/90 transition-all backdrop-blur-sm">
                  {slides[1].buttonText}
                  <span className={`h-2 w-2 rounded-full ${slides[1].dotColor}`} />
                </button>
              </div>
              {/* Empty second column for balance */}
              <div></div>
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
