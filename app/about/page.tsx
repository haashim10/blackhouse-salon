"use client";

import Image from "next/image";

export default function About() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <section className="mb-20">
          <h1 className="text-4xl uppercase mb-16">About Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted">
                BLACKHOUSE SALON represents the pinnacle of modern hair artistry. Founded with a vision to redefine beauty standards, we combine technical excellence with artistic innovation.
              </p>
              <p className="text-lg text-muted">
                Our commitment to excellence extends beyond just haircuts and styling. We create experiences that transform not just your look, but how you feel about yourself.
              </p>
            </div>
            <div className="aspect-[4/5] relative">
              <Image
                src="/hairstyleimage1.jpg"
                alt="BLACKHOUSE SALON Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-20 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl uppercase">Our Vision</h3>
              <p className="text-muted">To create a space where artistry meets excellence, setting new standards in hair care and style.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl uppercase">Our Mission</h3>
              <p className="text-muted">Delivering exceptional hair services while nurturing confidence in every client who walks through our doors.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl uppercase">Our Values</h3>
              <p className="text-muted">Excellence, creativity, and personalized attention form the cornerstone of everything we do.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}