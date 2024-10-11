import React from "react";
import Marquee from "react-fast-marquee";
import PromoData from "../../../promo.json";
import PromoCard from "../Special/PromoCard";

const PromoSection = () => {
  return (
    <div className="featured-section-container px-[50px] max-md:px-2 mb-14">
      <div className="featured-card-box max-w-[1440px] mx-auto shadow-lg">
        <div className="featured-title py-[12px] border-b-2">
          <h2 className="text-center text-md uppercase font-semibold max-md:text-sm text-yellow-300 bg-primary py-3">
            
            <Marquee speed={100}>
                <span className="mr-10">NEW DEALS !!!</span>
                <span className="mr-10">NEW ARRIVALS !!!</span>
                <span className="mr-10">NEW DEALS !!!</span>
                <span className="mr-10">NEW ARRIVALS !!!</span>
                <span className="mr-10">NEW DEALS !!!</span>
                <span className="mr-10">NEW ARRIVALS !!!</span>
                <span className="mr-10">NEW DEALS !!!</span>
         
                {/* <span className="mr-10">BUY ONE, GET ONE FREE!!</span>
                <span className="mr-10">LIMITED TIME OFFER !!!</span>
                <span className="mr-10">BUY ONE, GET ONE FREE!!</span>
                <span className="mr-10">LIMITED TIME OFFER !!!</span>
                <span className="mr-10">BUY ONE, GET ONE FREE!!</span> */}
            </Marquee>
          </h2>
        </div>

        <div className="featured-bottom bg-white pl-3 py-4 relative">
          <Marquee pauseOnClick={true} autoFill={true}>
            {PromoData.map((i, index) => (
              // <Zoom>
                <PromoCard key={i.phone_id} data={i} />
              // </Zoom>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
