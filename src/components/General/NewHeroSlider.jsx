import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import HeroCat from "../MiniComponents/HeroCat";
import { Spinner } from "@chakra-ui/react";

const NewHeroSlider = ({ sendToParent }) => {
  const { getRequest, categoryStore, handleCategoryStore } = useDataContext();
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      if (categoryStore) {
        setCategories(categoryStore);
        sendToParent(categoryStore);
        setLoading(false);
        return;
      }
      const result = await getRequest("client/all-categories");
      if (result) {
        console.log(result);
        setCategories(result);
        sendToParent(result);
        handleCategoryStore(result);
      }
      setLoading(false);
    };
    getCategories();
  }, []);

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
    <>
      <div className="bg-transparent max-md:hidden w-[950px] min-[1600px]:w-[1200px]  max-md:max-w-[380px] mx-auto">
        <div className="featured-bottom bg-transparent pl-3  py-6 relative">
          {!loading && (
            <>
              <div className="icon-container shadow" onClick={prev}>
                <MdArrowBackIos color="white" />
              </div>

              <div className="icon-container-2 shadow" onClick={nexto}>
                <MdArrowForwardIos color="white" />
              </div>
            </>
          )}

          {loading && (
            <div className="flex justify-center items-center py-16">
              <Spinner color="#fff" size={"xl"} />
            </div>
          )}
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
            {categories &&
              categories.map((i) => (
                <SwiperSlide className=" py-3">
                  <HeroCat
                    key={i.id}
                    text={i.category_name}
                    img={i.image}
                    link={i.slug}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>


    </>
  );
};

export default NewHeroSlider;
