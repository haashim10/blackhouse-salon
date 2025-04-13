"use client";

import React from "react";

const brandLogos = [
  "/Guy Tang.avif",
  "/Kevin Murphy.avif",
  "/Olaplex.avif",
  "/Pulp Riot.avif",
  "/Redkin.avif",
  "/Framar.avif",
];

export default function Affiliate() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl uppercase mb-16">
          {/* Increased container width to fit the full text */}
          <div className="inline-block" style={{ width: "243px" }}>
            <span className="typing-4">Our Brands.</span>
          </div>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center justify-center">
          {brandLogos.map((src, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform duration-300"
            >
              <img
                src={src}
                alt={`Brand ${index + 1}`}
                className="max-h-16 mx-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
