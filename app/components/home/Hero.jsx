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
    imgDesktop: '/images/hero/hero_01.jpg',
    imgMobile: '/images/hero/hero_01_portrait.jpg',
    dotColor: 'bg-red-400',
    buttonText: 'Get Quote'
  },
  {
    badge: 'PROFESSIONAL SERVICES',
    titleB: 'Made With',
    titleR: 'Meaning',
    desc: 'In-house products inspired by heritage, sustainability, and thoughtful design.',
    imgDesktop: '/images/hero/hero_02.jpg',
    imgMobile: '/images/hero/hero_02_portrait.jpg',
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


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);

    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);


  const [shapeReady, setShapeReady] = useState(false);

    useEffect(() => {
      const t = setTimeout(() => setShapeReady(true), 100);
      return () => clearTimeout(t);
    }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-[#fcfcfc]">
      {/* SVG mask */}
      
      
      <div className="relative mx-auto max-w-7xl px-6 z-10 ">
        {/* Height container */}
        <div className="h-[80vh] md:h-[90vh] relative"> 
          {/* Card 1 - Scale/Fade */}
            <div 
              className={`
                absolute inset-0 min-h-[75vh] md:min-h-[90vh]
                px-8 py-10 md:py-14 md:px-16
                transition-all duration-700 ease-out
                transition-[border-radius]
                flex items-start md:items-center
                ${
                  shapeReady
                    ? 'rounded-[20px_200px_20px_100px] md:rounded-[40px_300px_40px_150px]'
                    : 'rounded-3xl'
                }
                ${current === 0 ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-90 z-10'}
              `}
              style={{ 
                backgroundImage: `url(${
                  isMobile ? slides[0].imgMobile : slides[0].imgDesktop
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
  <div className="grid gap-12 md:grid-cols-2 w-full">
    
    {/* Text Content */}
    <div
      className="
        space-y-5 relative z-10
        p-6 md:p-8
        max-w-md mx-auto md:mx-0
        text-center md:text-left
        flex flex-col items-center md:items-start
       
        
        rounded-4xl
      "
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-gray-800/80">
        {slides[0].badge}
      </p>

      <h1 className="text-4xl md:text-5xl font-bold leading-none">
        {slides[0].titleB}
        <br />
        <span className="text-red-600 font-chamberi font-semibold">
          {slides[0].titleR}
        </span>
      </h1>

      <p className="text-sm md:text-base text-black/70">
        {slides[0].desc}
      </p>

      <button className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-xl hover:bg-black/90 transition-all">
        {slides[0].buttonText}
        <span className={`h-2 w-2 rounded-full ${slides[0].dotColor}`} />
      </button>
    </div>

    {/* Empty column for desktop balance */}
    <div className="hidden md:block"></div>

  </div>
</div>


          {/* Card 2 - Scale/Fade */}
         <div 
            className={`absolute inset-0   min-h-[75vh] md:min-h-[90vh] rounded-[20px_200px_20px_100px]  md:rounded-[40px_300px_40px_150px] px-8 py-10 md:py-14 md:px-16
            transition-all duration-700 ease-out flex
            items-start md:items-center
            ${current === 1 ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-90 z-10'}`}
            style={{ 
              backgroundImage: `url(${
                isMobile ? slides[1].imgMobile : slides[1].imgDesktop
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
  <div className="grid gap-12 md:grid-cols-2 w-full">
    
    {/* Text Content */}
    <div
      className="
        space-y-5 relative z-10
        p-6 md:p-8
        max-w-md mx-auto md:mx-0
        text-center md:text-left
        flex flex-col items-center md:items-start
       
        
        rounded-4xl
      "
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-gray-800/80">
        {slides[1].badge}
      </p>

      <h1 className="text-4xl md:text-5xl font-bold leading-none">
        {slides[1].titleB}
        <br />
        <span className="text-red-600 font-chamberi font-semibold">
          {slides[1].titleR}
        </span>
      </h1>

      <p className="text-sm md:text-base text-black/70">
        {slides[1].desc}
      </p>

      <button className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium shadow-xl hover:bg-black/90 transition-all">
        {slides[1].buttonText}
        <span className={`h-2 w-2 rounded-full ${slides[1].dotColor}`} />
      </button>
    </div>

    {/* Empty column for desktop balance */}
    <div className="hidden md:block"></div>

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
