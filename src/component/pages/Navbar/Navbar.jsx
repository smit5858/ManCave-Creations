import { useState } from 'react';
import Logo from '../../../assets/Logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { TfiHome } from 'react-icons/tfi';
import { RiContactsBook3Line } from "react-icons/ri";
import { Info, Shirt } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAccount } from '../../context/AccountContext';
import { UserRound, UserRoundCheck } from 'lucide-react';
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const { isLoggedIn } = useAccount();
  const navigate = useNavigate();

  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate('/profile'); 
    } else {
      navigate('/myacc'); 
    }
  };

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">
          <img src={Logo} alt="Mancave Creation logo" className="logo" />
        </Link>
      </div>

      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`nav-link ${isMenuOpen ? 'show' : ''}`}>
        <ul onClick={closeMenu}>
          <li><Link to="/">{isMenuOpen ? <TfiHome /> : "Home"}</Link></li>
          <li><Link to="/about">{isMenuOpen ? <Info /> : "About"}</Link></li>
          <li><Link to="/product">{isMenuOpen ? <Shirt /> : "Product"}</Link></li>
          <li><Link to="/contact">{isMenuOpen ? <RiContactsBook3Line /> : "Contact"}</Link></li>
         
        </ul>
      </div>

      <div className="icons">
        <div
          className="account-icon"
          aria-label="Account"
          onClick={handleAccountClick}
        >
          {isLoggedIn ?   <UserRoundCheck />: <UserRound strokeWidth={1.5} />} 
          {/* <UserRound /> */}
        </div>
        <div className="bag-icon" aria-label="Shopping Bag">
          <LiaShoppingBagSolid onClick={() => navigate('/cart')} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
