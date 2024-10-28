import React from "react";
import ALogo from "../../assets/al-logo.png";
import { SlSocialYoutube, SlSocialInstagram } from "react-icons/sl";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaPhoneAlt,  FaTiktok } from 'react-icons/fa'
import { GoMail } from "react-icons/go";
import As from "../../assets/appstore.png";
import Gp from "../../assets/googleplay.png";
import { toast } from "react-toastify";

const Footer = () => {
  const handleFakeSubscribe = (e) => {
    e.preventDefault();
    toast.loading("Subscribing")

    setTimeout(() => {
      toast.dismiss();
      toast.success("Subscribed successfully")
    }, 2000)
  }
  return (
    <div>
      <div className="footer-contaner bg-[#000000] py-[54px]">
        <div className="footer-content-box max-w-[1440px] mx-auto">
          <div className=" lg:flex px-3 lg:px-[50px] lg:justify-center">
            <div className="logo-social lg:mr-[100px]">
              <a href="/">
                <img src={ALogo} className="h-[70px] lg:ml-5" />
              </a>

              <div className="social-div lg:pl-[30px]">
                <h3 className="text-white mb-3">JOIN US ON</h3>
                <div className="social-logos flex gap-4">
                  <a href="http://youtube.com/jambomarketng">
                    <SlSocialYoutube color="white" size={20} />
                  </a>

                  <a href="https://www.facebook.com/jambo.ng002/">
                    <RiFacebookCircleLine color="white" size={20} />
                  </a>

                  <a href="https://www.instagram.com/jambo.ng002/">
                    <SlSocialInstagram color="white" size={20} />
                  </a>

                  <a href="https://www.tiktok.com/@jambo.ng002">
                    <FaTiktok color="white" size={20} />
                  </a>
                </div>

                <div className="flex items-center gap-2 mt-4">
                <FaPhoneAlt size={18} color="white"/> <a href="tel:+2349071864538" className="text-white hover:underline ">+234-907-186-4538</a>
                </div>

                <div className="mt-4">
                <p className="text-white">For more enquiries, please send us an email</p>
                <a href="mailto:info@jambo.ng">
                <p className="text-primary hover:underline">info@jambo.ng</p>
                </a>
              </div>

              </div>

              
            </div>

            <div className="newsletter py-8 lg:mr-[184px]">
              <form className="nav-search-box my-auto flex mr-[0px] justify-center" onSubmit={handleFakeSubscribe}>
                <div className="input-container relative mr-[18px]">
                  <GoMail className="absolute right-3 top-3" size={20} />
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="py-[12px] pl-[15px] rounded-[5px] lg:w-[325px]"
                    required
                  />
                </div>

                <div className="nav-search-btn">
                  <button className="py-[12px] px-[20.5px] bg-[#F71735] rounded-[5px] text-white" >
                    Subscribe
                  </button>
                </div>
              </form>
              <div className="news-text mt-[23px]">
                <h3 className="uppercase font-semibold mb-3 text-white">
                  new to Ahlulfaydah?
                </h3>
                <p className="text-white">
                  Subscribe to our newletter to get updates on our latest
                  offers!
                </p>
              </div>
            </div>

            {/* <div className="app-btns py-8">
              <div className="app-imgs flex gap-2">
                <a
                  href={`https://play.google.com/store/apps/details?id=com.jamboappng.app&pcampaignid=web_share`}
                  target="_blank"
                >
                  <img src={As} alt="" className="h-[35px] hover:scale-110 transition-all duration-300" />
                </a>

                <a
                  href={`https://play.google.com/store/apps/details?id=com.jamboappng.app&pcampaignid=web_share`}
                  target="_blank"
                >
                  <img src={Gp} alt="" className="h-[35px] hover:scale-110 transition-all duration-300" />
                </a>
              </div>
              <div className="app-btn-texts mt-[23px]">
                <h3 className="uppercase font-semibold mb-3 text-white">
                  Download jambo free app
                </h3>
                <p className="text-white">Get access to exclusive offers!</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
