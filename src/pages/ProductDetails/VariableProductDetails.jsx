import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  VStack,
  Button,
  Heading,
  StackDivider,
  useColorModeValue,
  Spinner,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import NavBar from "../../components/General/NavBar";
import Footer from "../../components/General/Footer";
import ProductCard from "../../components/Special/ProductCard";
import { useDataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Currency from "react-currency-formatter";
import { convertToEmbedURL, truncateString } from "../../utils/Helpers";
import Loading from "../../components/Loading/Loading";
import { useCartContext } from "../../context/CartContext";
import { sortClothSizes } from "../../utils/Helpers";
import { Helmet } from "react-helmet";
import PromoData from "../../../promo.json";
import PromoDetails from "../../components/Special/PromoDetails";
import OrderInstructionsModal from "../../components/Modals/OrderInstructionsModal";
// import ChatModal from "../../components/Modals/ChatModal";
import { BsCartX, BsFillChatLeftDotsFill } from "react-icons/bs";
import { useAuthContext } from "../../context/AuthContext";
import { BiPhoneCall } from "react-icons/bi";
import PhoneModal from "../../components/Modals/PhoneModal";
import Verified from "../../assets/verified.png";

const VariableProductDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { getRequest, showRequest } = useDataContext();
  const { onAdd } = useCartContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [prodImgs, setProdImgs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const [activeProdImg, setActiveProdImg] = useState(prodImgs[0] || null);
  const [activeSize, setActiveSize] = useState(null);

  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const getProduct = async (id) => {
    setLoading(true);
    const result = await showRequest("client/product-details", id);

    if (result) {
      setProduct(result);
      setProdImgs(result.images);
      setActiveProdImg(result.images[0]);
      setLoading(false);
      if (result.type === "variation") {
        const fetchSizes = await showRequest("client/product-variations", id);
        setSizes(sortClothSizes(fetchSizes));
      }
      //get the suggested products list
      const may_like = await getRequest("client/may-like");

      if (may_like) {
        setRecommendations(may_like);
      }
    } else {
      toast.error("Oops, Error Occured");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  useEffect(() => {
    getProduct(id);
  }, [id]);

  // scroll to top
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
      });
    }, 500);
  }, [id, product]);

  const handleImgSwitch = (img) => {
    setActiveProdImg(img);
  };

  const promoAddition = (product_id) => {
    PromoData.map((i) => {
      if (i.phone_id === product_id) {
        // console.log(i.phone_id)
        // console.log("then")
        // console.log(product_id)
        return <PromoDetails data={i} />;
      }
    });
  };

  // const handleIsAbleToChat = () => {
  //   if (!user) {
  //     // handleCachedRoute(location.pathname);
  //     return navigate("/login");
  //   }
  //   onOpen();
  // };
  // //chat functionality
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // safety guidelines modal
  const [safetyModal, setSafetyModal] = useState(false);
  const handleCloseSafetyModal = () => setSafetyModal(false);
  const handleOpenSafetyModal = () => setSafetyModal(true);

  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);
  return (
    <>
      <Helmet>
        <title>{id}</title>
      </Helmet>
      <NavBar />
      {loading && <Loading />}

      {/* <ChatModal
        isOpen={isOpen}
        onClose={onClose}
        vendor_id={product?.vendor?.id}
        vendor_img={product?.vendor?.storeImg}
        storeName={product?.vendor?.storeName}
      /> */}

      {/* <OrderInstructionsModal
        isOpen={safetyModal}
        onClose={handleCloseSafetyModal}
        openChatModal={onOpen}
      /> */}

      <PhoneModal
        isOpen={modal}
        onClose={handleCloseModal}
        data={product?.vendor?.phone}
      />

      {/* <div className="mb-5 fixed z-50 bottom-4 right-8">
        <button
          className="text-white bg-primary py-4 px-6 rounded-full flex gap-2 items-center font-semibold"
          onClick={handleIsAbleToChat}
        >
          <BsFillChatLeftDotsFill size={18} /> Chat With Seller
        </button>
      </div> */}
      <Container maxW={"5xl"}>
        <div className="lg:grid lg:grid-cols-2  gap-8">
          <div className="pt-[60px]">
            <div className="border-[0.5px] mb-4 relative">
              {product?.quantity < 1 && (
                <div className="absolute z-10 w-full bg-black bg-opacity-70 py-2 gap-2 rounded-[10px] flex justify-center items-center">
                  <p className="text-white">Out of Stock</p>{" "}
                  <BsCartX className="text-white" />
                </div>
              )}
              <Image
                rounded={"md"}
                alt={"product image"}
                src={
                  activeProdImg &&
                  `${import.meta.env.VITE_FULL_URL}/${
                    import.meta.env.VITE_IMAGE_URL
                  }/${activeProdImg}`
                }
                className="object-cover"
                fit={"contain"}
                align={"center"}
                w={"100%"}
                h={{ base: "300px", sm: "400px", lg: "400px" }}
                loading="lazy"
              />
            </div>

            <div className="other-images flex gap-2 max-md:mb-[20px]">
              {prodImgs &&
                prodImgs?.map((i) => (
                  <div
                    className={
                      i == activeProdImg
                        ? " border-4 border-[#206a24] transition-all duration-150"
                        : ""
                    }
                  >
                    <img
                      src={`${import.meta.env.VITE_FULL_URL}/${
                        import.meta.env.VITE_IMAGE_URL
                      }/${i}`}
                      className="w-[70px] h-[70px] object-cover"
                      onClick={() => handleImgSwitch(i)}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className=" lg:pt-[60px]">
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "3xl" }}
              >
                {product?.product_name}
              </Heading>
              <Text className=" mt-6" fontWeight={700} fontSize={"2xl"}>
                <Currency quantity={product?.price} currency="NGN" />
              </Text>
            </Box>

            <div>
              {product?.id &&
                PromoData?.map((i) => {
                  if (i.phone_id === product?.id) {
                    return <PromoDetails data={i} />;
                  }
                })}
            </div>

            <div className="variation-div py-4">
              <div className="flex gap-2">
                {sizes?.map((i) =>
                  i.unit > 0 ? (
                    <div
                      className={
                        activeSize == i.size
                          ? "p-2 border-[2px] w-[70px] border-[#206a24]"
                          : "p-2 border-[1px] w-[70px]"
                      }
                      onClick={() => setActiveSize(i.size)}
                    >
                      {i.size}
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box>
                {product?.filler_role === "customer" ? (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative">
                      <Avatar
                        height={8}
                        width={8}
                        name={product?.vendor?.storeName}
                        src={`${import.meta.VITE_FULL_URL}/${
                          import.meta.env.VITE_IMAGE_URL
                        }/${product?.vendor?.storeImg}`}
                      />
                      {product?.is_verified && (
                        <img
                          className="w-[24px] absolute bottom-[-8px] right-[-8px]"
                          src={Verified}
                          alt=""
                        />
                      )}
                    </div>
                    <Link
                      to={`/${product?.store_slug?.name}`}
                      className=" hover:underline text-primary"
                    >
                      {product?.vendor?.storeName}
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar
                      height={7}
                      width={7}
                      name={"Jambo"}
                      color={"#fff"}
                      backgroundColor={"#206a24"}
                    />
                    <Link
                      // to={"/store/"}
                      className=" hover:underline text-primary"
                    >
                      Jambo NG
                    </Link>
                  </div>
                )}
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  className="text-gray-600"
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Description
                </Text>

                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"sm"}>
                    {readMore ? (
                      <>
                        {product?.description}{" "}
                        <p
                          className="underline cursor-pointer font-semibold"
                          onClick={() => setReadMore(false)}
                        >
                          read less
                        </p>
                      </>
                    ) : (
                      <>
                        {truncateString(product?.description, 400)}{" "}
                        <p
                          className="underline cursor-pointer font-semibold"
                          onClick={() => setReadMore(true)}
                        >
                          read more
                        </p>
                      </>
                    )}
                  </Text>
                </VStack>
              </Box>
            </Stack>

            {product?.filler_role !== "customer" ? (
              <>
               {
                product?.quantity > 1 ?  <Button
                rounded={"lg"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={"#000000"}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={() =>
                  onAdd(
                    {
                      id: product?.id,
                      name: product?.product_name,
                      category: product?.category_id,
                      description: product?.description,
                      slashed_price: product?.slashed_price,
                      price: product?.price,
                      image: product?.images[0],
                      type: product?.type,
                      size: activeSize,
                      quantity: 1,
                    },
                    1
                  )
                }
              >
                Add to cart
              </Button> : <>
              <p className="text-center font-semibold">Out of stock</p>
              </>
               }

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"center"}
                  className="mt-4"
                >
                  <MdLocalShipping />
                  <Text>Same day delivery</Text>
                </Stack>
              </>
            ) : (
              <>
                <button
                  className="text-white bg-secondary mt-4 py-4 px-6 rounded-md w-full flex justify-center gap-3 items-center font-semibold"
                  onClick={handleOpenModal}
                >
                  Show Phone Number <BiPhoneCall size={18} />
                </button>

                {/* <button
                  className="text-white bg-primary mt-8 py-4 px-6 rounded-md w-full flex justify-center gap-3 items-center font-semibold"
                  onClick={handleIsAbleToChat}
                >
                  Chat With Seller <BsFillChatLeftDotsFill size={18} />
                </button> */}
              </>
            )}
          </div>
        </div>
        <div className="mt-10">
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            className="text-[#206a24]"
            fontWeight={"500"}
            textTransform={"uppercase"}
            mb={"4"}
          >
            product specifications
          </Text>

          <ul className=" list-disc">
            {product && product?.specs.map((i) => <li>{i}</li>)}
          </ul>
        </div>

        {product?.youtube ? (
          <div className="mt-10">
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              className="text-[#206a24]"
              fontWeight={"500"}
              textTransform={"uppercase"}
              mb={"4"}
            >
              video
            </Text>
            <div className="flex justify-center">
              <iframe
                className="lg:w-[600px] w-full h-[400px]"
                src={convertToEmbedURL(product?.youtube)}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowfullscreen={true}
              ></iframe>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="may-like my-14">
          <h2 className="text-2xl font-semibold mb-5">You May Also Like</h2>
          <div className="suggestion-box grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2">
            {/* <ProductCard/>
                <ProductCard/>
                
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/> */}
            {recommendations ? (
              recommendations.map((i) => <ProductCard key={i.id} product={i} />)
            ) : (
              <div className="py-8 flex justify-center items-center">
                <Spinner
                  className="text-primary"
                  speed="0.9s"
                  size={"xl"}
                  thickness="4px"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
      {/* <div className="prod-dets-page-section-container px-[50px] max-md:px-2 mt-[50px]">
      <div className="prod-dets-page-card-box max-w-[1440px] mx-auto">

       <div className="main-stuff mt-[21px] mb-[50px]">
            
       </div>
      </div>
    </div> */}
      <Footer />
    </>
  );
};

export default VariableProductDetails;
