'use client';

export default function ContactUs() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Contact <span className="text-red-600">Us</span>
          </h1>
          <p className="mt-2 max-w-xl text-slate-500">
            Have a question about a product, shipping, or our brands? Our elite support
            team is here to assist you 24/7.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  📍
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Our Office</p>
                  <p className="text-sm text-slate-500">
                    TC 16/585, Ayodhya, Kottukal,<br /> Balaramapuram, Thiruvananthapuram, 695501
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  📞
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Phone Number</p>
                  <p className="text-sm text-slate-500">+91 996 168 9970</p>
                  <p className="text-xs text-slate-400">
                    Mon–Fri from 9am to 6pm
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  ✉️
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Email Address</p>
                  <p className="text-sm text-slate-500">blackatlasgroup@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-slate-200" />

            {/* Social */}
            <div>
              <p className="mb-4 font-semibold text-slate-900">
                Follow Our Journey
              </p>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-900 hover:bg-slate-600 hover:text-white  transition-colors">
                    <a href="https://instagram.com/black-atlas" aria-label="Instagram" className="w-6 h-6 ">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.667-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.256-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-900 hover:bg-slate-600 hover:text-white  transition-colors">
                    <a href="https://linkedin.com/company/black-atlas" aria-label="LinkedIn" className="w-6 h-6 ">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-900 hover:bg-slate-600 hover:text-white  transition-colors">
                    <a href="https://twitter.com/yourhandle" aria-label="Twitter" className="w-6 h-6">
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
            </a>
                </div>
              </div>
            </div>

            
          </div>

          {/* Right Panel (Form) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <form className="space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/40"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/40"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/40"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your inquiry in detail..."
                  className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500/40 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
              >
                Send Message →
              </button>

              <p className="text-center text-xs text-slate-400">
                By sending this message, you agree to our{' '}
                <span className="underline">Privacy Policy</span>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
