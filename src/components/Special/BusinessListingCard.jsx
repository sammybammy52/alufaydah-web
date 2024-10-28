import { useState } from "react";
// import { FaLocationDot } from "react-icons/fa6";
// // import { slugifyAndHashUrlId, truncateString } from "../../../utils/Helpers";
// import { BsFacebook, BsInstagram } from "react-icons/bs";
// import { IoLogoWhatsapp } from "react-icons/io";
// import { FaSquareXTwitter } from "react-icons/fa6";
// import ListingSocialIcons from "./ListingSocialIcons";
import { Link } from "react-router-dom";
import Verified from "../../assets/verified.png";
import { BiCalendar, BiPhoneCall } from "react-icons/bi";
import { formatTimeAgo } from "../../utils/Helpers";
import { GiFoodTruck } from "react-icons/gi";
import { MdShoppingBag } from "react-icons/md";
import PhoneModal from "../Modals/PhoneModal";

const BusinessListingCard = ({ business }) => {
  const { VITE_FULL_URL, VITE_IMAGE_URL } = import.meta.env;
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  return (
    <>
      <PhoneModal
        isOpen={modal}
        onClose={handleCloseModal}
        data={business?.phone}
      />
     
        <div className="flex max-md:flex-col items-center seye-shadow  transition-all duration-300">
          <div className=" bg-white rounded-l-2xl relative w-[200px] h-[150px] max-md:w-full max-md:h-[250px]">
           

            <img
              src={business?.storeImg ? `${VITE_FULL_URL}/${VITE_IMAGE_URL}/${business?.storeImg}` : '/al-bg.png'}
              alt={business?.storeName}
              className="w-full h-full object-cover rounded-2xl border-[1px] bg-gray-100"
            />
          </div>

          <div className="bg-white w-full p-8 rounded-r-2xl">
            <h1 className="text-lg font-semibold mb-4 flex items-center">
              {business?.storeName}  { business?.is_verified && <img src={Verified} className="w-[25px]" />}
            </h1>
            <div className="">
              <p className="flex items-center gap-1 text-sm">
                <GiFoodTruck className="text-primary" />{" "}
                {business?.product_count} Products Available
              </p>
              <p className="flex items-center gap-1 text-sm">
                <BiCalendar className="text-primary" />
                Joined {formatTimeAgo(business?.created_at)}
              </p>
            </div>

            <div className="flex max-md:flex-col gap-3 mt-4 max-md:">
              <button onClick={handleOpenModal} className="rounded-lg bg-secondary py-2 px-6 text-white flex max-md:justify-center gap-2 items-center">
                 View Phone Number <BiPhoneCall size={18} />
              </button>
              <Link to={`/${business?.store_slug?.name}`}>
              <button className="w-full rounded-lg bg-primary py-2 px-6 text-white flex max-md:justify-center gap-2 items-center">
                Visit Store <MdShoppingBag/>
              </button>
              </Link>
            </div>
            {/* <p className="flex items-center gap-2 mb-4">
              <FaLocationDot className="text-red-500" size={18} />{" "}
              {truncateString(business?.businessAddress, 100)}
            </p>
            <div className="flex gap-3">
              <ListingSocialIcons icon={<BsInstagram />} />
              <ListingSocialIcons icon={<BsFacebook />} />
              <ListingSocialIcons icon={<FaSquareXTwitter />} />
              <ListingSocialIcons icon={<IoLogoWhatsapp />} />
            </div> */}
          </div>
        </div>
      
    </>
  );
};

export default BusinessListingCard;
