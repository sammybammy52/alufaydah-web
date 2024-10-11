import React from 'react'
import Fake from '../../assets/fake-card.jpg'
const CardSkeleton = () => {
  return (
    <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] bg-white rounded-[10px] my-2 transition-all hover:shadow-lg hover:-translate-y-1">
        <img
          src={Fake}
          alt=""
          className="w-[130px] h-[130px] object-cover"
        />
        <div className="product-txt-div flex flex-col gap-[6px]">
          <p className="text-sm h-[40px]">
            loading..
          </p>
          <p className="font-bold text-base">
       
          </p>
          <p className=" text-xs line-through font-light">
          </p>
        </div>
        <div className="discount absolute w-[38px] h-[37px] top-[3px] right-[3px] bg-[#F71735] flex justify-center items-center rounded-full p-6">
          <p className="text-white text-sm">
            0%
          </p>
        </div>
      </div>
  )
}

export default CardSkeleton