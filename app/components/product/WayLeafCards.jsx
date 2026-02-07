import { useEffect } from "react";

export default function WayLeafCards() {
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
        {
        threshold: 0.15,
        }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    }, []);


  return (
    <section className="mb-32 space-y-16 mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center reveal fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Our Story: Conscious Craftsmanship
        </h2>
        <div className="w-16 h-1 bg-red-600 mx-auto mt-6" />
      </div>

      <div className="space-y-12 px-24">
        {/* #1 */}
        <StoryRow
          number="#1"
          title="Made from naturally fallen palm leaves"
          text="We don't cut down trees. Every plate begins its life as a naturally shed leaf from the Areca palm tree, harvested sustainably by local communities."
          image="/images/wayleafCards/1.jpg"
          align="left"
        />

        {/* #2 */}
        <StoryRow
          number="#2"
          title="No chemicals, no coatings, no plastics"
          text="Our process uses only water and heat. Pure, tactile, and completely safe for your family without any hidden toxins."
          image="/images/wayleafCards/2.jpg"
          align="right"
        />

        {/* #3 */}
        <StoryRow
          number="#3"
          title="Hot, cold, and oily food safe"
          text="Engineered by nature to handle everything from steaming pastas to chilled desserts without leaking or warping."
            image="/images/wayleafCards/3.jpg"
          align="left"
        />

        {/* #4 */}
        <StoryRow
          number="#4"
          title="Perfect for events & weddings"
          text="The elegant wood-like grain adds a premium touch to gatherings while keeping sustainability at the center."
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDcoazEDdM2IsSClwH-VoYjM8FhiRPkUyPoFppn6sPn5m3hMYupsT3P2liKhp2wIM9ow9-SB6_jOp_J-FC2hg1XesQAiebBgEf_OsGbdvcNqWzJ7UDipOwba7pIUbc6KGBxtrwfTUSsUreqEFk_e-lVkcTgoMe5Q6nt6sZtEY-Vo60mQvllGcW3FM0D-VlFOri-gM3GMRLV4oIcrKhPq0gp7IihSvGSdT7vI3tsW1voepiP9EG6YiQ38QI7H9q615ycbNPeJEo"
          align="right"
        />
      </div>
    </section>
  );
}

/* ---------------------------------- */

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
      className={`rounded-[2.5rem] overflow-hidden bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm
        ${isRight ? "md:order-2" : "md:order-1"}
      `}
    >
      <img
        src={image}
        alt={title}
       
        className="w-full h-80 object-cover"
      />
    </div>

    {/* Text */}
    <div
      className={`space-y-4 relative border-red-600/20
        ${isRight
          ? "md:order-1 md:pr-12 text-right border-r-2"
          : "md:order-2 md:pl-12 border-l-2"}
      `}
    >
      <span className="text-6xl font-black text-red-600/10 block leading-none">
        {number}
      </span>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-base text-slate-600 dark:text-slate-400">
        {text}
      </p>
    </div>
  </div>
);

}
