"use client";

const reviews = [
  {
    name: "Emma Thompson",
    rating: 5,
    text: "Absolutely amazing salon! Sarah did a fantastic job with my hair color. The attention to detail and professional service is outstanding.",
    date: "March 2024"
  },
  {
    name: "James Wilson",
    rating: 5,
    text: "Best salon in Huddersfield! The team is incredibly skilled and friendly. Michael transformed my hair completely.",
    date: "February 2024"
  },
  {
    name: "Sophie Clark",
    rating: 5,
    text: "Love the atmosphere and the results! The staff is very professional and the salon is beautiful. Highly recommend!",
    date: "January 2024"
  },
  {
    name: "David Brown",
    rating: 5,
    text: "Great experience from start to finish. The team really listens to what you want and delivers excellent results.",
    date: "January 2024"
  }
];

export default function Reviews() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl uppercase mb-16">Client Reviews</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl uppercase">{review.name}</h2>
                <span className="text-muted">{review.date}</span>
              </div>
              
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-muted">{review.text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://www.google.com/search?q=Black+House+Salon+Huddersfield+reviews" 
            target="_blank"
            rel="noopener noreferrer"
            className="border px-8 py-3 uppercase text-sm hover:bg-foreground hover:text-background transition-colors inline-block"
          >
            View More Reviews on Google
          </a>
        </div>
      </div>
    </main>
  );
}