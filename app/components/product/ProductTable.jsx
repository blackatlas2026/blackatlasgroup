
"use client";

import React from "react";



export default function ProductTable({ specs }) {
  return (
    <section className="max-w-4xl mx-auto my-32">
      <div className="bg-gray-50 p-10 md:p-16 rounded-[2.5rem] border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-12 text-slate-900 flex items-center gap-4">
          Technical Specifications
          <div className="h-[2px] flex-grow bg-gray-200 ml-4"></div>
        </h2>
        <div className="divide-y divide-gray-200">
          {specs.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 py-6">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-red-500 mb-2 md:mb-0">
                <span className="material-symbols-outlined text-base">check_circle</span>
                {spec.label}
              </div>
              <div className="text-lg font-medium text-slate-900">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
