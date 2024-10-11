import { useState, useEffect } from "react";
import { Container, RadioGroup, Radio } from "@chakra-ui/react";
import { useCartContext } from "../../context/CartContext";
import Currency from "react-currency-formatter";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/General/NavBar";
import Footer from "../../components/General/Footer";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { BiEdit } from "react-icons/bi";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const { totalPrice, totalQuantities, } = useCartContext();

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { getRequest } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({});
  const [value, setValue] = useState("");
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

  const handleContinue = () => {
    if (Object.keys(defaultAddress).length < 1) {
      return toast.error("No Address Selected")
    }

    if (value  == "") {
      return toast.error("Please select a delivery method")
    }

    if (value == "pod") {
       navigate("/order-confirmation")
    }
    else{
      navigate("/online-payment")
    }
   


  }

  return (
    <>
    <Helmet>
        <title>Checkout</title>
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
                      <h4 className="text-lg font-semibold">
                        1. Address Information
                      </h4>
                    </div>

                    {Object.keys(defaultAddress).length < 1 ? (
                      <>
                        <div className="border-[1px] rounded p-4 flex justify-center">
                          <div>
                            <p className="mb-3">No Addresses Available </p>

                            <Link to="/dashboard/addresses">
                              <button className=" flex justify-center   py-2 px-4 rounded bg-[#206a24] hover:scale-105 transition-all">
                                <p className="text-white flex gap-2">
                                  Add an Address <BiEdit size={20} />
                                </p>
                              </button>
                            </Link>
                           
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className=" border-[1px]  rounded p-4 mb-3">
                          <h3 className=" font-semibold">
                            {defaultAddress?.address}
                          </h3>
                          <div className="flex gap-2">
                            <p className="text-sm">
                              {defaultAddress?.state_name},
                            </p>
                            <p className="text-sm">
                              {defaultAddress?.lga_name}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <p className="text-sm font-semibold">
                              {defaultAddress?.phone_1}
                            </p>
                            <p className="text-sm font-semibold">
                              {defaultAddress?.phone_2}
                            </p>
                          </div>
                          <div className="button-div flex gap-2">
                            <button className=" flex justify-center border-[1px]  py-2 px-4 rounded">
                              <p className="text-sm">Default Address</p>
                            </button>
                            <Link to="/dashboard/addresses">
                              <button className=" flex justify-center   py-2 px-4 rounded bg-[#206a24] hover:scale-105 transition-all">
                                <p className="text-white flex gap-2 text-sm">
                                  Change Address <BiEdit size={20} />
                                </p>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="">
                    <div className="toprow py-2">
                      <h4 className="text-lg font-semibold">
                        2. Delivery Type
                      </h4>
                    </div>
                    <p className="text-sm mb-3">Select Delivery Type</p>
                    <div className=" border-[1px]  rounded p-4 mb-3">
                      <RadioGroup onChange={setValue} value={value}>
                        <div className="lg:grid lg:grid-cols-2 py-4 gap-3 ">
                          <div
                            className={
                              value == "po"
                                ? "border-[1px] bg-[#206a24] rounded-md p-6 max-md:mb-3"
                                : "border-[1px] rounded-md p-6 max-md:mb-3"
                            }
                            onClick={() => setValue("po")}
                          >
                            <Radio colorScheme="pink" value="po">
                              <p
                                className={
                                  value == "po"
                                    ? "text-sm font-semibold text-white"
                                    : "text-sm font-semibold"
                                }
                              >
                                Pay Online
                              </p>
                            </Radio>
                          </div>

                          <div
                            className={
                              value == "pod"
                                ? "border-[1px] bg-[#206a24] rounded-md p-6"
                                : "border-[1px] rounded-md p-6"
                            }
                            onClick={() => setValue("pod")}
                          >
                            <Radio
                              color="#206a24"
                              colorScheme="pink"
                              value="pod"
                            >
                              <p
                                className={
                                  value == "pod"
                                    ? "text-sm font-semibold text-white"
                                    : "text-sm font-semibold"
                                }
                              >
                                Pay On Delivery
                              </p>
                            </Radio>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="filter-div shadow-xl rounded-md p-4 border-t-2 h-[200px]">
                  <h3 className="border-b pb-2">Checkout Price</h3>

                  <div className="flex my-4 justify-between">
                    <p className="text-sm">
                      Total Quantities ({totalQuantities && totalQuantities})
                    </p>
                  </div>

                  <div className="flex my-4 justify-between">
                    <p className=" font-semibold uppercase">Subtotal:</p>
                    <p>
                      <Currency
                        quantity={totalPrice && totalPrice}
                        currency="NGN"
                      />
                    </p>
                  </div>
               
                    <button className="w-full bg-[#206a24] py-2 text-white rounded-md hover:scale-105 transition-all hover:opacity-80" onClick={handleContinue}>
                      Continue
                    </button>
           
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

export default Checkout;
