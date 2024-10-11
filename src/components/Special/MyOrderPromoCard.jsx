import React from 'react'
import { truncateString, calculateDiscount } from "../../utils/Helpers";
import Currency from "react-currency-formatter";
import { Link } from "react-router-dom";

const MyOrderPromoCard = ({ product }) => {
  return (
    <Link >
      <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] bg-white rounded-[10px] hover:scale-110 transition-all hover:transition-all hover:rounded-[10px] hover:shadow-md">
        <img
          src={`${product?.paired_phone_img}`}
          alt=""
          className="w-[130px] h-[130px] object-cover"
        />
        <div className="product-txt-div flex flex-col gap-[6px]">
          <p className="text-sm h-[40px]">
            {truncateString(product?.paired_phone, 25)}
          </p>
          <p className="font-bold text-base">
            <Currency quantity={0} currency="NGN" />
          </p>
          <p className=" text-sm text-primary  font-semibold flex gap-2">
            Qty: 1
          </p>
        </div>
        <div className="discount absolute w-[38px] h-[37px] top-[3px] right-[3px] bg-[#F71735] flex justify-center items-center rounded-full p-6">
          <p className="text-white text-sm">
            FREE
          </p>
        </div>
      </div>
    </Link>
  )
}

export default MyOrderPromoCard