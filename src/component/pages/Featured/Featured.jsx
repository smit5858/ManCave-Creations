import { useEffect, useState } from 'react';
import productService from '../../services/productService';
import './Featured.css';

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products using productService
    productService.getProducts()
      .then(fetchedProducts => {
        console.log('Products fetched:', fetchedProducts);
        if (fetchedProducts.length > 0) {
          // Sort products by rating in descending order and take the top 4
          const topRatedProducts = fetchedProducts
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 2);
          setProducts(topRatedProducts);
        } else {
          setError('No products found');
        }
      })
      .catch(error => {
        setError('Product not found or error occurred');
        console.error('Error fetching products:', error.message);
      });
  }, []);

  return (
    <div className="featured">
      <div className="fea-title">
        <h1>Trending Clothes</h1>
      </div>
      <div className="fea-products">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {products.length > 0 ? (
          products.map((item) => (
            <div className="fea-product" key={item._id} onClick={() => window.location.href = `/product/${item._id}`}>
              <img src={`data:${item.images[0].contentType};base64,${item.images[0].data}`} alt={item.name} />
              <h2>{item.name}</h2>
              <p>₹ {item.price}.00</p>
              <i className="far fa-heart favorite"></i>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Featured;