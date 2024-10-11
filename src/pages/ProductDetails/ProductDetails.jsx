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
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import NavBar from "../../components/General/NavBar";
import Footer from "../../components/General/Footer";
import ProductCard from "../../components/Special/ProductCard";
import { useDataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Currency from "react-currency-formatter";
import { truncateString } from "../../utils/Helpers";
import Loading from "../../components/Loading/Loading";
import { useCartContext } from "../../context/CartContext";



const ProductDetails = () => {
  const { getRequest, showRequest } = useDataContext();
  const { onAdd } = useCartContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [prodImgs, setProdImgs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const [activeProdImg, setActiveProdImg] = useState(prodImgs[0] || null);

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const getProduct = async(id) => {
    setLoading(true);
    const result = await showRequest('client/product-details', id);
    const may_like = await getRequest('client/may-like');

    if (result) {
      setProduct(result)
      setProdImgs(result.images);
      setActiveProdImg(result.images[0]);
    }
    else{
      toast.error('Oops, Error Occured');
    }

    if (may_like) {
      setRecommendations(may_like);
    }

    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);


  useEffect(() => {
    getProduct(id);
  }, [id]);


  
  const handleImgSwitch = (img) => {
    setActiveProdImg(img);
  };

  return (
    <>
    <NavBar />
      {
        loading ? <Loading/> : <>
          
      <Container maxW={"5xl"}>
        <div className="lg:grid lg:grid-cols-2  gap-8">
          <div className="pt-[60px]">
            <div className="border-[0.5px] mb-4">
              <Image
              rounded={"md"}
              alt={"product image"}
              src={activeProdImg && `${import.meta.env.VITE_FULL_URL}/${import.meta.env.VITE_IMAGE_URL}/${activeProdImg}`}
              className="object-cover"
              fit={'contain'}
              align={"center"}
              w={"100%"}
              h={{ base: "300px", sm: "400px", lg: "400px" }}
            />
            </div>
            
            <div className="other-images flex gap-2 max-md:mb-[20px]">
              {prodImgs &&
                prodImgs?.map((i) => (
                    <div className={i == activeProdImg ? " border-4 border-[#206a24] transition-all duration-150": ""}>
                        <img
                    src={`${import.meta.env.VITE_FULL_URL}/${import.meta.env.VITE_IMAGE_URL}/${i}`}
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
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                <Currency quantity={product?.price} currency="NGN"/>
              </Text>
            </Box>

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
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  className="text-[#206a24]"
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Description
                </Text>

                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"sm"}>
                    { readMore ? <>
                      {product?.description} <p className="underline cursor-pointer font-semibold" onClick={() => setReadMore(false)}>read less</p>
                    </> : <>
                    {truncateString(product?.description, 400)} <p className="underline cursor-pointer font-semibold" onClick={() => setReadMore(true)}>read more</p>
                    </>}
                  </Text>
                </VStack>
              </Box>
            </Stack>

            <Button
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
                    size: null,
                    quantity: 1,
                  },
                  1
                )
              }
            >
              Add to cart
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
              className="mt-4"
            >
              <MdLocalShipping />
              <Text>Same day delivery</Text>
            </Stack>
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
            {
              product && product?.specs.map((i) => (
                <li>{i}</li>
              ))
            }
            
          </ul>


        </div>

        {
            product?.youtube ? <div className="mt-10">
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
              <iframe className="lg:w-[600px] w-full h-[400px]" src={product?.youtube}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            
  
  
          </div> : <></>
        }

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
                {
                  recommendations && recommendations.map((i) => (
                    <ProductCard key={i.id} product={i}/>
                  ))
                }
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
      }
      
    </>
  );
};

export default ProductDetails;
