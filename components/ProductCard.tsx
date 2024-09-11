
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="product-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    <Image src={product.thumbnail}  alt={product.title} width={500} height={500}  className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <Link href={`/products/${product.id}`}>
        <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500">
          View Product
        </button>
      </Link>
    </div>
  </div>
);

export default ProductCard;
