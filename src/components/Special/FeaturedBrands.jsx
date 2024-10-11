import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
import FpCard from "./FpCard";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

const FeaturedBrands = ({ name, data }) => {
  const [swiper, setSwiper] = React.useState();

  const nexto = () => {
    // @ts-ignore
    swiper.slideNext();
  };

  const prev = () => {
    // @ts-ignore
    swiper.slidePrev();
  };

  const handleSlideChange = (e) => {
    const activeSlideIndex = e.realIndex;
    console.log(e.realIndex);
    setStart(activeSlideIndex);
  };

  return (
    <div className="featured-section-container px-[50px] max-md:px-2 mb-14">
      <div className="featured-card-box max-w-[1440px] mx-auto shadow-lg">
        <div className="featured-title py-[12px] bg-[#ECE8E8]">
          <h2 className="text-center text-md uppercase font-semibold max-md:text-sm">
            {name}
          </h2>
        </div>

        <div className="featured-bottom bg-white pl-3 py-6 relative">
          {/* <div className="icon-container shadow" onClick={prev}>
              <MdArrowBackIos color="white" />
            </div>

            <div className="icon-container-2 shadow" onClick={nexto}>
              <MdArrowForwardIos color="white" />
            </div>

          <Swiper
            navigation={true}
            spaceBetween={0}
            slidesPerView={4}
            
            
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 0,
              },

              400: {
                slidesPerView: 2,
                spaceBetween: -60,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: -70,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1400: {
                slidesPerView: 6,
                spaceBetween: 0,
              },
            }}
            onSlideChange={handleSlideChange}
            onSwiper={(s) => {
              //console.log("initialize swiper", s);
              // @ts-ignore
              setSwiper(s);
            }}
          >
            {
              data && data.map((i) => (
                <SwiperSlide className="py-3">
                <Link to={`/brands/${i.slug}`}>
                         
                         <img class="w-[200px] h-[200px] max-md:w-[130px] max-md:h-[130px] object-cover p-1 rounded-full ring-gray-300 ring-2" src={`${import.meta.env.VITE_FULL_URL}/${import.meta.env.VITE_IMAGE_URL}/${i.image}`} alt="Bordered avatar"></img>
                       </Link>
              </SwiperSlide>
              ))
            }
          
           
          </Swiper> */}

          <Marquee pauseOnClick={true} autoFill={true} speed={100}>
          {
              data && data.map((i) => (
                <div className="py-3 px-4">
                <Link to={`/brands/${i.slug}`}>
                         
                         <img class="w-[200px] h-[200px] max-md:w-[130px] max-md:h-[130px] object-cover p-1 rounded-full ring-gray-300 ring-2" src={`${import.meta.env.VITE_FULL_URL}/${import.meta.env.VITE_IMAGE_URL}/${i.image}`} alt="Bordered avatar"></img>
                       </Link>
              </div>
              ))
            }
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrands;
