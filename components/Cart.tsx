// components/Cart.tsx
'use client'
import { useState, useEffect } from 'react';
import { getCart } from '../utils/cart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    return setCartItems(getCart());
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
