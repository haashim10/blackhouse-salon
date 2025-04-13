"use client";

import Image from "next/image";
import { useState } from "react";

export default function About() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl uppercase mb-16">
          <div className="inline-block" style={{ width: "250px" }}>
            <span className="typing-animation typing-4">About Us.</span>
          </div>
        </h1>

        {/* Our Philosophy Section */}
        <section className="pb-20">
          <h2 className="text-3xl uppercase mb-12 text-center">
            Our Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl uppercase mb-4 font-medium">Our Vision</h3>
              <p className="text-muted">
                To create a space where artistry meets excellence, setting new
                standards in hair care and style. We envision a salon experience
                that's as unique as each client who visits us.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl uppercase mb-4 font-medium">
                Our Mission
              </h3>
              <p className="text-muted">
                Delivering exceptional hair services while nurturing confidence
                in every client who walks through our doors. We're committed to
                continuous education and staying ahead of industry trends.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl uppercase mb-4 font-medium">Our Values</h3>
              <p className="text-muted">
                Excellence, creativity, and personalized attention form the
                cornerstone of everything we do. We believe in sustainable
                practices, inclusive beauty, and creating a welcoming
                environment for all.
              </p>
            </div>
          </div>
        </section>

        {/* Team Highlight Section */}
        <section className="py-20 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl uppercase mb-12 text-center">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl uppercase mb-6 font-medium">
                Premium Services
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">✓</span>
                  <p className="text-muted">
                    Expert color techniques including balayage, highlights, and
                    color corrections
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">✓</span>
                  <p className="text-muted">
                    Precision cutting for all hair types and textures
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">✓</span>
                  <p className="text-muted">
                    Bespoke styling for special occasions and events
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">✓</span>
                  <p className="text-muted">
                    Hair treatments and therapies using premium products
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">✓</span>
                  <p className="text-muted">
                    Virtual consultations with AI-powered style recommendations
                  </p>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl uppercase mb-6 font-medium">
                Our Approach
              </h3>
              <p className="text-muted mb-6">
                At BLACKHOUSE, we believe every client deserves a personalized
                experience. Our approach combines:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">1.</span>
                  <p className="text-muted">
                    <strong>Consultation:</strong> We take time to understand
                    your lifestyle, preferences, and hair goals
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">2.</span>
                  <p className="text-muted">
                    <strong>Education:</strong> We guide you on the best
                    practices for maintaining your style
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">3.</span>
                  <p className="text-muted">
                    <strong>Execution:</strong> Our skilled stylists deliver
                    results that exceed expectations
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-black dark:text-white mr-3">4.</span>
                  <p className="text-muted">
                    <strong>Follow-up:</strong> We ensure you're completely
                    satisfied with your look
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Google Maps Location Section */}
        <section className="py-20 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl uppercase mb-12 text-center">Visit Us</h2>
          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2355.7731921106797!2d-1.7823573!3d53.6463871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDM4JzQ3LjAiTiAxwrA0Nic1Ni41Ilc!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-medium mb-4 uppercase">Address</h3>
              <p className="text-muted leading-relaxed">
                123 Main Street
                <br />
                Huddersfield, HD1 2AB
                <br />
                United Kingdom
              </p>
              <a
                href="https://goo.gl/maps/your-salon-location"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-black dark:text-white underline hover:no-underline"
              >
                Get Directions
              </a>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-medium mb-4 uppercase">Hours</h3>
              <div className="space-y-2 text-muted">
                <div className="flex justify-between">
                  <span>Monday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Tuesday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Wednesday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Thursday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-medium mb-4 uppercase">Contact</h3>
              <div className="space-y-4 text-muted">
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href="tel:01484123456" className="hover:underline">
                    (01484) 123-456
                  </a>
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:info@blackhousesalon.com"
                    className="hover:underline"
                  >
                    info@blackhousesalon.com
                  </a>
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <a
                    href="https://instagram.com/black_house_salon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @black_house_salon
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 border-t border-gray-200 dark:border-gray-800 text-center">
          <h2 className="text-3xl uppercase mb-6">
            Ready For Your Transformation?
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto mb-8">
            Experience the BLACKHOUSE difference. Our team is ready to help you
            discover your best look yet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/book"
              className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
            >
              Book Now
            </a>
            <a
              href="/virtual-consultation"
              className="bg-transparent border border-black text-black dark:border-white dark:text-white px-8 py-3 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
            >
              Virtual Consultation
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
