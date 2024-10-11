import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';
import { useEffect } from 'react';
import PromoProductCard from './PromoProductCard';
const FullRow = ({name, data, cat_id}) => {
  const { getRequest } = useDataContext();
  const [promotions, setPromotions] = useState();
  const getPromotions = async () => {
    const result = await getRequest(`send-promotions?amount=7`);
    if (result.success) {
      setPromotions(result.promotions);
    }
  }

  useEffect(() => {
   getPromotions();
  }, [])
  
  return (
    <div className="fullrow-section-container px-[50px] max-md:px-2 mt-[50px]">
      <div className="fullrow-card-box max-w-[1440px] mx-auto shadow-lg">
        <div className="fullrow-title py-[18px] bg-white border-t-[1px] border-t-gray-200 border-b-4 border-b-[#9747FFCC]">
          <h2 className="text-center text-base uppercase font-semibold max-md:text-sm text-[#206a24]">
            {name}
          </h2>
        </div>

        <div className="fullrow-bottom bg-white py-4 relative">
            <div className="grid grid-cols-7 max-md:grid-cols-2 max-md:ms-4 ms-4">
              {
                promotions?.map((i) => (
                  <PromoProductCard product={{
                    ...i?.product,
                    vendor: i?.vendor,
                    store_slug: i?.store_slug,
                    is_verified: i?.is_verified
                  }}/>
                ))
              }
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

export default FullRow