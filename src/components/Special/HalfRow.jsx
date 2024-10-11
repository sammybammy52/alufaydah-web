import React from 'react'
import ProductCard from './ProductCard'
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const HalfRow = ({name, data, cat_id}) => {
  return (
    <div className="fullrow-section-container px-[0px] max-md:px-2 mt-[50px]">
      <div className="fullrow-card-box max-w-[1440px] mx-auto shadow-lg">
        <div className="fullrow-title py-[18px] bg-white border-t-[1px] border-t-gray-200 border-b-4 border-b-[#9747FFCC]">
          <h2 className="text-center text-md uppercase font-semibold max-md:text-sm text-[#206a24]">
            {name}
          </h2>
        </div>

        <div className="fullrow-bottom bg-white py-4 relative">
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-md:ms-4 ms-4">
            {
                  data && data.map((i) => (
                    <ProductCard product={i}/>
                  ))
                }
            </div>
        </div>
        <div className='bg-secondary py-2 flex justify-center '>
            <Link to={`/category/${cat_id}`}>
            <h3 className='text-md font-bold text-center text-white flex hover:scale-110 transition-all uppercase'>More {name} <span><BsArrowRight color='#fff' className='ml-2 pb-2 font-bold' size={28}/></span></h3>
            </Link>
            
        </div>
      </div>
    </div>
  )
}

export default HalfRow