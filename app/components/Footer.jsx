
'use client'
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    if (pathname.startsWith("/admin")) {
    return <div />; // empty div for admin routes
  }
  return (
    <footer className="bg-[#0e0e0e] text-white rounded-t-4xl">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="text-2xl font-semibold tracking-wider font-chamberi">
              black atlas
            </p>
            <p className="text-sm text-white/60 mt-0.5">
              Digital products & experiences
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm text-white/70">
            <a href="/services" className="hover:text-white transition">
              Services
            </a>
            <a href="/marketplace" className="hover:text-white transition">
              Marketplace
            </a>
            <a href="/careers" className="hover:text-white transition">
              Careers
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <p className="text-xs text-white/40 flex items-center justify-center space-x-1">
                <span>© {new Date().getFullYear()} Black Atlas </span>
                <span className="w-px h-3 bg-white/40" aria-hidden="true" />
                <a href="/terms" className="hover:text-white/80 transition-colors">Terms and Conditions</a>
            </p>


          {/* Socials */}
          <div className="flex space-x-4 text-white/50">
            

            {/* <a href="https://www.instagram.com/wayleaf.in" aria-label="Instagram" className="w-6 h-6 text-white/60 hover:text-white transition-colors">
                 <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.667-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.256-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </a> */}
        
            <a href=" https://www.linkedin.com/company/black-atlasgroup/" aria-label="LinkedIn" className="w-6 h-6 text-white/60 hover:text-white transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            </a>
            
            {/* <a href="https://twitter.com/yourhandle" aria-label="Twitter" className="w-6 h-6 text-white/60 hover:text-white transition-colors">
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
            </a> */}
          </div>


          {/* <div className="flex space-x-4 text-white/50">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
