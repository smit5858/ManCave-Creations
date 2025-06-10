import {} from "react";  // Make sure to import React
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";  // Import Autoplay module
import "swiper/css";  // Core Swiper styles
import "swiper/css/pagination";  // Pagination styles
import "swiper/css/navigation";  // Navigation styles
import fst from '../../../assets/1.jpg';
import sec from '../../../assets/2.jpg';
import thi from '../../../assets/3.jpg';
import fort from '../../../assets/4.jpg';
import fif from '../../../assets/5.png';
import six from '../../../assets/6.png';
import sev from '../../../assets/7.png';
import eig from '../../../assets/8.png';
import nin from '../../../assets/9.png';
import ten from '../../../assets/10.png';
import "./Poster.css";

const Poster = () => {
  return (
    <div className="swiper-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3000,  // Delay between transitions in milliseconds
          disableOnInteraction: false,  // Autoplay will not be disabled after user interactions
        }}
        modules={[Pagination, Navigation, Autoplay]}  // Include Autoplay in modules
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={fst} alt="Slide 1" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={sec} alt="Slide 2" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={thi} alt="Slide 3" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={fort} alt="Slide 4" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={fif} alt="Slide 5" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={six} alt="Slide 6" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={sev} alt="Slide 7" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={eig} alt="Slide 8" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={nin} alt="Slide 9" className="pos-img"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={ten} alt="Slide 10" className="pos-img"/>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default Poster;