import React from "react";
import { truncateString, calculateDiscount } from "../../utils/Helpers";
import Currency from "react-currency-formatter";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import { useDataContext } from "../../context/DataContext";
import Verified from '../../assets/verified.png';

const PromoProductCard = ({ product }) => {
  const { postRequest } = useDataContext();
  const navigate = useNavigate();
  const handleClick = () => {
    postRequest(`click-promotions`, { id: product?.id });
    navigate(`/v-products/${product?.slug}`);
  };
  return (
    <article onClick={handleClick}>
      <div className="flex flex-col items-start py-[13px] px-[10px] gap-[6px] isolate relative w-[154px] bg-white rounded-[10px] transition-all hover:transition-all hover:rounded-[10px] hover:shadow-md">
        <img
          src={`${import.meta.env.VITE_FULL_URL}/${
            import.meta.env.VITE_IMAGE_URL
          }/${product?.images[0]}`}
          alt=""
          className="w-[130px] h-[130px] rounded-[10px] object-cover"
        />
        <div className="product-txt-div flex flex-col gap-[6px]">
          <p className="text-sm h-[40px] font-medium">
            {truncateString(product?.product_name, 25)}
          </p>

          {product?.filler_role === "customer" ? (
            <div className="flex items-center gap-2">

              <div className="relative">
              <Avatar
                height={8}
                width={8}
                name={product?.vendor?.storeName}
                src={`${import.meta.VITE_FULL_URL}/${
                  import.meta.env.VITE_IMAGE_URL
                }/${product?.vendor?.storeImg}`}
              />
                {
                  product?.is_verified && <img className="w-[24px] absolute bottom-[-8px] right-[-8px]" src={Verified} alt="" />
                }
              </div>
              <Link
                to={`/store/${product?.store_slug?.name}`}
                className="text-xs text-primary hover:underline"
              >
                {truncateString(product?.vendor?.storeName, 12)} 
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Avatar
                height={7}
                width={7}
                name={"Jambo"}
                color={"#fff"}
                backgroundColor={"#206a24"}
              />
              <Link to={"/"} className="text-xs text-primary">
                Jambo NG
              </Link>
            </div>
          )}
          <p className="font-bold text-base">
            <Currency quantity={product?.price} currency="NGN" />
          </p>
          <p className=" text-xs line-through font-light">
            <Currency quantity={product?.slashed_price} currency="NGN" />
          </p>
        </div>
        <div className="discount absolute w-[38px] h-[37px] top-[3px] right-[3px] bg-yellow-500 flex justify-center items-center rounded-full p-6">
          <p className="text-gray-900 text-sm">AD</p>
        </div>
      </div>
    </article>
  );
};

export default PromoProductCard;
