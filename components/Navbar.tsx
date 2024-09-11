'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';  // Import useSession and signOut

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const { data: session } = useSession();  // Get session data using useSession

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    signOut();  // Use NextAuth's signOut function to log out
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo or Site Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Barmobile
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="text-gray-900 hover:text-indigo-600">
              Home
            </Link>
            <Link href="/shop" className="text-gray-900 hover:text-indigo-600">
              Shop
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-indigo-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-indigo-600">
              Contact
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="text-gray-900 hover:text-indigo-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m4 8v5a2 2 0 002 2h8a2 2 0 002-2v-5M7 13h10m-2 5a2 2 0 11-4 0" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Conditionally Render Auth Links */}
            {session ? (
              <>
                <Link href="/profile" className="text-gray-900 hover:text-indigo-600 px-4 py-2">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-900 hover:text-red-600 px-4 py-2"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-900 hover:text-indigo-600">
                  Login
                </Link>
                <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600">
              Home
            </Link>
            <Link href="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600">
              Shop
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600">
              Contact
            </Link>
            <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600">
              Cart
            </Link>

            {/* Conditionally Render Mobile Auth Links */}
            {session ? (
              <>
                <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600">
                  Login
                </Link>
                <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
