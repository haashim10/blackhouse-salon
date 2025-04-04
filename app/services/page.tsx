import Link from "next/link";

export default function Services() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl uppercase mb-16">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              title: "Haircut & Styling",
              price: "From $50",
              description: "Expert cutting and styling tailored to your preferences"
            },
            {
              title: "Color Treatment",
              price: "From $80",
              description: "Professional coloring services using premium products"
            },
            {
              title: "Hair Treatment",
              price: "From $60",
              description: "Revitalizing treatments for healthy, beautiful hair"
            }
          ].map((service, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-[4/5] bg-accent/10"/>
              <h2 className="text-2xl uppercase">{service.title}</h2>
              <p className="text-muted">{service.description}</p>
              <p className="text-lg">{service.price}</p>
              <Link 
                href="/book" 
                className="inline-block border px-8 py-3 uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}