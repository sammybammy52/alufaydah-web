import React from "react";
import { truncateString, calculateDiscount } from "../../utils/Helpers";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";
const MyOrderCard = ({ product }) => {
  return (
    <Link >
      <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] bg-white rounded-[10px] hover:scale-95 transition-all hover:transition-all hover:rounded-[10px] hover:shadow-md">
        <img
          src={`${import.meta.env.VITE_FULL_URL}/${
            import.meta.env.VITE_IMAGE_URL
          }/${product?.image}`}
          alt=""
          className="w-[130px] h-[130px] object-cover"
        />
        <div className="product-txt-div flex flex-col gap-[6px]">
          <p className="text-sm h-[40px]">
            {truncateString(product?.name, 25)}
          </p>
          <p className="font-bold text-base">
            <Currency quantity={product?.price} currency="NGN" />
          </p>
          <p className=" text-sm text-primary  font-semibold flex gap-2">
            Qty: {product?.quantity} { product?.size && <><span>Size:{product?.size} </span></>}
          </p>
        </div>
        <div className="discount absolute w-[38px] h-[37px] top-[3px] right-[3px] bg-[#F71735] flex justify-center items-center rounded-full p-6">
          <p className="text-white text-sm">
            -{calculateDiscount(product?.price, product?.slashed_price)}%
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MyOrderCard;
