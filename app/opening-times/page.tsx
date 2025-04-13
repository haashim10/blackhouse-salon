"use client";

export default function OpeningTimes() {
  const hours = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 8:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 8:00 PM" },
    { day: "Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl uppercase mb-16">
          {/* Increased container width to fit the full text */}
          <div className="inline-block" style={{ width: "290px" }}>
            <span className="typing-4">Opening Times.</span>
          </div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            {hours.map((schedule, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <span className="text-lg uppercase">{schedule.day}</span>
                <span className="text-muted">{schedule.hours}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl uppercase">Holiday Hours</h2>
            <p className="text-muted">
              Please note that our opening times may vary during holidays.
              Follow us on social media or sign up for our newsletter to stay
              updated.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl uppercase">Location</h3>
              <p className="text-muted">
                123 Style Street
                <br />
                Huddersfield, HD1 1AA
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl uppercase">Contact</h3>
              <p className="text-muted">
                Phone: (01484) 123456
                <br />
                Email: info@blackhousesalon.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
