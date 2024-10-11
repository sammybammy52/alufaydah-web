import React from "react";

import { RiDeleteBin2Line } from "react-icons/ri";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import Currency from "react-currency-formatter";
import { calculateDiscount } from "../../utils/Helpers";
import { useCartContext } from "../../context/CartContext";
import PromoData from "../../../promo.json";

const CartItem = ({ product }) => {
  const { toggleCartItemQuanitity, onRemove } = useCartContext();
  return (
    <div className="w-full border-t-2 pt-4">
      <div className="cart-item-top flex justify-between">
        <div className="lhs flex gap-3">
          <div className="item-img">
            <img
              src={`${import.meta.env.VITE_FULL_URL}/${
                import.meta.env.VITE_IMAGE_URL
              }/${product?.image}`}
              className="w-[100px] h-[100px] max-md:w-[70px] max-md:h-[70px]"
            />
          </div>
          <div className="item-text">
            <p className="max-md:text-sm font-semibold">{product?.name}</p>
            <p className="max-md:text-sm">
              in stock{" "}
              {product.size && (
                <span className="text-white bg-[#F71735] px-2 py-1">
                  {product?.size}
                </span>
              )}
            </p>

            <div>
              <div>
                {product?.id &&
                  PromoData?.map((i) => {
                    if (i.phone_id === product?.id) {
                      return (
                        <>      
                        <p className="text-center text-xl">+</p>
                        <div className="flex items-center gap-3">
                          <h3 className=" font-semibold flex-1 text-center text-sm">
                            <span className="text-white bg-primary p-1 rounded-lg font-semibold">
                              FREE
                            </span>{" "}
                            {i?.paired_phone}
                          </h3>

                          <div className="flex justify-center">
                            <img
                              src={i?.paired_phone_img}
                              alt=""
                              className="w-[80px]"
                            />
                          </div>
                        </div>
                        </>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="rhs">
          <h3 className="text-lg max-md:text-sm font-semibold">
            <Currency quantity={product?.price} currency="NGN" />
          </h3>
          <p>
            <span className=" line-through max-md:text-sm">
              <Currency quantity={product?.slashed_price} currency="NGN" />
            </span>{" "}
            <span className="bg-[#F71735] text-white no-underline max-md:text-sm">
              -{calculateDiscount(product?.price, product?.slashed_price)}%
            </span>
          </p>
        </div>
      </div>

      <div className="cart-item-bottom my-2 flex justify-between">
        <div
          className="lhs flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
          onClick={() => onRemove(product)}
        >
          <RiDeleteBin2Line className="text-[#F71735]" />{" "}
          <span className="text-[#F71735] max-md:text-sm">REMOVE</span>
        </div>
        <div className="rhs">
          <div className="flex gap-2">
            <AiFillMinusSquare
              size={26}
              color="#000000"
              className="hover:scale-110 transition-all"
              onClick={() =>
                toggleCartItemQuanitity(product?.id, product?.size, "dec")
              }
            />
            <p>{product?.quantity}</p>
            <AiFillPlusSquare
              size={26}
              color="#000000"
              className="hover:scale-110 transition-all"
              onClick={() =>
                toggleCartItemQuanitity(product?.id, product?.size, "inc")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
