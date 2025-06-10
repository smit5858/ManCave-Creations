import {} from 'react';
import './Footer.css'; // Make sure to create the CSS file with the styles provided below

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-column">
          <h3>HELP</h3>
          <p>
            A Client Advisor is available at 1800 103 9988.<br/> 
            You can also
            <a href="#"> chat</a> or
            <a href="#"> email us</a>.
          </p>
          <p><a href="#">FAQ&apos;s</a></p>
          <p><a href="#">Product Care</a></p>
          <p><a href="#">Stores</a></p>
        </div>
        <div className="footer-column">
          <h3>SERVICES</h3>
          <p><a href="#">Repairs</a></p>
          <p><a href="#">Personalisation</a></p>
          <p><a href="#">Art of Gifting</a></p>
          <p><a href="#">Download our Apps</a></p>
        </div>
        <div className="footer-column">
          <h3>ABOUT ManCave Creations</h3>
          <p><a href="#">Fashion Shows</a></p>
          <p><a href="#">Arts &amp; Culture</a></p>
          <p><a href="#">La Maison</a></p>
          <p><a href="#">Sustainability</a></p>
          <p><a href="#">Latest News</a></p>
          <p><a href="#">Careers</a></p>
          <p><a href="#">Foundation ManCave Creations</a></p>
        </div>
        <div className="footer-column">
          <h3>CONNECT</h3>
          <p>
            <a href="#">Sign up</a> for ManCave Creations emails and receive the latest news from the Maison, including exclusive online pre-launches and new collections.
          </p>
          <p><a href="#">Follow Us</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="country">
          <img alt="Flag of India" src="https://in.louisvuitton.com/flags/in.svg" style={{ height: "12px", width: "16px" }} />
          <span>India</span>
        </div>
        <div className="address">
          <p>Full Name and Address of the Manufacturer</p>
          <p>
            ManCave Creations Malletier SAS
            <br />
            2 Rue du Pont Neuf
            <br />
            75034 Paris CEDEX 01
            <br />
            FRANCE
          </p>
          <p>Please refer to the product label for specific country of origin for each product.</p>
        </div>
        <div className="address">
          <p>Full Name and Address of the Importer</p>
          <p>
            ManCave Creations India Retail Private Limited
            <br />
            2nd Floor, Holiday Circle, Near ICICI Bank, Kalavad Road
            <br />
            Rajkot, Gujrat - 360005
            <br />
            INDIA
          </p>
        </div>
        <div className="links">
          <a href="#">Sitemap</a>
          <a href="#">Legal &amp; Privacy</a>
        </div>
      </div>
      <div className="footer-logo">
        <p>ManCave Creations</p>
      </div>
    </div>
  );
};

export default Footer;
