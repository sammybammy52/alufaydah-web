import React from 'react'
import CardSkeleton from './CardSkeleton';
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
const FeaturedSkeleton = () => {
    const [swiper, setSwiper] = React.useState();
  return (
    <div className="featured-section-container px-[50px] max-md:px-2 mb-14">
      <div className="featured-card-box max-w-[1440px] mx-auto shadow-lg">
        <div className="featured-title py-[12px] bg-[#ECE8E8]">
          <h2 className="text-center text-md uppercase font-semibold max-md:text-sm">
            Loading...
          </h2>
        </div>

        <div className="featured-bottom bg-white pl-3 py-4 relative">
     
            <div className="icon-container shadow" >
              <MdArrowBackIos color="white" />
            </div>

            <div className="icon-container-2 shadow" >
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
                slidesPerView: 6,
                spaceBetween: -100,
              },
              1400: {
                slidesPerView: 6,
                spaceBetween: -100,
              },
            }}
          
            onSwiper={(s) => {
              //console.log("initialize swiper", s);
              // @ts-ignore
              setSwiper(s);
            }}
          >
             <SwiperSlide>
                <CardSkeleton/>
              </SwiperSlide>

              <SwiperSlide>
                <CardSkeleton/>
              </SwiperSlide>

              <SwiperSlide>
                <CardSkeleton/>
              </SwiperSlide>

              <SwiperSlide>
                <CardSkeleton/>
              </SwiperSlide>

              <SwiperSlide>
                <CardSkeleton/>
              </SwiperSlide>

              <SwiperSlide>
                <CardSkeleton/>
              </SwiperSlide>

              <SwiperSlide>
                <CardSkeleton/>
              </SwiperSlide>
           
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default FeaturedSkeleton