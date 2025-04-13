// app/shop/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

// Updated product data
const productsData: Product[] = [
  {
    id: "product-1",
    name: "05 SHAPE",
    brand: "Unknown",
    category: "Hair Product",
    price: 13.75,
    description:
      "Professional styling product for flexible hold and natural shine.",
    features: ["Medium hold", "Natural finish", "Heat protection"],
    images: ["/shop-images/product-1.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-2",
    name: "4LISS OIL",
    brand: "Unknown",
    category: "Hair Oil",
    price: 15.95,
    description: "",
    features: [],
    images: ["/shop-images/product-2.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-3",
    name: "ALL PLAY",
    brand: "Unknown",
    category: "Hair Product",
    price: 20.95,
    description: "",
    features: [],
    images: ["/shop-images/product-3.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-4",
    name: "ANGEL MASQUE (RETAIL)",
    brand: "Unknown",
    category: "Hair Mask",
    price: 35,
    description: "",
    features: [],
    images: ["/shop-images/product-4.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-5",
    name: "ANGEL RINSE",
    brand: "Unknown",
    category: "Hair Rinse",
    price: 28,
    description: "",
    features: [],
    images: ["/shop-images/product-5.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-6",
    name: "ANGEL WASH (RETAIL)",
    brand: "Unknown",
    category: "Shampoo",
    price: 27,
    description: "",
    features: [],
    images: ["/shop-images/product-6.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-7",
    name: "ANTI FRIZZ MASK",
    brand: "Unknown",
    category: "Hair Mask",
    price: 15.95,
    description: "",
    features: [],
    images: ["/shop-images/product-7.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-8",
    name: "ANTI FRIZZ SHAMPOO",
    brand: "Unknown",
    category: "Shampoo",
    price: 15.95,
    description: "",
    features: [],
    images: ["/shop-images/product-8.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
  {
    id: "product-9",
    name: "ANTI GRAVITY",
    brand: "Unknown",
    category: "Hair Product",
    price: 27,
    description: "",
    features: [],
    images: ["/shop-images/product-9.jpg"],
    stock: 0,
    reviews: {
      rating: 0,
      count: 0,
    },
  },
];

// Extract unique categories from the products data
const uniqueCategories = [
  "All",
  ...Array.from(new Set(productsData.map((product) => product.category))),
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.price - b.price;
    } else if (sortOption === "price-high") {
      return b.price - a.price;
    } else if (sortOption === "rating") {
      return b.reviews.rating - a.reviews.rating;
    }
    // Default: featured or anything else
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">Hair Products</h1>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                } rounded-full transition`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="sort"
            className="mr-2 text-sm text-gray-600 dark:text-gray-300"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 dark:text-white focus:border-black focus:ring-1 focus:ring-black dark:focus:border-white dark:focus:ring-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Link
            href={`/shop/product/${product.id}`}
            key={product.id}
            className="group"
          >
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition">
              {/* Product Image */}
              <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 relative">
                <Image
                  src={`/shop-images/${product.id}.jpg`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium group-hover:underline">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.brand}
                    </p>
                  </div>
                  {product.reviews.rating > 0 && (
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                        {product.reviews.rating}
                      </span>
                    </div>
                  )}
                </div>

                {product.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to cart functionality here
                    }}
                    className="bg-black text-white dark:bg-white dark:text-black text-sm px-3 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No products found in this category.
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
