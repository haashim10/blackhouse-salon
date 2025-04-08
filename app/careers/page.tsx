"use client";

const positions = [
  {
    title: "Senior Hair Stylist",
    type: "Full-time",
    description: "We're seeking an experienced hair stylist with a strong portfolio and passion for creating trending styles."
  },
  {
    title: "Color Specialist",
    type: "Full-time",
    description: "Join our team as a color specialist with expertise in modern coloring techniques and trends."
  },
  {
    title: "Junior Stylist",
    type: "Full-time",
    description: "Great opportunity for a newly qualified stylist to grow and develop their skills with our expert team."
  }
];

export default function Careers() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl uppercase mb-16">Careers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl uppercase">Join Our Team</h2>
            <p className="text-muted">
              At BLACKHOUSE SALON, we&apos;re always looking for talented individuals who share our passion for creativity and excellence in hair styling.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl uppercase">Benefits</h3>
              <ul className="space-y-2 text-muted">
                <li>• Competitive salary and commission</li>
                <li>• Ongoing training and development</li>
                <li>• Professional product allowance</li>
                <li>• Flexible scheduling</li>
                <li>• Career growth opportunities</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-2xl uppercase">Open Positions</h2>
            {positions.map((position, index) => (
              <div key={index} className="border-b pb-6">
                <h3 className="text-xl uppercase mb-2">{position.title}</h3>
                <p className="text-accent mb-3">{position.type}</p>
                <p className="text-muted mb-4">{position.description}</p>
                <button className="border px-6 py-2 uppercase text-sm hover:bg-foreground hover:text-background transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}