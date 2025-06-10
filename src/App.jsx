import {} from "react";
import Navbar from "./component/pages/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/pages/Home/Home";
import About from "./component/pages/About/About";
import Product from "./component/pages/Product/Product";
import Contact from "./component/pages/Contact/Contact";
import SingleProduct from "./component/pages/SingleProduct/SingleProduct";
import Footer from "./component/pages/Footer/Footer";
import SendEmail from "./component/pages/SendEmail/SendEmail";
import { CartProvider } from "./component/context/CartContext";
import Cart from "./component/pages/Cart/Cart";
import Account from "./component/pages/Account/Account";
import { AccountProvider } from "./component/context/AccountContext";
import Login from './component/pages/Login/Login';
import Registration from './component/pages/Registration/Registration';
import Profile from "./component/pages/Profile/Profile";
import Checkout from "./component/pages/Checkout/Checkout";
import Error from "./component/pages/Error/Error";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <div className="app">
  
        <AccountProvider >
      <CartProvider>
        <Navbar />
        <div className="main-con">
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<SingleProduct />} ></Route>
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/sendemail" element={<SendEmail />}></Route>
            <Route path="/cart" element={<Cart /> }></Route>
            <Route path="/myacc" element={<Account />}></Route>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/*" element={<Error />}></Route>
          </Routes>
        </div>
        <Footer />
        </CartProvider>
        </AccountProvider>
      </div>
    </Router>
  );
};

export default App;
