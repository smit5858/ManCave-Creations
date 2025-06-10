import { Link } from "react-router-dom";
import './Error.css';

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1>Oops!</h1>
        <h2>Something went wrong at ManCave Creations</h2>
        <p className="error-message">
          {/* Error message would appear here */}
        </p>
        <p className="error-description">
          We apologize for the inconvenience. While we fix this issue, 
          why not browse our amazing collection of men's products?
        </p>
        <div className="error-actions">
          <Link to="/" className="error-button">
            Return to Home
          </Link>
          <Link to="/product" className="error-button">
            View Products
          </Link>
          <Link to="/contact" className="error-button">
            Contact Support
          </Link>
        </div>
        <div className="error-logo">
          <h3>ManCave Creations</h3>
          <p>Premium Products for Men</p>
        </div>
      </div>
    </div>
  )
}

export default Error;