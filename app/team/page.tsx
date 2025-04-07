"use client";

import { useState } from "react";
import Image from "next/image";

const team = [
  {
    name: "Robbie",
    role: "Creative Director",
    bio: "Meet the owner and director of BLACK HOUSE salon. Robbies has a passion for cutting short hair on both men and women. Robbie takes pride in his creative colouring and is the go to guy for vivid colour. Robbie has spent the last 4 years teaching hairdressers privately and specialises in teaching short hair cutting and styling. You'll often hear Robbie having deep conversations with his clients where his chair can sometimes be mistaken for a therapists chair.",
    image: "/Robbie.jpg",
    specialties: ["Precision Cutting", "Editorial Styling", "Hair Transformations"],
    instagram: "@black_house_salon"
  },
  {
    name: "Chelsea",
    role: "Senior Stylist",
    bio: "Meet Chelsea, our in house transformation expert. If youre looking for a complete overhaul, whether that be a restyle, colour change or extensions, Chelsea has you covered. Chelsea's clients can't speak highly enough about not only the amazing hair she creates but also her friendly and fun personality.",
    image: "/Chelsea.jpg",
    specialties: ["Color Transformations", "Balayage", "Men's Grooming"],
    instagram: "@chelsealeighhair"
  },
  {
    name: "Gemma",
    role: "Color Specialist",
    bio: "Meet Gemma. Gemma has been with the team for over a year and at just 21 is producing incredible colour work. Gemma loves all things colour and in the time she has been at Black House, has already grown a loyal clientele from the Huddersfield area and beyond. We have loved watching Gemma grow as a stylist and seeing how busy she has become in such a short time is a testament to her ability. Have a look at her amazing reviews and her stunning work on her Instagram page.",
    image: "/Gemma.jpg",
    specialties: ["Blonding", "Creative Color", "Color Correction"],
    instagram: "@gemmalaurahair_"
  },
  {
    name: "Limara Jade",
    role: "Texture Expert",
    bio: "Meet Limara Jade, the skin care expert at Black House Salon, whose passion for skincare shines through her holistic approach to beauty and wellness. Limara believes in treating the skin as a reflection of overall health, combining cutting-edge techniques with natural therapies. She offers a range of specialised services including lymphatic drainage, buccal massage, dermaplaning, and microneedling. Each treatment is designed to rejuvenate and revitalize, helping clients achieve a radiant and healthy complexion. Limara’s dedication to her craft ensures that every client receives personalized care and exceptional results. ",
    image: "/LimmaraJade.jpg",
    specialties: ["Curly Hair", "Natural Texture", "Extensions"],
    instagram: "@limarajadefacialist"
  },
  {
    name: "Aisha",
    role: "Style Innovator",
    bio: "Meet Aisha. Aisha has 20 years experience in hairdressing having worked in some of the best salons in huddersfield over her career. Her passion for creating beautiful hair is only matched by her vibrant personality. What she can't do with hair really isn't worth doing. Aisha brings a wealth of knowledge and experience to our already incredible team but her passion really lies in curly hair. Her ability to colour cut and style curly hair is really unrivalled so if you're a curly girl looking for your perfect locks then look no further than Aisha.",
    image: "/Aisha.jpg",
    specialties: ["Avant-Garde Styling", "Precision Bob Cuts", "Asian Hair Textures"],
    instagram: "@black_house_salon"
  }
];

export default function Team() {
  const [selectedStylist, setSelectedStylist] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStylistChange = (index: number) => {
    if (index === selectedStylist) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedStylist(index);
      setIsTransitioning(false);
    }, 300);
  };

  const stylist = team[selectedStylist];

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl uppercase mb-6">Meet The Team</h1>
        <p className="text-muted max-w-3xl mb-16">Our talented stylists bring together diverse backgrounds and specialized skills to provide exceptional service tailored to your unique style.</p>
        
        {/* Stylist Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {team.map((member, index: number) => (
            <button
              key={index}
              onClick={() => handleStylistChange(index)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedStylist === index 
                  ? "bg-black text-white dark:bg-white dark:text-black scale-105" 
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {member.name}
            </button>
          ))}
        </div>
        
        {/* Featured Stylist */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {/* Stylist Image */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg shadow-lg">
            <Image
              src={stylist.image}
              alt={stylist.name}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Stylist Info */}
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl uppercase">{stylist.name}</h2>
              <p className="text-accent text-xl mt-1">{stylist.role}</p>
            </div>
            
            <p className="text-muted leading-relaxed">{stylist.bio}</p>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {stylist.specialties.map((specialty, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <a 
                href={`https://instagram.com/${stylist.instagram.substring(1)}`}
                target="_blank"
                rel="noopener noreferrer" 
                className="text-accent hover:underline flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {stylist.instagram}
              </a>
              
              <a 
                href="/book" 
                className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Book with {stylist.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
        
        {/* Team Grid - Small Preview */}
        <div className="mt-24 mb-16">
          <h2 className="text-2xl uppercase mb-8">Our Full Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {team.map((member, index: number) => (
              <div 
                key={index} 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedStylist === index ? 'ring-2 ring-black dark:ring-white ring-offset-2' : ''
                }`}
                onClick={() => handleStylistChange(index)}
              >
                <div className="aspect-square relative overflow-hidden rounded">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-center font-medium">{member.name}</p>
                <p className="text-xs text-center text-accent">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
