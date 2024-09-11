'use client'; // Add this to make the component a Client Component

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import '../styles/globals.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrapping the app with SessionProvider */}
        <SessionProvider>
          <CartProvider>
            <Navbar /> {/* Make sure Navbar can access session */}
            <Header />
            <main>{children}</main>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

