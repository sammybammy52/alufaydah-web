import React from "react";
import { Link } from "react-router-dom";

const HeroCat = ({ text, img, link }) => {
  return (
    <div className=" hover:scale-110 transition-all duration-200 border p-4">
      <div className="flex justify-center">
        <Link to={`/category/${link}`}>
          <div className="rounded-full w-[140px] h-[140px] max-md:w-[100px] max-md:h-[100px] bg-white-100 relative">
            {/* <div className="bg-black bg-opacity-30 absolute top-0 left-0 right-0 bottom-0 rounded-full"></div>
            <p className="text-center text-sm max-md:text-sm font-bold text-white absolute inset-0 flex items-center justify-center px-8">{text}</p> */}
            <img
              src={`${import.meta.env.VITE_FULL_URL}/${
                import.meta.env.VITE_IMAGE_URL
              }/${img}`}
              alt=""
              className="object-cover rounded-full h-[140px] max-md:h-[100px] p-3"
            />
          </div>
        </Link>
        
      </div>
        <p className="text-center pt-2 text-sm max-md:text-xs font-bold text-gray-700">{text}</p>
      
    </div>
  );
};

export default HeroCat;
