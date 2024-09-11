"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-indigo-600">
            <Link href="/">MyStore</Link>
          </div>

          {/* Links for large screens */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/categories" className="text-gray-700 hover:text-indigo-600">
              Categories
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-indigo-600">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </Link>
          </nav>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link href="/categories" className="text-gray-700 hover:text-indigo-600">
                Categories
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-indigo-600">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-indigo-600">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
