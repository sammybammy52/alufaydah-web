import React from "react";
import Footer from "../../components/General/Footer";
import NavBar from "../../components/General/NavBar";

import { useAuthContext } from "../../context/AuthContext";
import { IoPerson } from "react-icons/io5";
import { HiShoppingBag, HiLocationMarker } from "react-icons/hi";
import { ImAddressBook } from 'react-icons/im'
import { Link } from "react-router-dom";
import { BiMessageDots } from "react-icons/bi";
const Dashboard = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="cat-page-section-container px-[50px] max-md:px-2 mt-[50px]">
        <div className="cat-page-card-box max-w-[1440px] mx-auto">
          <div className="main-stuff mt-[21px] mb-[50px]">
            <div className="lg:grid lg:grid-cols-4 gap-8">
              <div className="filter-div lg:shadow-xl rounded-md p-4 lg:border-t-2 transition-all duration-300">
                <div className="max-[1000px]:hidden">
                  <ul className=" ml-2 mt-10 flex flex-col gap-3">
                    <Link to="/dashboard">
                      <li className=" border-b-[0.6px] py-2  flex gap-2">
                        {" "}
                        <IoPerson />
                        Account
                      </li>
                    </Link>
                    <Link to="/dashboard/my-orders">
                      <li className=" border-b-[0.6px] py-2  flex gap-2">
                        <HiShoppingBag /> My Orders
                      </li>
                    </Link>

                    <Link to="/dashboard/tracking-page">
                      <li className=" border-b-[0.6px] py-2  flex gap-2">
                        <HiLocationMarker /> Tracking
                      </li>
                    </Link>

                    <Link to="/dashboard/addresses">
                      <li className=" border-b-[0.6px] py-2  flex gap-2">
                        <ImAddressBook /> Addresses
                      </li>
                    </Link>
                    <Link to="/dashboard/chats">
                      <li className=" border-b-[0.6px] py-2  flex gap-2">
                        <BiMessageDots /> Chats
                      </li>
                    </Link>

                    
                  </ul>
                </div>
              </div>
              <div className="products col-span-3 shadow-xl rounded-md px-4 lg:px-[46px]  border-t-2">
                <div className="toprow py-4"></div>
                <div className="">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
