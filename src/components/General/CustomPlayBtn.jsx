import React from "react";
import { GiPlayButton } from "react-icons/gi";

const CustomPlayBtn = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="h-24 w-24 rounded-full flex justify-center items-center bg-white bg-opacity-50 cursor-pointer"
    >
      <div className="h-16 w-16 rounded-full flex justify-center items-center bg-white bg-opacity-70">
        <div className="h-10 w-10 rounded-full flex justify-center items-center bg-white bg-opacity-100">
          <GiPlayButton size={40} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CustomPlayBtn;
