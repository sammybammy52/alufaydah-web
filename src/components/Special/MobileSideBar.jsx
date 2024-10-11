import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { MdLogout, MdLogin, MdSell } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { ImAddressBook } from 'react-icons/im'
import { useAuthContext } from "../../context/AuthContext";
import { HiLocationMarker } from "react-icons/hi";

const MobileSideBar = ({ open, categories, handleOpen }) => {
  const { user } = useAuthContext();

  return (
    <>
    <div className={`bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 overflow-hidden z-40 ${!open && "hidden"}`} onClick={handleOpen}></div>
    <div
      className={
        open
          ? "h-screen fixed bg-[#206a24] w-[70vw] translate-x-0 border-r-[1px] shadow-xl border-[#e50d6a] z-50 pt-20 transition-all duration-300"
          : " -translate-x-96 overflow-hidden h-screen fixed bg-[#206a24]  z-50 pt-20 transition-all duration-300"
      }
    >
      
      <ul>
        <Link to="/dashboard">
          <li className="text-white flex py-2 pl-6 gap-2 active:opacity-70 active:scale-110 transition-all">
            <BsFillPersonFill color="white" size={24} />
            {
              user ? <p className="pt-1 font-semibold">{user.firstName}</p> : <p className="pt-1">Account</p>
            }
          </li>
        </Link>

        <Link to="/dashboard/my-orders">
          <li className="text-white flex py-2 pl-6 gap-2">
            <FaShoppingBag color="white" size={24} />
            <p className="pt-1">My Orders</p>
          </li>
        </Link>

        <Link to="/tracking">
          <li className="text-white flex py-2 pl-6 gap-2">
            <HiLocationMarker color="white" size={24} />
            <p className="pt-1">Tracking</p>
          </li>
        </Link>

        <Link to="/dashboard/addresses">
          <li className="text-white flex py-2 pl-6 gap-2">
            <ImAddressBook color="white" size={24} />
            <p className="pt-1">Addresses</p>
          </li>
        </Link>
        <Link to="/become-a-vendor">
          <li className="text-white flex py-2 pl-6 gap-2">
            <MdSell color="white" size={24} />
            <p className="pt-1">Become a Vendor</p>
          </li>
        </Link>

        {
          user ? <>
          <Link to="/logout">
          <li className="text-white flex py-2 pl-6 gap-2">
            <MdLogout color="white" size={24} />
            <p className="pt-1">Sign Out</p>
          </li>
        </Link>
          </> : <>
          <Link to="/login">
          <li className="text-white flex py-2 pl-6 gap-2">
            <MdLogin color="white" size={24} />
            <p className="pt-1">Sign in</p>
          </li>
        </Link>
          </>
        }
        
      </ul>
      <h3 className="uppercase border-y-[0.1px] border-y-white border-opacity-20 text-white py-4 pl-6 mt-4">
        Categories
      </h3>

      <ul>
        {categories &&
          categories.map((i) => (
            <Link to={`/category/${i.slug}`}>
              <li className="text-white flex py-2 pl-6 gap-2 active:opacity-70 active:scale-110 transition-all">
                <p className="pt-1">{i.category_name}</p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
    </>
    
  );
};

export default MobileSideBar;
