import React from "react";
import { useState, useEffect } from "react";
import { Container, RadioGroup, Radio } from "@chakra-ui/react";
import { useCartContext } from "../../context/CartContext";
import Currency from "react-currency-formatter";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/General/NavBar";
import Footer from "../../components/General/Footer";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import Loading from "../../components/Loading/Loading";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import PD from "../../assets/pay-design.png";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { calculateDiscount } from "../../utils/Helpers";

const PayOnDelivery = () => {
  const { totalPrice, totalQuantities, cartItems, clearCart } =
    useCartContext();

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { getRequest, postRequest } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [couponInfo, setCouponInfo] = useState({
    coupon_deduction: 0,
    coupon_code: null,
    coupon_id: null,
  });

  const [defaultAddress, setDefaultAddress] = useState({});
  const getDefaultAddress = async (id) => {
    setLoading(true);
    const result = await getRequest(`client/get-default-address/${id}`);
    if (result) {
      setDefaultAddress(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    getDefaultAddress(user.id);
  }, []);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();

    toast.loading("Applying Coupon...");
    const result = await getRequest(
      `client/apply-coupon/${couponInfo.coupon_code}/${totalPrice}`
    );

    if (result.status === "fail") {
      toast.dismiss();
      toast.error(result.message);
    } else if (result.status === "success") {
      toast.dismiss();
      toast.success(result.message);
      setCouponInfo({
        ...couponInfo,
        coupon_deduction: result.coupon.deducted_amount,
        coupon_id: result.coupon.id,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const result = await postRequest("pay-on-delivery", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      customer_id: user.id,
      address: [defaultAddress],
      phone: [defaultAddress.phone_1, defaultAddress.phone_2],
      amount: totalPrice - couponInfo.coupon_deduction,
      coupon_id: couponInfo.coupon_id,
      cartItems,
    });

    if (result.status === 'success') {
        const { reference } = result.data;
        clearCart();
        return navigate(`/thank-you/${reference}`);
    }
    else{
        setLoading(false);
        toast.error("Error, Something went wrong, please try again");
    }
  };

  return (
    <>
      <Helmet>
        <title>Payment On delivery confirmation</title>
      </Helmet>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container maxW={`7xl`}>
            <div className="cart-container my-10">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="products lg:col-span-3 shadow-xl rounded-md px-4 lg:px-[46px] py-[24px] border-t-2">
                  <div className="">
                    <div className="toprow py-2">
                      <h4 className="text-lg font-semibold">Payment</h4>

                      <form
                        className="lg:grid lg:grid-cols-10 gap-4 mt-8"
                        onSubmit={handleApplyCoupon}
                      >
                        <div className="col-span-7 w-full max-md:mb-4">
                          <input
                            required
                            name="coupon_code"
                            type="text"
                            className="py-3 px-4 border-2 w-full rounded-md"
                            value={couponInfo.coupon_code}
                            onChange={(e) =>
                              setCouponInfo({
                                ...couponInfo,
                                coupon_code: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="col-span-3 h-full w-full">
                          <button className="bg-primary text-white px-4 py-2 w-full h-full rounded-md">
                            Apply Coupon
                          </button>
                        </div>
                      </form>

                      <div className="py-6">
                        <button className="py-4 bg-black rounded w-full text-white" onClick={handleSubmit}>
                          Confirm Order
                        </button>

                        {/* <div className="flex justify-center mt-6">
                          <img src={PD} className="w-[310px]" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`filter-div shadow-xl rounded-md p-4 border-t-2 ${
                    couponInfo.coupon_deduction ? "h-[240px]" : "h-[150px]"
                  }`}
                >
                  <h3 className="border-b pb-2">Checkout Price</h3>

                  <div className="flex my-4 justify-between">
                    <p className="text-sm">
                      Total Quantities ({totalQuantities && totalQuantities})
                    </p>
                  </div>

                  <div className="flex my-4 justify-between">
                    <p className=" font-semibold uppercase">Subtotal:</p>
                    <p
                      className={`${
                        couponInfo.coupon_deduction !== 0 && "line-through"
                      }`}
                    >
                      <Currency
                        quantity={totalPrice && totalPrice}
                        currency="NGN"
                      />
                    </p>
                  </div>

                  {couponInfo.coupon_deduction !== 0 && (
                    <div className="flex justify-between items-center">
                      <p className="text-white rounded-md px-2 py-1 bg-red-600">
                        -
                        {calculateDiscount(
                          totalPrice - couponInfo.coupon_deduction,
                          totalPrice
                        )}
                        %
                      </p>

                      <Currency
                        quantity={
                          couponInfo.coupon_deduction !== 0 &&
                          totalPrice - couponInfo.coupon_deduction
                        }
                        currency="NGN"
                      />
                    </div>
                  )}

                  {couponInfo.coupon_deduction !== 0 && (
                    <div className="flex justify-center mt-2">
                      <p className="text-white rounded-md px-2 py-1 bg-green-400">
                        {couponInfo.coupon_code}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default PayOnDelivery;
