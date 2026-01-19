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
                    123 Elite Avenue, Fashion District,<br />
                    New York, NY 10001, United States
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
                  <p className="text-sm text-slate-500">+1 (555) 123-4567</p>
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
                  <p className="text-sm text-slate-500">contact@elitestore.com</p>
                  <p className="text-sm text-slate-500">support@elitestore.com</p>
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
                {['IG', 'FB', 'X'].map((item) => (
                  <div
                    key={item}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-400"
                  >
                    {item}
                  </div>
                ))}
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
                    className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
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
