import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
import FpCard from "./FpCard";

const FeaturedSection = ({ name, data, sectionId }) => {
  const [swiper, setSwiper] = React.useState();
  //basically the second number in the array is going to be the total number of items in the featured array - 3
  //this values will be used to control the swipe buttons.
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(2);

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

  const [sectionProducts, setSectionProducts] = useState(null);

  useEffect(() => {
    if (data) {
      const filtered =  data.filter((i) => {
      if (i.section_id === sectionId) {
        return i;
      }
    })

    setSectionProducts(filtered);
    }
    
  }, [data]);
  return (
    <div className="featured-section-container px-[50px] max-md:px-2 mb-14">
      <div className="featured-card-box max-w-[1440px] mx-auto shadow-lg">
        <div className="featured-title py-[12px] border-b-2">
          <h2 className="text-center text-md uppercase font-semibold max-md:text-sm text-primary">
            {name}
          </h2>
        </div>

        <div className="featured-bottom bg-white pl-3 py-4 relative">
     
            <div className="icon-container shadow" onClick={prev}>
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
                slidesPerView: 6,
                spaceBetween: -100,
              },
              1400: {
                slidesPerView: 6,
                spaceBetween: -100,
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
              sectionProducts && sectionProducts.map((i) => (
                <SwiperSlide>
                <ProductCard product={i.product}/>
              </SwiperSlide>
              ))
            }
          
           
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
