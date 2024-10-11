import { useState, useEffect } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import HeroCat from "../MiniComponents/HeroCat";
import { useDataContext } from "../../context/DataContext";
import Fade from "react-reveal/Fade";


const HeroCard = () => {

  const { getRequest, categoryStore, handleCategoryStore } = useDataContext();
  const [categories, setCategories] = useState(null);

  
  useEffect(() => {
   
    const getCategories = async() => {
      if (categoryStore) {
        setCategories(categoryStore);
        return;
      }
      const result = await getRequest('client/all-categories');
      if (result) {
        console.log(result);
        setCategories(result);
        handleCategoryStore(result);
      }
  
    }
    getCategories();
  }, []);

  return (
    <div className="hero-card-container px-[30px] max-md:px-2 pt-8 mb-[35px]">
      {/* <PlayCenterIcon/> */}
      <div className="hero-card bg-white border-2 max-w-[1440px] mx-auto rounded-[5px]  pb-5">
        <div className="hero-card-top grid grid-cols-3 mb-[46px] max-md:hidden">
          <div className="perks flex gap-2 justify-center py-[15px] my-[15px] border-r-2 border-primary">
            <div className="my-auto">
              <TbTruckDelivery size={28} color="#206a24" />
            </div>
            <div>
              <h4 className="hero-perks-h4">Same Day Delivery</h4>
              <p  className="hero-perks-p">Get your goods the same day as purchased</p>
            </div>
          </div>

          <div className="perks flex gap-2 justify-center py-[15px] my-[15px] border-r-2 border-primary">
            <div className="my-auto">
              <FaRegMoneyBillAlt size={28} color="#206a24" />
            </div>
            <div className="my-auto">
              <h4 className="hero-perks-h4">Money Back Guarantee</h4>
              <p className="hero-perks-p">Trustworthy and reliable</p>
            </div>
          </div>

          <div className="perks flex gap-2 justify-center py-[15px] my-[15px]">
            <div className="my-auto">
              <MdOutlineSupportAgent size={28} color="#206a24" />
            </div>
            <div>
              <h4 className="hero-perks-h4">24/7 Customer Service</h4>
              <p className="hero-perks-p">Discover more benefits now</p>
            </div>
          </div>
        </div>

        <div className="hero-card-bottom max-md:pt-16 relative">
          <h1 className="absolute top-0 bg-secondary text-white w-full text-center p-2 rounded-tl-lg rounded-tr-lg font-semibold lg:hidden uppercase">Categories</h1>
            <div className="grid grid-cols-5 max-md:grid-cols-2 min-[1440px]:mx-16 lg:mx-10">
              {
                // content.map((i) => (
                //     <HeroCat text={i.text} img={i.img} link={i.link}/>
                // ))

                categories && categories.map((i) => (
                  <Fade right>
                    <HeroCat key={i.id} text={i.category_name} img={i.image} link={i.slug}/>
                  </Fade>
                  
                ))
            }  
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
