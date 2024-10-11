import React from "react";
import MyOrderCard from "./MyOrderCard";
import moment from "moment/moment";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import PromoData from "../../../promo.json";
import MyOrderPromoCard from "./MyOrderPromoCard";

const MyOrderSection = ({ date, cartItems, tracking_id }) => {
  return (
    <div>
      <div className="top-row mb-10 border-[2px] rounded-lg p-3">
        <div className="lg:flex lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {date && moment(date).format("dddd Do [of] MMMM YYYY")}
            </h3>
            <h4 className=" text-xs font-semibold">
              Order No:<span className="text-primary">{tracking_id}</span>
            </h4>
          </div>
          <Link to={`${tracking_id}`}>
            <button className="bg-primary text-white px-4 py-2 rounded-lg max-h-[40px] text-sm font-semibold">
              {" "}
              <span className="flex gap-2">
                View Details
                <HiArrowNarrowRight size={18} />
              </span>
            </button>
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-5 lg:gap-3">
          {cartItems.map((item) => {
            const matchingPromo = PromoData.find(
              (promo) => promo.phone_id === item.id
            );

            return (
              <React.Fragment key={item.id}>
                <MyOrderCard product={item} />
                {matchingPromo && <MyOrderPromoCard product={matchingPromo} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrderSection;
