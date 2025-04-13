"use client";

export default function Contact() {
  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl uppercase mb-16">
          {/* Increased container width to fit the full text */}
          <div className="inline-block" style={{ width: "243px" }}>
            <span className="typing-4">Contact Us.</span>
          </div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl uppercase">Visit Us</h2>
              <p className="text-muted">
                123 Style Street
                <br />
                Huddersfield, HD1 1AA
                <br />
                United Kingdom
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl uppercase">Contact Info</h2>
              <p className="text-muted">
                Phone: (01484) 123456
                <br />
                Email: info@blackhousesalon.com
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl uppercase">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  className="text-muted hover:text-accent"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  className="text-muted hover:text-accent"
                >
                  Facebook
                </a>
              </div>
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
              <label className="block uppercase text-sm">Message</label>
              <textarea
                className="w-full bg-transparent border p-4 h-32"
                placeholder="Your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full border p-4 uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
