"use client";

import { useState } from "react";
import ConsultationForm from "../components/ConsultationForm";
import LoadingScreen from "../components/LoadingScreen";
import ResultsGallery from "../components/ResultsGallery";
import Image from "next/image";

interface ConsultationFormData {
  gender: 'male' | 'female';
  hairLength: 'short' | 'medium' | 'long' | 'very-long';
  hairColor: 'black' | 'dark-brown' | 'medium-brown' | 'light-brown' | 'dark-blonde' | 'medium-blonde' | 'light-blonde' | 'platinum' | 'red' | 'copper' | 'auburn' | 'blue' | 'pink' | 'purple' | 'green';
  hairStyle: 'straight' | 'wavy' | 'curly' | 'coily';
  volume: string;
  additionalDetails?: string;
  referenceImageURL?: string;
  referenceImageBase64?: string;
}

export default function VirtualConsultationPage() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [results, setResults] = useState<string[]>([]);
  const [consultationData, setConsultationData] = useState<ConsultationFormData | null>(null);

  const handleFormSubmit = async (formData: ConsultationFormData) => {
    setConsultationData(formData);
    setStep("loading");

    try {
      const response = await fetch("/api/generate-hairstyle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate hairstyles");
      }

      const data = await response.json();
      setResults(data.images);
      setStep("results");
    } catch (error) {
      console.error("Error generating hairstyles:", error);
      alert(
        "Sorry, we encountered an error generating your hairstyles. Please try again."
      );
      setStep("form");
    }
  };

  const handleStartOver = () => {
    setStep("form");
    setResults([]);
  };

  return (
    <main className="pt-24 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl uppercase text-center font-light tracking-wide mb-2">
          Virtual Hair Consultation
        </h1>
        <p className="text-center text-muted mb-12 max-w-3xl mx-auto">
          Describe your dream hairstyle and our AI will generate personalized
          style options for you. Experiment with different looks before your
          appointment.
        </p>

        <div className="mt-8">
          {step === "form" && <ConsultationForm onSubmit={handleFormSubmit} />}

          {step === "loading" && (
            <LoadingScreen consultation={consultationData} />
          )}

          {step === "results" && consultationData && (
            <ResultsGallery
              results={results}
              consultation={consultationData}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        {step === "form" && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src="/icons/customize-icon.svg"
                  alt="Customize icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Customize Your Look</h3>
              <p className="text-muted">
                Select from our range of style options or describe your perfect
                hairstyle.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src="/icons/visualize-icon.svg"
                  alt="Visualize icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">
                See It Before You Commit
              </h3>
              <p className="text-muted">
                Our AI generates realistic images of how different styles might
                look.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src="/icons/book-icon.svg"
                  alt="Book icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">
                Book Your Transformation
              </h3>
              <p className="text-muted">
                Find a style you love? Schedule an appointment with our expert
                stylists.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
