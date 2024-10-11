import React from 'react'
import Promo from '../../assets/promo.jpg';
import Promophone from '../../assets/promo-phone.jpg';
const PromoImg = () => {
  return (
    <>
    <div className='mb-16 mt-8 max-w-screen-2xl mx-auto px-[10px] lg:px-[30px]'>
    <img src={Promo} alt="" className='hidden lg:block rounded shadow-2xl hover:shadow-lg hover:translate-y-2 transition-all duration-500  w-full h-full'/>
    <img src={Promophone} alt="" className='lg:hidden rounded-2xl shadow-2xl hover:shadow-lg hover:translate-y-2 transition-all duration-500  w-full h-full'/>

    </div>
    </>
  )
}

export default PromoImg