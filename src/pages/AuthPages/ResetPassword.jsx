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
  Alert,
  AlertIcon
} from "@chakra-ui/react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginImg from "../../assets/login-image.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const { postRequestFeedback } = useDataContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const MySwal = withReactContent(Swal);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');


  const validate = () => {
    if (password != "" &&
    confirmPassword != "") {
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
    const result = await postRequestFeedback("reset-password", {
      email: email,
      token: token,
      password: password,
      password_confirmation: confirmPassword,
    });

    if (result.status == 'success') {
      toast.success("Password Changed Successfully");
      MySwal.fire(
        'Password has been changed',
        'you have successfully changed your password',
        'success'
      )
      navigate('/login')
      setLoading(false);
    } else {
      window.scroll(0, 0);
      setLoading(false);
      toast.error(result.message);
      setErrors(result.errors);
    }
  };

  return (
    <>
    <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      overflowY={"auto"}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create New Password</Heading>
          {errors && (
                <Stack spacing={3}>
           
                  {errors.password && (
                    <Alert status="error">
                      <AlertIcon />
                      {errors.password[0]}
                    </Alert>
                  )}

                
                </Stack>
              )}
          <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <div
                    className="absolute right-3 top-3 z-20"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <AiOutlineEyeInvisible size={26} />
                    ) : (
                      <AiOutlineEye size={26} />
                    )}
                  </div>
                  <Input
                    type={showPass ? "text" : "password"}
                    paddingY={"6"}
                    paddingRight={"10"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </FormControl>

              <FormControl id="password">
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <div
                    className="absolute right-3 top-3 z-20"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <AiOutlineEyeInvisible size={26} />
                    ) : (
                      <AiOutlineEye size={26} />
                    )}
                  </div>
                  <Input
                    type={showPass ? "text" : "password"}
                    paddingY={"6"}
                    paddingRight={"10"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </FormControl>
          
          <Stack spacing={6}>

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

export default ResetPassword;
