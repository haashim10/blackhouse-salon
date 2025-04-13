// app/api/generate-hairstyle/route.ts
import { NextResponse } from "next/server";

// You would store this in an environment variable in a real app
const STABLE_DIFFUSION_API_KEY =
  "ICr09sMvhtaFtrjnoPUcY7vHZfkKw6ukOkRxPtqjdEb1LfpPh2j03vTxdh3r";
const API_URL = "https://modelslab.com/api/v6/realtime/text2img";

export async function POST(request: Request) {
  try {
    // Get form data from the request
    const formData = await request.json();

    // Extract all the parameters
    const {
      gender,
      hairLength,
      hairColor,
      hairStyle,
      volume,
      additionalDetails,
      referenceImageBase64,
      referenceImageURL,
    } = formData;

    // Create a prompt for the Stable Diffusion API
    let promptParts = [
      `portrait photograph of a ${gender === "female" ? "woman" : "man"}`,
      `with ${hairLength} ${hairColor} ${hairStyle} hair`,
      volume ? `with ${volume} volume` : "",
      additionalDetails ? additionalDetails : "",
      `professional salon photoshoot, high quality, detailed`,
      `soft studio lighting, neutral background, fashion magazine style`,
    ];

    // Join the parts to create the prompt
    const prompt = promptParts.filter((part) => part.trim() !== "").join(", ");

    // Negative prompt to avoid common issues
    const negativePrompt =
      "cartoon, anime, illustration, painting, drawing, artwork, 3d render, blurry, deformed, mutated, bad anatomy, extra limbs, disfigured, ugly, low quality, oversaturated";

    // Prepare the payload for the Stable Diffusion API
    const payload = {
      key: STABLE_DIFFUSION_API_KEY,
      prompt: prompt,
      negative_prompt: negativePrompt,
      width: 512,
      height: 768, // Portrait orientation works better for hairstyles
      samples: 4, // Generate 4 images
      num_inference_steps: 40, // Higher steps = more quality but slower
      guidance_scale: 7.5, // How closely to follow the prompt
      safety_checker: true,
      seed: null, // Random seed for variety
      webhook: null,
      track_id: null,
    };

    // If reference image is provided, include it (this would require different API setup - init_image)
    if (referenceImageBase64 || referenceImageURL) {
      console.log(
        "Reference image provided, but not supported in this implementation"
      );
      // In a full implementation, you would use img2img endpoint instead or handle accordingly
    }

    console.log("Sending request to Stable Diffusion API with prompt:", prompt);

    // In development/testing, you might want to use mock data instead of calling the API
    // For a production implementation, uncomment the following code:

    /*
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Stable Diffusion API error:', errorData);
      throw new Error('Failed to generate images');
    }
    
    const data = await response.json();
    
    // The API response contains base64 encoded images
    const generatedImages = data.output;
    */

    // For development/testing, return mock image URLs
    // In production, you would use the actual images from the API
    const mockImageUrls = [
      "/mock-results/hairstyle-result-1.jpg",
      "/mock-results/hairstyle-result-2.jpg",
      "/mock-results/hairstyle-result-3.jpg",
      "/mock-results/hairstyle-result-4.jpg",
    ];

    return NextResponse.json({
      success: true,
      images: mockImageUrls,
      // In production: images: generatedImages
    });
  } catch (error) {
    console.error("Error generating hairstyles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate hairstyles" },
      { status: 500 }
    );
  }
}
