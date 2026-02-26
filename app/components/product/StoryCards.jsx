"use client";

import { useEffect } from "react";




export default function StoryCards({ title,stories }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if(!stories) return(<></>)

  return (
    <section className="mb-32 space-y-16 mx-auto ">
      <div className="text-center reveal fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          {title}
        </h2>
        <div className="w-16 h-1 bg-red-600 mx-auto mt-6" />
      </div>

      <div className="space-y-12 px-8 md:px-24">
        {stories.map((story, index) => (
          <StoryRow
            key={index}
            number={`#${index + 1}`}
            title={story.title}
            text={story.description}
            image={story.image}
            align={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </section>
  );
}



function StoryRow({ number, title, text, image, align }) {
  const isRight = align === "right";

 return (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal ${
      isRight ? "slide-right" : "slide-left"
    }`}
  >
    {/* Image */}
    <div
      className={`rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-sm
        ${isRight ? "md:order-2" : "md:order-1"}
      `}
    >
      <img
        src={image || null}
        alt={title}
       
        className="w-full h-80 object-cover"
      />
    </div>

    {/* Text */}
    <div
      className={`space-y-4 relative border-red-600/20
        ${isRight
          ? "md:order-1 pr-3 md:pr-12 text-right border-r-2"
          : "md:order-2 pl-3 md:pl-12 border-l-2"}
      `}
    >
      <span className="text-6xl font-black text-red-600/10 block leading-none">
        {number}
      </span>
      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>
      <p className="text-base text-slate-600">
        {text}
      </p>
    </div>
  </div>
);

}