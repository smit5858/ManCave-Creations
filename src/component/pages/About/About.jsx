import {} from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      {/* First Section */}
      <div className="fst-section">
        <div className="fst-title">
          <h1>Welcome To ManCave Creations</h1>
          <p>Your one-stop destination for all things creative and custom-made!</p>
        </div>
      </div>

      {/* Second Section */}
      <div className="sec-section">
        <div className="sec-content">
          <h2>Our Story</h2>
          <p>
            At ManCave Creations, we specialize in transforming your ideas into reality. From custom artwork to personalized home decor, we create unique pieces that reflect your style and personality. Whether you're decorating your home, office, or a special event, we've got you covered. Our passion for creativity drives us to craft high-quality items that bring joy and inspiration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
