import { useState } from 'react';
import './Contact.css';
import LOGO2 from '../../../assets/LOGO2.jpeg';

const Contact = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const faqData = [
    {
      question: "What is my MCC account?",
      answer: "Your MCC account is a personalized profile on the ManCave Creations platform where you can manage your orders, preferences, and contact details."
    },
    {
      question: "Exchange and Return orders?",
      answer: "You can exchange or return orders within 30 days of purchase, provided the items are unused and in their original packaging. Contact our support team for assistance."
    },
    {
      question: "Where are our products manufactured?",
      answer: "Our products are crafted by skilled artisans in India, ensuring high-quality materials and traditional craftsmanship."
    },
    {
      question: "How to take care of accessories?",
      answer: "Store accessories in a dry place, avoid exposure to water or harsh chemicals, and clean with a soft cloth to maintain their condition."
    },
    {
      question: "Where can you get your products delivered?",
      answer: "We deliver to most regions globally, including India, the US, UK, Canada, and Australia. Check shipping options at checkout."
    },
    {
      question: "How do I take care of my Jewellery?",
      answer: "Keep jewellery away from moisture, store in a soft pouch, and polish gently with a microfiber cloth to preserve its shine."
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setSelectedQuestion(null); // Reset selected question when searching
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(selectedQuestion === question ? null : question);
  };

  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="contact-page">
      <div className="header">
        {/* Add header content if needed */}
      </div>
      <div className="banner">
        <img alt="Brand logo" src={LOGO2} />
        <p>Looking for gift ideas? Speak to our Digital Client Advisors today.</p>
      </div>
      <div className="container">
        <h1>CONTACT US</h1>
        <p>Choose your preferred method of contact to connect with our customer service team or find out more information with our FAQ</p>
        <div className="contact-methods">
          <div className="contact-method">
            <h2>CALL US</h2>
            <p><strong>Monday to Saturday:</strong> 10am - 7pm</p>
            <button>
              <i className="fas fa-phone-alt"></i>
              1800 103 9988
            </button>
          </div>
          <div className="contact-method">
            <h2>EMAIL US</h2>
            <p>Our client advisors will be delighted to answer your questions</p>
            <button onClick={() => window.location.href = '/sendemail'}>
              <i className="fas fa-envelope"></i>
              Send an Email
            </button>
          </div>
          <div className="contact-method">
            <h2>MESSAGE US</h2>
            <p>Our client advisors are at your service.</p>
            <button>
              <i className="fab fa-apple"></i>
              Apple Messages
            </button>
            <button
              style={{ marginTop: '10px' }}
              onClick={() => window.location.href = 'https://wa.me/+91999988888?text=Welcome%20to%20Mancave%20Creatons'}
            >
              <i className="fab fa-whatsapp"></i>
              Whatsapp
            </button>
          </div>
        </div>
        <div className="faq">
          <h2>FREQUENT QUESTIONS</h2>
          <div className="search">
            <i className="fas fa-search"></i>
            <input
              placeholder="How can we assist you?"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="faq-questions">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="faq-question"
                    onClick={() => handleQuestionClick(faq.question)}
                  >
                    {faq.question}
                  </div>
                  {selectedQuestion === faq.question && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              ))
            ) : (
              <p>No matching questions found.</p>
            )}
          </div>
          <button onClick={() => setSearchQuery('')}>Discover all</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;