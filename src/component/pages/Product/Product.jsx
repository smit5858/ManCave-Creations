import { useEffect, useState } from 'react';
import productService from '../../services/productService'; 
import './Product.css';
import { Settings2 } from 'lucide-react';

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [onFilterOpen, setOnFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    // Fetch products using productService
    productService.getProducts()
      .then(fetchedProducts => {
        console.log('Products fetched:', fetchedProducts);
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          setError('No products found');
        }
      })
      .catch(error => {
        setError('Product not found or error occurred');
        console.error('Error fetching products:', error.message);
      });
  }, []);

  const toggleFilter = () => {
    setOnFilterOpen(!onFilterOpen);
  };

  const closeMenu = () => {
    setOnFilterOpen(false);
  };

  const handleFilterSelect = (category) => {
    setSelectedFilter(category);
    closeMenu();
  };

  // Extract unique categories from products
  const uniqueCategories = [...new Set(products.map(item => item.category))];

  const removeFilter = () => {
    setSelectedFilter('');
  };

  return (
    <div className="product-container">
      <div className="filters" onClick={toggleFilter}>
        Filters <Settings2 />
        {onFilterOpen && uniqueCategories.length > 0 && (
          <div className="filter-menu">
            {uniqueCategories.map((category) => (
              <div key={category} className="filter" onClick={() => handleFilterSelect(category)}>
                <p>{category}</p>
              </div>
            ))}
            <button className="clr-btn" onClick={removeFilter}>Clear</button>
          </div>
        )}
      </div>

      <div className="products">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {products.length > 0 ? (
          products
            .filter(item => !selectedFilter || item.category === selectedFilter)
            .map((item) => (
              <div key={item._id} className="product" onClick={() => window.location.href = `/product/${item._id}`}>
                <img
                // src={item.images[0]}
                src={`data:${item.images[0].contentType};base64,${item.images[0].data}`}
                 alt={item.name} />
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
}

export default Product;
