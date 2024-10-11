import React from 'react'
import mi from '../../assets/mi.png'
import { Link } from 'react-router-dom'

const TopBrands = ({data}) => {
  return (
    <div className='border-b-2 shadow'>
    <div className="topbrands-title py-[6px] bg-white border-t-[1px] border-t-gray-200 border-b-2 border-b-[#9747FFCC]">
          <h2 className="text-center text-base uppercase font-semibold max-md:text-sm text-[#206a24]">
            Top brands
          </h2>
        </div>
        <div className="topbrands-bottom bg-white py-4 relative">
        <div className="grid grid-cols-6 max-md:grid-cols-3 ms-3 p-4">
          {
            data.map((i) => (
              <Link to={`/brands/${i.slug}`}>
              <img src={`${import.meta.env.VITE_FULL_URL}/${import.meta.env.VITE_IMAGE_URL}/${i.image}`} alt="" className='h-[150px] max-md:h-[80px] object-cover ' />
              </Link>
              
            ))
          }
            
            
        </div>
    </div>
    </div>
    
  )
}

export default TopBrands