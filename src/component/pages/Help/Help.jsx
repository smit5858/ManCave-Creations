import { useState } from "react";
import { FaHeadset, FaTools, FaRegStar, FaTshirt,  FaBox, FaGift } from "react-icons/fa";
import "./Help.css";

const Help = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="help-container">
      <h1 className="help-title">Welcome to ManCave Creations Help Center</h1>
      <p className="help-description">
        At ManCave Creations, we offer luxury clothing designed exclusively for men. Our brand focuses on providing high-quality, stylish apparel that enhances your personal style and confidence. From tailored suits to casual wear, we are committed to offering you a premium shopping experience. Explore our FAQs to find answers to your questions about our products and services.
      </p>

      <div className="help-categories">
        <div className="help-category">
          <FaHeadset className="category-icon" />
          <h2 className="help-category-title">Customer Service</h2>
          <ul>
            <li onClick={() => toggleFaq(0)} className="faq-item">How can I reach customer support?</li>
            <li onClick={() => toggleFaq(1)} className="faq-item">What are the customer service hours?</li>
            <li onClick={() => toggleFaq(2)} className="faq-item">Can I track my support request?</li>
          </ul>
          {faqOpen === 0 && <p className="faq-answer">You can reach our customer support via email or phone. Visit our contact page for more details.</p>}
          {faqOpen === 1 && <p className="faq-answer">Our customer service hours are from 9 AM to 8 PM, Monday to Sunday.</p>}
          {faqOpen === 2 && <p className="faq-answer">Yes, you can track your support request through your account dashboard.</p>}
        </div>

        <div className="help-category">
          <FaTools className="category-icon" />
          <h2 className="help-category-title">After-Sales Support</h2>
          <ul>
            <li onClick={() => toggleFaq(3)} className="faq-item">How do I claim warranty service?</li>
            <li onClick={() => toggleFaq(4)} className="faq-item">What should I do if my product is defective?</li>
            <li onClick={() => toggleFaq(5)} className="faq-item">How can I schedule a repair or alteration?</li>
          </ul>
          {faqOpen === 3 && <p className="faq-answer">To claim warranty service, please contact us with your purchase details and product information.</p>}
          {faqOpen === 4 && <p className="faq-answer">If your product is defective, please reach out to our support team within the warranty period for assistance.</p>}
          {faqOpen === 5 && <p className="faq-answer">You can schedule a repair or alteration by contacting our customer service or visiting a store location.</p>}
        </div>

        <div className="help-category">
          <FaRegStar className="category-icon" />
          <h2 className="help-category-title">Online Services</h2>
          <ul>
            <li onClick={() => toggleFaq(6)} className="faq-item">How to place an order online?</li>
            <li onClick={() => toggleFaq(7)} className="faq-item">What payment methods are accepted?</li>
            <li onClick={() => toggleFaq(8)} className="faq-item">How can I check my order status?</li>
          </ul>
          {faqOpen === 6 && <p className="faq-answer">To place an order, browse our collection, add to cart, and follow the checkout process.</p>}
          {faqOpen === 7 && <p className="faq-answer">We accept various payment methods including credit cards, PayPal, and bank transfers.</p>}
          {faqOpen === 8 && <p className="faq-answer">You can check your order status in the &apos;My Orders&apos; section of your account.</p>}
        </div>

        <div className="help-category">
          <FaTshirt className="category-icon" />
          <h2 className="help-category-title">Product Care & Sizing</h2>
          <ul>
            <li onClick={() => toggleFaq(9)} className="faq-item">How do I care for my garments?</li>
            <li onClick={() => toggleFaq(10)} className="faq-item">What sizing should I choose?</li>
            <li onClick={() => toggleFaq(11)} className="faq-item">Can I get my clothes tailored?</li>
          </ul>
          {faqOpen === 9 && <p className="faq-answer">To ensure your garments last, follow the care instructions on the labels. For delicate fabrics, dry clean when necessary.</p>}
          {faqOpen === 10 && <p className="faq-answer">We provide a detailed size chart on each product page. If you’re unsure, feel free to contact us for sizing assistance.</p>}
          {faqOpen === 11 && <p className="faq-answer">Yes, we offer tailoring services for select garments. Contact our support team for more details.</p>}
        </div>

        <div className="help-category">
          <FaBox className="category-icon" />
          <h2 className="help-category-title">Product Issues</h2>
          <ul>
            <li onClick={() => toggleFaq(12)} className="faq-item">What should I do if my item doesn’t fit?</li>
            <li onClick={() => toggleFaq(13)} className="faq-item">How can I return a product?</li>
            <li onClick={() => toggleFaq(14)} className="faq-item">What if my product doesn’t match the description?</li>
          </ul>
          {faqOpen === 12 && <p className="faq-answer">If your item doesn’t fit, please refer to our return policy and exchange the product for the correct size.</p>}
          {faqOpen === 13 && <p className="faq-answer">To return a product, please refer to our return policy on the website and follow the instructions.</p>}
          {faqOpen === 14 && <p className="faq-answer">If your product does not match the description, please contact us within 30 days for a resolution.</p>}
        </div>

        <div className="help-category">
          <FaGift className="category-icon" />
          <h2 className="help-category-title">Gift Cards & Exclusive Offers</h2>
          <ul>
            <li onClick={() => toggleFaq(15)} className="faq-item">How can I purchase a gift card?</li>
            <li onClick={() => toggleFaq(16)} className="faq-item">Do you offer exclusive discounts?</li>
            <li onClick={() => toggleFaq(17)} className="faq-item">Can I combine offers on my order?</li>
          </ul>
          {faqOpen === 15 && <p className="faq-answer">You can purchase gift cards directly from our website, available in various amounts.</p>}
          {faqOpen === 16 && <p className="faq-answer">Yes, we offer exclusive discounts during seasonal sales and for members of our loyalty program.</p>}
          {faqOpen === 17 && <p className="faq-answer">Offers cannot be combined, unless specified during promotional events.</p>}
        </div>
      </div>
    </div>
  );
};

export default Help;
