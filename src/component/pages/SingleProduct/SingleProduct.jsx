import { useState, useEffect } from 'react';
import productService from '../../services/productService';
import './SingleProduct.css';
import { ChevronRight, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showCareGuide, setShowCareGuide] = useState(false);

  const { dispatch } = useCart();

  useEffect(() => {
    productService
      .getProducts()
      .then((fetchedProducts) => {
        const foundProduct = fetchedProducts.find((item) => item._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.log('Product not found');
        }
      })
      .catch(() => {
        console.log('Error while fetching products');
      });
  }, [id]);

  const toggleDescription = () => setShowDescription((prev) => !prev);
  const toggleMaterials = () => setShowMaterials((prev) => !prev);
  const toggleCareGuide = () => setShowCareGuide((prev) => !prev);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setShowSizes(false);
  };

  const toggleSizeOptions = () => {
    setShowSizes(!showSizes);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      
      toast.info('Please select a size before adding to cart.');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        size: selectedSize,
        quantity: 1,
      },
    });

    
    toast.success('Product added to cart!');
  };

  const handleServicesMSG = () => {
    window.open("https://wa.me/918758422023?text=Hello%20ManCave%20Creation%2C%20I%20would%20love%20to%20know%20about%20"+product.name+".%20Could%20you%20connect%20me%20to%20your%20Digital%20Concierge%3F", "_blank");
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SingleProduct">
      <div className="sin-pro overflow">
        {product.images.map((image, index) => (
          <div key={index} className="img">
            <img 
            // src={image}
            src={`data:${image.contentType};base64,${image.data}`} 
            alt={product.name} />
          </div>
        ))}
      </div>
      <div className="sin-pro sticky">
        <div className="pro-name">{product.name}</div>
        <div className="pro-price">
          ₹{product.price}.00 <p>(M.R.P. incl. of all taxes)</p>
        </div>
        <div className="pro-size">
          <span onClick={toggleSizeOptions}>
            Sizes {selectedSize && `: ${selectedSize}`} <ChevronRight />
          </span>
          {showSizes && (
            <div className="sizes-list">
              {product.size.map((item, index) => (
                <div key={index} className="size-btn">
                  <button
                    className={selectedSize === item ? 'selected-size' : ''}
                    onClick={() => handleSizeClick(item)}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pro-buy">
          <button className="ser-btn" onClick={handleServicesMSG}>Contact Concierge Services</button>
          <button className="buy-btn" onClick={handleAddToCart}>
            Check availability in store
          </button>
        </div>
        <hr className="hr" />
        <div className="pro-des">
          <div className="text">Description</div>
          <div className="plus-icon" onClick={toggleDescription}>
            <Plus />
          </div>
        </div>
        {showDescription && (
          <div className="pro-des-text">{product.description}</div>
        )}
        <hr className="hr" />
        <div className="pro-mat">
          <div className="text">Materials</div>
          <div className="plus-icon" onClick={toggleMaterials}>
            <Plus />
          </div>
        </div>
        {showMaterials && (
          <div className="pro-des-text">{product.material}</div>
        )}
        <hr className="hr" />
        <div className="pro-care">
          <div className="text">Care guide</div>
          <div className="plus-icon" onClick={toggleCareGuide}>
            <Plus />
          </div>
        </div>
        {showCareGuide && (
          <div className="pro-des-text">{product.care_guide}</div>
        )}
        <hr className="hr" />
      </div>
    </div>
  );
};

export default SingleProduct;