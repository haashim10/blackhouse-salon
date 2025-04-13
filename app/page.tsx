"use client";

import Link from "next/link";
import Image from "next/image";
import IntegratedHeroAndServices from "./components/IntegratedHeroAndServices";
// Uncomment the following line only after confirming the component and image exist
// import VirtualConsultationPromo from "./components/VirtualConsultationPromo";

export default function Home() {
  return (
    <main className="pt-[20px]">
      {/* Integrated Hero and Services Showcase */}
      <IntegratedHeroAndServices />

      {/* Virtual Consultation Promo - uncomment when image is ready */}
      {/* <VirtualConsultationPromo /> */}

      {/* Original About Section - Kept as is */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl uppercase">
              Premium Services | Priced Fairly
            </h2>
            <p className="text-muted">
              Experience the art of hair styling with our expert team. We
              combine traditional techniques with modern aesthetics. We are
              constantly striving to exceed clients expectations with
              breathtaking colour and creative cutting.
            </p>
            <Link
              href="/book"
              className="inline-block border px-8 py-3 uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Book Appointment
            </Link>
          </div>
          <div className="aspect-[4/5] bg-accent/10 overflow-hidden relative w-4/5 mx-auto md:w-3/4">
            <Image
              src="/Gallery1.png"
              alt="Premium haircut service"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>
    </main>
  );
}