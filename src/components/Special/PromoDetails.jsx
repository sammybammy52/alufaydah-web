import React from "react";

const PromoDetails = ({ data }) => {
  return (
    <>
      <div>
        <p className="text-center text-lg mb-3 text-secondary font-bold">comes with</p>

        <div className="flex items-center gap-3">
          <h3 className=" font-semibold flex-1 text-center">
            <span className="text-white bg-primary p-1 rounded-lg font-semibold">
              FREE
            </span>{" "}
            {data?.paired_phone}
          </h3>

          <div className="flex justify-center">

          <img src={data?.paired_phone_img} alt="" className="w-[100px]"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoDetails;
