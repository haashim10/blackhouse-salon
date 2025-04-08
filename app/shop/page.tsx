// app/shop/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';

// Sample product data (will be fetched from API in production)
const productsData: Product[] = [
  {
    id: 'product-1',
    name: 'Volumizing Shampoo',
    brand: 'BlackHouse',
    category: 'Shampoo',
    price: 24.99,
    description: 'Add volume and life to your hair with our professional volumizing shampoo.',
    features: ['For all hair types', 'Sulfate-free', 'Paraben-free'],
    images: ['/images/products/shampoo-1.jpg'],
    stock: 15,
    reviews: {
      rating: 4.8,
      count: 24
    }
  },
  {
    id: 'product-2',
    name: 'Repair Conditioner',
    brand: 'BlackHouse',
    category: 'Conditioner',
    price: 26.99,
    description: 'Restore and repair damaged hair with our intensive conditioning treatment.',
    features: ['Deep conditioning', 'Repair formula', 'Color safe'],
    images: ['/images/products/conditioner-1.jpg'],
    stock: 12,
    reviews: {
      rating: 4.7,
      count: 18
    }
  },
  {
    id: 'product-3',
    name: 'Styling Pomade',
    brand: 'BlackHouse',
    category: 'Styling',
    price: 22.99,
    description: 'Medium hold pomade for classic styles with a natural finish.',
    features: ['Medium hold', 'Matte finish', 'Water-based'],
    images: ['/images/products/pomade-1.jpg'],
    stock: 20,
    reviews: {
      rating: 4.9,
      count: 32
    }
  },
  {
    id: 'product-4',
    name: 'Argan Oil Treatment',
    brand: 'BlackHouse',
    category: 'Treatment',
    price: 34.99,
    description: 'Luxury hair oil that nourishes and adds shine without weighing hair down.',
    features: ['Lightweight formula', 'Heat protection', 'Anti-frizz'],
    images: ['/images/products/oil-1.jpg'],
    stock: 8,
    reviews: {
      rating: 4.6,
      count: 15
    }
  },
  {
    id: 'product-5',
    name: 'Texture Spray',
    brand: 'BlackHouse',
    category: 'Styling',
    price: 19.99,
    description: 'Create effortless texture and volume with our salon-quality spray.',
    features: ['Buildable texture', 'Light hold', 'Beach waves'],
    images: ['/images/products/spray-1.jpg'],
    stock: 18,
    reviews: {
      rating: 4.5,
      count: 21
    }
  },
  {
    id: 'product-6',
    name: 'Scalp Treatment',
    brand: 'BlackHouse',
    category: 'Treatment',
    price: 29.99,
    description: 'Soothing scalp treatment that promotes healthy hair growth.',
    features: ['Cooling sensation', 'Removes buildup', 'Balances oils'],
    images: ['/images/products/treatment-1.jpg'],
    stock: 10,
    reviews: {
      rating: 4.8,
      count: 12
    }
  }
];

// Product categories
const categories = ['All', 'Shampoo', 'Conditioner', 'Styling', 'Treatment'];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory);
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') {
      return a.price - b.price;
    } else if (sortOption === 'price-high') {
      return b.price - a.price;
    } else if (sortOption === 'rating') {
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
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } rounded-full transition`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
                          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md px-3 py-1.5 bg-white focus:border-black focus:ring-1 focus:ring-black"
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
        {sortedProducts.map(product => (
          <Link 
            href={`/shop/product/${product.id}`} 
            key={product.id}
            className="group"
          >
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              {/* Product Image */}
              <div className="w-full h-64 bg-gray-100 relative">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {/* In production, use actual product images */}
                  <span>Product Image</span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium group-hover:underline">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{product.reviews.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to cart functionality here
                    }}
                    className="bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800 transition"
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
          <p className="text-gray-500 mb-4">No products found in this category.</p>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;