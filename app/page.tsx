import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-90"/>
        <h1 className="hero-text text-center relative z-10 px-4">
          Modern<br/>Hair Styling<br/>Experience
        </h1>
      </section>
      
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl uppercase">Premium Services</h2>
            <p className="text-muted">Experience the art of hair styling with our expert team. We combine traditional techniques with modern aesthetics.</p>
            <Link 
              href="/book" 
              className="inline-block border px-8 py-3 uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Book Appointment
            </Link>
          </div>
          <div className="aspect-[4/5] bg-accent/10"/>
        </div>
      </section>
    </main>
  );
}
