// components/ProductDetail.tsx
"use client";

import { useCart } from '../context/CartContext';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        
        {/* Product Info */}
        <div className="mt-8 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-2 text-lg text-gray-700">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-indigo-600">${product.price}</p>
          
          {/* Add to Cart Button */}
          <button
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition-all"
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
