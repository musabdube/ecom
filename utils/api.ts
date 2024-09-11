// utils/api.ts
// utils/api.ts
import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export async function GetProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>('https://api.example.com/products');
    return response.data || []; // Return an empty array if no data
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array on error to avoid undefined issue
  }
}
