
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export default async function Home() {
  // Fetching products data from the API
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  const products: Product[] = data.products; // Typing the products array

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/hero-image.jpg")' }}>
        <div className="hero-overlay bg-opacity-60 bg-black h-full w-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-xl mb-4">Explore the best products and deals of the season</p>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg mr-4">
              Shop Now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-600">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Displaying the first 4 products as featured */}
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="products py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Displaying all products */}
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
