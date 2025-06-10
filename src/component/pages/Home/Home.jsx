import {} from 'react';
import Poster from "../Poster/Poster"; // Remove the curly braces
import './Home.css'; 
import WelcomeContainer from '../Welcome-container/WelcomeContainer';
import Achivement from '../Achivement/Achivement';
import FeaturedProducts from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
  return (
    <div className="home-container">
      <div className="wel-section">
        <WelcomeContainer />
      </div>
      <div className="adv-section">
      <Poster />
        
      </div>
     
      
      <div className="Feat-section">
        <FeaturedProducts />
      </div>
      <div className="review-section">
       <Testimonials />
      </div>
    </div>
  );
};

export default Home;