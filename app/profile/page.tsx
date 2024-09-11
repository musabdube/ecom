"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image"; 

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface UserProfile {
  name: string;
  email: string;
  cartItems: { product: Product }[];
  likedItems: { product: Product }[];
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load profile. Please try again.");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-center text-lg text-red-600">Error: {error}</p>;

  const { name, email, cartItems, likedItems } = profile || {};

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {/* User Info Section */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-2">User Info</h2>
        <p className="text-gray-700">Name: <span className="font-medium">{name}</span></p>
        <p className="text-gray-700">Email: <span className="font-medium">{email}</span></p>
      </div>

      {/* Liked Products Section */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Liked Products</h2>
        {likedItems && likedItems.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedItems.map(({ product }) => (
              <li key={product.id} className="border p-4 rounded-md shadow-md hover:shadow-lg">
                <Image
                  src={product.thumbnail}
                  alt={`${product.title} thumbnail`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no liked products yet.</p>
        )}
      </div>

      {/* Cart Items Section */}
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
        {cartItems && cartItems.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map(({ product }) => (
              <li key={product.id} className="border p-4 rounded-md shadow-md hover:shadow-lg">
                <Image
                  src={product.thumbnail}
                  alt={`Cart item thumbnail - ${product.title}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
