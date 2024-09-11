'use client'
import { useState, useEffect } from 'react';
import { getCart } from '../utils/cart';
import { CartItem } from '../types/CartItem'; // Adjust the import path as needed

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Specify the type here

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
