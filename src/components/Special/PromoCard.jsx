import React from "react";
import { Link } from "react-router-dom";
const PromoCard = ({ data }) => {
  return (
    <>
    <Link to={`/v-products/${data?.phone_slug}`}>
    
      <div className="shadow border rounded-xl p-4 mr-8 h-[300px] hover:scale-90 transition-all duration-500">
        <div className="flex gap-2 justify-center items-center mb-6">
          <img className="w-[100px]" src={data?.phone_img} alt="" />
          <img className="w-[100px]" src={data?.paired_phone_img} alt="" />
        </div>

        <div className="flex flex-col w-[200px]">
          <h3 className="text-center font-semibold">{data?.phone_name}</h3>
          <p className="text-center">+</p>
          <h3 className="text-center w-[200px]">
            <span className="text-white bg-primary p-1 rounded-lg text-sm font-semibold">FREE</span> {data?.paired_phone}
          </h3>
        </div>
      </div>
    </Link>
    </>
  );
};

export default PromoCard;
