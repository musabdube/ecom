// app/cart/page.tsx
"use client";

import { useCart } from '../../context/CartContext';
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link href="/shop" className="text-indigo-600">Go to Shop</Link></p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border p-4 rounded">
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</p>

            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
