import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './hero-section.scss';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function HeroSection() {
  return (
    <div className="hero-section-container">
      <div className='hero-section-container__swiper-container'>
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            loop={true}
            className="hero-swiper"
        >
            <SwiperSlide>
            <div className='hero-swiper__cards'>
                <img className='hero-swiper__slider-img' src="https://i.pinimg.com/736x/a6/b9/c9/a6b9c90af49c34c5d19a2908161d3dfe.jpg" alt="Wallpeaper 1" />
                <div>
                    <button className='hero-swiper__btn-buy'>Comprar</button>
                    <button className='hero-swiper__btn-know-more'>Saiba mais</button>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='hero-swiper__cards'>
                <img className='hero-swiper__slider-img' src="https://wallpapersmug.com/download/3840x2160/13377a/cyberpunk-city-buildings-art.jpg" alt="Wallpeaper 2" />
                <div>
                    <button className='hero-swiper__btn-buy'>Comprar</button>
                    <button className='hero-swiper__btn-know-more'>Saiba mais</button>
                </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='hero-swiper__cards'>
                <img className='hero-swiper__slider-img' src="https://img.freepik.com/free-photo/illustration-rain-futuristic-city_23-2151406585.jpg" alt="Wallpeaper 3" />
                <div>
                    <button className='hero-swiper__btn-buy'>Comprar</button>
                    <button className='hero-swiper__btn-know-more'>Saiba mais</button>
                </div>
            </div>
            </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSection;
