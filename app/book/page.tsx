export default function Book() {
  return (
    <main className="pt-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl uppercase mb-16">Book Appointment</h1>
        
        <form className="space-y-8">
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
            <label className="block uppercase text-sm">Service</label>
            <select className="w-full bg-transparent border p-4">
              <option>Select a service</option>
              <option>Haircut & Styling</option>
              <option>Color Treatment</option>
              <option>Hair Treatment</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <label className="block uppercase text-sm">Preferred Date</label>
            <input 
              type="date" 
              className="w-full bg-transparent border p-4"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full border p-4 uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
          >
            Request Appointment
          </button>
        </form>
      </div>
    </main>
  );
}