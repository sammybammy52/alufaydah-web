import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakLink,
  Stack,
  Image,
} from "@chakra-ui/react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginImg from "../../assets/login-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const { postRequestFeedback } = useDataContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const MySwal = withReactContent(Swal);

  const validate = () => {
    if (email != "" ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    const isFilled = validate();

    if (!isFilled) {
      toast.error("Please Fill All Fields");
      return;
    }
    setLoading(true);
    const result = await postRequestFeedback("forgot-password", {
      email: email,
    });

    if (result) {
      toast.success("Link Sent Successfully, Please Check Your email");
      Swal.fire(
        'Password reset link sent',
        'Please check your email and follow the instructions to reset your password',
        'success'
      )
      setLoading(false);
    } else {
      window.scroll(0, 0);
      console.log(result);
      setLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <>
    <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      overflowY={"auto"}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Forgot Password</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              paddingY={"6"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          
          <Stack spacing={6}>
          <div className="flex flex-col">
              <Link to="/login">
              <ChakLink color={"blue.500"}>Try Logging in again</ChakLink>
            </Link>

            </div>
            

            {
              loading ? <div className="flex justify-center">
                  <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#206a24"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
              </div> : <Button
              backgroundColor={"#206a24"}
              _hover={{ backgroundColor: "#206a24", opacity: 0.7 }}
              color={"#fff"}
              paddingY={"7"}
              onClick={handleSubmit}
            >
              Continue
            </Button>
            }

            
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={LoginImg}
          className="max-md:hidden"
        />
      </Flex>
    </Stack>
    </>
    
  );
};

export default ForgotPassword;
