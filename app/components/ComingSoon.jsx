export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Top Navbar */}
      {/* <nav className="border-b border-black/10 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          
          <img
            src="/logo.png"
            alt="Black Atlas"
            className="h-10 w-auto hover:scale-105 transition-transform"
          />

         
          <div className="flex items-center space-x-4">
           
            <a
              href="mailto:blackatlasgroup@gmail.com"
              aria-label="Email Black Atlas"
              className="w-6 h-6 text-black/60 hover:text-black transition-colors group"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="group-hover:scale-110 transition-transform"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>

            
            <button className="font-medium text-sm bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition-all shadow-sm">
              Notify Me
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="flex items-center justify-center px-6 py-24">
        <div
          className="max-w-3xl w-full border border-black/5 rounded-3xl p-12 text-center 
                     opacity-0 animate-[fade-in_1s_ease-in-out_forwards]"
        >
          <span className="inline-block mb-4 text-2xl font-chamberi font-medium tracking-wide">
            black atlas
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Something Powerful
            <br />
            Is <span className="font-chamberi text-red-600">Coming Soon</span>
          </h1>

          <p className="text-black/70 max-w-xl mx-auto mb-10">
            We're working on a refined digital experience.
            Stay tuned.
          </p>

          <div className="flex justify-center mb-8">
            <div className="h-[2px] w-20 bg-red-600 rounded-full" />
          </div>

          {/* Phone */}
          <p className="text-black/40 text-sm tracking-wide">
            📞 +91 99616 89970
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs sm:text-sm text-black/50 pb-4 sm:pb-6">
        © {new Date().getFullYear()} Black Atlas. All rights reserved.
      </footer>
    </main>
  );
}
