import {useEffect} from 'react'
import './WelcomeContainer.css'

const WelcomeContainer = () => {

  useEffect(() => {
    // let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const parallaxSpeed = 0.3;

          const welcomeSection = document.querySelector('.welcome-section');
          if (welcomeSection) {
            welcomeSection.style.backgroundPosition = `center ${-(scrollY * parallaxSpeed)}px`;
          }

          window.screenY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="welcome-section">
            <h1>Welcome to ManCave Creations</h1>
            <p>
              At ManCave Creations, we bring you the finest collection of men&apos;s fashion, including
              t-shirts, shirts, pants, shoes, and perfumes. Our mission is to provide premium quality
              products that redefine your style.
            </p>
          </div> 
  )
}

export default WelcomeContainer