"use client";

export default function Affiliate() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl uppercase mb-16">Affiliate Program</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl uppercase">Join Our Network</h2>
            <p className="text-muted">
              Partner with BLACKHOUSE SALON and become part of our exclusive network of beauty influencers and professionals.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl uppercase">Benefits</h3>
              <ul className="space-y-2 text-muted">
                <li>• 20% commission on referred clients</li>
                <li>• Exclusive access to salon events</li>
                <li>• Professional development opportunities</li>
                <li>• Monthly product allowance</li>
              </ul>
            </div>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-4">
              <label className="block uppercase text-sm">Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border p-4"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block uppercase text-sm">Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border p-4"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block uppercase text-sm">Social Media Links</label>
              <input 
                type="text" 
                className="w-full bg-transparent border p-4"
                placeholder="Instagram/TikTok/YouTube URLs"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full border p-4 uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}