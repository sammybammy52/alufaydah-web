import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import Dashboard from "./Dashboard";
import Currency from "react-currency-formatter";
import moment from "moment/moment";
import Loading from "../../components/Loading/Loading";
import MyOrderCard from "../../components/Special/MyOrderCard";
import { FaTruckLoading } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";
import PromoData from "../../../promo.json";
import MyOrderPromoCard from "../../components/Special/MyOrderPromoCard";
// import {
//   useSteps,
//   Stepper,
//   Step,
//   StepIndicator,
//   StepStatus,
//   StepIcon,
//   StepNumber,
//   Box,
//   StepTitle,
//   StepDescription,
//   StepSeparator,
// } from "@chakra-ui/react";

const TrackOrders = () => {
  const { id } = useParams();
  const { getRequest } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getData = async (tracking_id) => {
      setLoading(true);
      const result = await getRequest(`client/order-details/${tracking_id}`);
      if (result) {
        setOrder(result);
      }
      setLoading(false);
    };
    getData(id);
  }, []);

  //handle the stepper for tracking
  //   const steps = [

  //     { title: "Processing", description: "Processing Order" },
  //     { title: "In Transit", description: "Out For Delivery" },
  //     { title: "Delivered", description: "The Order has been fufilled" },
  //   ];

  //   const { activeStep, setActiveStep } = useSteps({
  //     index: 2,
  //     count: steps.length,
  //   });
  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Dashboard>
          <h2 className="">Order Information</h2>
          <div className="py-4 flex justify-between gap-2 border-[1px] p-3 rounded-lg">
            <div className="">
              <h4 className="font-semibold">
                <span>Tracking Number: </span>{" "}
                <span className="text-primary">{order?.tracking_id}</span>
              </h4>
              <h4 className="font-semibold">
                <span>Placed on</span>{" "}
                <span className="  ">
                  {moment(order?.created_at).format("dddd Do [of] MMMM YYYY")}
                </span>
              </h4>
              <h4 className="font-semibold">
                <span>Total: </span>{" "}
                <span className="">
                  <Currency quantity={order?.price} currency="NGN" />
                </span>
              </h4>
            </div>

            <div className="">
              <div className="bg-primary text-primary bg-opacity-10 rounded-full px-6 py-2">
                {order?.merchant === "paystack" ? (
                  <>Paystack</>
                ) : order?.merchant === "pay-on-delivery" ? (
                  <>Pay on Delivery</>
                ) : null}
              </div>
            </div>
          </div>
          {order?.delivery_code && (
            <div className="mt-14 text-xl font-semibold flex justify-center">
              Delivery Code :{" "}
              <span className="text-primary">{order?.delivery_code}</span>
            </div>
          )}

          {/* <div className="stepper-section py-14">
            <Stepper size="lg" colorScheme='green' index={activeStep} >
              {steps.map((step, index) => (
                <Step key={index} >
                  <StepIndicator>
                    <StepStatus
                        
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </div> */}

          <div className="py-14">
            <div
              className={
                order?.status == "processing"
                  ? "border-[1px] rounded-lg p-4"
                  : "hidden"
              }
            >
              <div className="flex justify-between">
                <h4 className="font-semibold text-lg pt-2">Status</h4>
                <button className="bg-yellow-400 text-white py-2 px-6 rounded-full flex gap-2 font-semibold">
                  Processing <FaTruckLoading color="white" size={20} />
                </button>
              </div>

              <p className="mt-4">
                Your order being processed, you will recieve an email before
                your order is sent out for delivery
              </p>

              <h4 className="font-semibold pt-4">Address</h4>

              <div>
                <p className="flex gap-2">
                  <IoLocationSharp className="text-primary" size={20} />{" "}
                  {order?.address[0].address}
                </p>
                <p>
                  {order?.address[0].state_name}, {order?.address[0].lga_name}
                </p>
                <p className="font-semibold flex gap-2">
                  <FaPhoneAlt size={16} className="text-primary" />
                  {order?.address[0].phone_1}, {order?.address[0].phone_2}
                </p>
              </div>
            </div>

            <div
              className={
                order?.status == "in transit"
                  ? "border-[1px] rounded-lg p-4"
                  : "hidden"
              }
            >
              <div className="flex justify-between">
                <h4 className="font-semibold text-lg pt-2">Status</h4>
                <button className="bg-orange-500 text-white py-2 px-6 rounded-full flex gap-2">
                  Out for delivery <TbTruckDelivery color="white" size={20} />
                </button>
              </div>

              <p className="mt-4">
                Your order has been sent out for delivery, you will recieve an
                email and a phone call
              </p>
              <h4 className="font-semibold pt-4">Address</h4>

              <div>
                <p className="flex gap-2">
                  <IoLocationSharp className="text-primary" size={20} />{" "}
                  {order?.address[0].address}
                </p>
                <p>
                  {order?.address[0].state_name}, {order?.address[0].lga_name}
                </p>
                <p className="font-semibold flex gap-2">
                  <FaPhoneAlt size={16} className="text-primary" />
                  {order?.address[0].phone_1}, {order?.address[0].phone_2}
                </p>
              </div>
            </div>

            <div
              className={
                order?.status == "delivered"
                  ? "border-[1px] rounded-lg p-4"
                  : "hidden"
              }
            >
              <div className="flex justify-between">
                <h4 className="font-semibold text-lg pt-2">Status</h4>
                <button className="bg-green-500 text-white py-2 px-6 rounded-full flex gap-2">
                  Delivered <AiFillCheckCircle color="white" size={20} />
                </button>
              </div>

              <p className="mt-4">Your order has been delivered, Thank You</p>
              <h4 className="font-semibold pt-4">Address</h4>

              <div>
                <p className="flex gap-2">
                  <IoLocationSharp className="text-primary" size={20} />{" "}
                  {order?.address[0].address}
                </p>
                <p>
                  {order?.address[0].state_name}, {order?.address[0].lga_name}
                </p>
                <p className="font-semibold flex gap-2">
                  <FaPhoneAlt size={16} className="text-primary" />
                  {order?.address[0].phone_1}, {order?.address[0].phone_2}
                </p>
              </div>
            </div>
          </div>
          <div className="cart section py-4">
            <h3 className="font-semibold mb-3">Cart Items</h3>
            <div className="cart-items-div grid grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 gap-3 border-[1px] p-3 rounded-lg mb-6">
              {order?.cartItems.map((item) => {
                const matchingPromo = PromoData.find(
                  (promo) => promo.phone_id === item.id
                );

                return (
                  <React.Fragment key={item.id}>
                    <MyOrderCard product={item} />
                    {matchingPromo && (
                      <MyOrderPromoCard product={matchingPromo} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </Dashboard>
      )}
    </>
  );
};

export default TrackOrders;
