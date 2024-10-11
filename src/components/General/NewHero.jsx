import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Promo from "../../assets/promo.jpg";
import { BiSearchAlt } from "react-icons/bi";
import NewHeroSlider from "./NewHeroSlider";
import HeroCat from "../MiniComponents/HeroCat";
import { Spinner } from "@chakra-ui/react";
import { useDataContext } from "../../context/DataContext";

const NewHero = () => {
  const navigate = useNavigate();


  const { getRequest, categoryStore, handleCategoryStore } = useDataContext();
  const [categories, setCategories] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      if (categoryStore) {
        setCategories(categoryStore);
        setLoading(false);
        return;
      }
      const result = await getRequest("client/all-categories");
      if (result) {
        setCategories(result);
        handleCategoryStore(result);
      }
      setLoading(false);
    };
    getCategories();
  }, []);

  const [searchFocus, setSearchFocus] = useState("products");
  const [q, setQ] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchFocus === 'products') {
      navigate("/catalog/" + q);
    }else{
      navigate("/vendor-directory?search=" + q);
    }
  };
  return (
    <>
      <div className="daddy-div">
        <div className="h-[350px] max-md:h-[280px] min-[1600px]:h-[650px] relative text-white">
          <div className="absolute z-30 w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-2 lg:min-w-[500px] mt-28 max-md:mt-10 max-md:justify-center max-md:items-center w-full lg:w-[60vw]">
              {/* <Fade left>
                <h4 className="text-2xl text-center font-semibold max-md:hidden">
                  welcome to
                </h4>
              </Fade> */}
              <Fade right>
                <h1 className="text-4xl text-center font-bold">Ahlu-l-faydah Market</h1>
              </Fade>

              <p className="text-center max-md:mb-6">
                what do you want to purchase?
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex ">
                  <div className="flex w-full relative">
                    <input
                      type="text"
                      name="q"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="py-4 px-6 outline-none rounded-tl-xl text-sm rounded-bl-xl w-full text-black"
                      placeholder={`Search for all ${searchFocus}`}
                      />
  
       
                        <select onChange={(e) => setSearchFocus(e.target.value)} className="text-gray-800 absolute right-10 top-4 outline-none">
                          <option value="products">Products</option>
                          <option value="vendors">Vendors</option>
                        </select>
             
                  </div>

                  <div className="">
                    <button
                      className=" bg-primary flex justify-center items-center p-4 rounded-tr-xl rounded-br-xl hover:scale-110 transition-transform duration-300"
                      onClick={handleSubmit}
                    >
                      <BiSearchAlt color="white" size={24} />
                    </button>
                  </div>
                </div>
              </form>
              {/* <div className="lg:w-[900px]"> */}
              {/* </div> */}
              {/* <NewHeroSlider sendToParent={handleCategories} /> */}
            </div>
          </div>

          <div className="absolute bg-black opacity-40 w-full h-full"></div>
          <img
            src={`al-bg.png`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* mobile layout */}

        <div className="">
          <div className="bg-white w-full grid grid-cols-3 lg:grid-cols-5">
            {categories ? (
              categories.map((i) => (
                <HeroCat
                  key={i.id}
                  text={i.category_name}
                  img={i.image}
                  link={i.slug}
                />
              ))
            ) : (
              <div className="h-[220px] flex justify-center items-center max-md:col-span-3 lg:w-full">
                <Spinner className="text-primary text-center" size={"xl"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHero;
