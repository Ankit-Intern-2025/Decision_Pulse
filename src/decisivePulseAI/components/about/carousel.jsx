import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';  // Import autoplay styles

// Import Swiper modules
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import '../../style/about.css';

function App(image) {
  console.log(image)
  return (
    <div className="container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        speed={2000}  // Adjust this value for slower/faster transition speed
        coverflowEffect={{
          rotate: 0,
          stretch: -140,   // Increase the negative value to bring slides closer
          depth: 300,      // Increase to push side slides further back, making them smaller
          modifier: 2,     // Set to 1 or below to reduce side slide size further
        }}

        autoplay={{
          delay: 3000,      // Delay between slides in milliseconds (3.5 seconds)
          disableOnInteraction: false,  // Auto-slide continues after interaction
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Include Autoplay module
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={image.images[0]} alt="slide_image" style={{ transform: "rotate(6deg)", margin: "auto" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image.images[1]} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image.images[2]} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image.images[0]} alt="slide_image" style={{ transform: "rotate(6deg)", margin: "auto" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image.images[1]} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image.images[2]} alt="slide_image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;
