"use client";

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Simulate fetching products (you can replace this with an API call)
  useEffect(() => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 29.99, image: '/product1.jpg' },
      { id: 2, name: 'Product 2', price: 49.99, image: '/product2.jpg' },
      { id: 3, name: 'Product 3', price: 19.99, image: '/product3.jpg' },
    ];
    setProducts(mockProducts);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
