import { Container } from '@chakra-ui/react'
import React from 'react'
import Footer from '../../components/General/Footer'
import NavBar from '../../components/General/NavBar'
import CartItem from '../../components/Special/CartItem'
import { useCartContext } from '../../context/CartContext'
import Currency from "react-currency-formatter";

import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useAuthContext } from '../../context/AuthContext'

const Cart = () => {
    const {
        totalPrice,
     
        cartItems,
        
      } = useCartContext();

    const { user } = useAuthContext();
      
  return (
    <>
    <Helmet>
        <title>Cart</title>
      </Helmet>
    <NavBar/>
    <Container maxW={`7xl`}>
        <div className="cart-container my-10">
        <div className="grid lg:grid-cols-4 gap-8">
            
            <div className="products lg:col-span-3 shadow-xl rounded-md px-4 lg:px-[46px] py-[24px] border-t-2">
                <div className="toprow py-4">
                    <h4 className='text-lg font-semibold'>Cart ({cartItems.length})</h4>
                </div>
                <div className="">
                    {
                        cartItems && cartItems.map((i) => (
                            <CartItem product={i}/>
                        ))
                    }
                    
                </div>
            </div>
            <div className="filter-div shadow-xl rounded-md p-4 border-t-2 h-[200px]">
                <h3 className='border-b pb-2'>Checkout Price</h3>

                <div className='flex my-4 justify-between'>
                    <p className=' font-semibold uppercase'>Subtotal:</p>
                    <p><Currency quantity={totalPrice && totalPrice} currency="NGN"/></p>
                </div>
                    <Link to={user ? "/checkout" : "/login"}>
                    <button className='w-full bg-[#206a24] py-2 text-white rounded-md hover:scale-105 transition-all hover:opacity-80' >Checkout Now</button>
                    </Link>
                
            </div>
        </div>
        </div>
    </Container>
    <Footer/>
    </>
    
  )
}

export default Cart