// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import ProductDetail from '../../../components/ProductDetail';

async function getProductById(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  const product = await res.json();
  return product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return notFound();
  }

  // Pass product data to the ProductDetail component
  return <ProductDetail product={product} />;
}
