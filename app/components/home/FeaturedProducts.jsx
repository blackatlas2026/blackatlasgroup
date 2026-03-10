"use client"

import { useRef } from "react"
import ProductCard from "./ProductCard"
import Link from "next/link";

export default function FeaturedProducts({ products }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const cardWidth = container.firstChild?.offsetWidth || 300
    const gap = 24 // gap-6
    const scrollAmount = (cardWidth + gap) * 4

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-4">
            Featured Products
          </h2>
          <p className="text-black/70">
            Discover our best-selling products, trusted by our customers.
          </p>
        </div>

        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2
                       h-12 w-12 items-center justify-center rounded-full
                       border border-black/20 bg-white
                       hover:bg-rose-400 hover:text-white transition z-10"
          >
            ‹
          </button>

          {/* Scroll Container */}
          <div
  ref={scrollRef}
  className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-10 px-4 md:px-0"
  style={{ scrollPaddingLeft: '24px', scrollPaddingRight: '24px' }}
>
            {products.map(product => (
              <div
                key={product.id}
                className="min-w-[280px] md:min-w-[25%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2
                       h-12 w-12 items-center justify-center rounded-full
                       border border-black/20 bg-white
                       hover:bg-rose-400 hover:text-white transition z-10"
          >
            ›
          </button>

        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16">
            <Link
                href="/marketplace"
                className="flex items-center gap-3 border-2 border-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition"
              >
                SHOP ALL PRODUCTS
                <span className="h-6 w-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
                  →
                </span>
              </Link>
            </div>

      </div>
    </section>
  )
}
