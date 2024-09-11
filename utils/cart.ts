// utils/cart.ts
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export function getCart(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  
  export function addToCart(item: CartItem): void {
    const cart = getCart();
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  