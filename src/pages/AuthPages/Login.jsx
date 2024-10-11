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
  Center,
} from "@chakra-ui/react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginImg from "../../assets/login-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import Logo from "../../assets/al-logo.png";

const Login = () => {
  const { user, handleChange } = useAuthContext();
  const { postRequestFeedback } = useDataContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState(null);

  const validate = () => {
    if (email != "" && password != "") {
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
    const result = await postRequestFeedback("login-customer", {
      email: email,
      password: password,
    });

    if (result.token) {
      toast.success("Login Success!");
      handleChange(result.user, result.token);
      setLoading(false);
    } else {
      window.scroll(0, 0);
      console.log(result);
      setLoading(false);
      toast.error("Invalid username or Password");
      setErrors(result?.errors);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
    <Helmet>
        <title>Login</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Stack
          minH={"100vh"}
          direction={{ base: "column", md: "row" }}
          overflowY={"auto"}
        >
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
            <Center>

<img src={Logo} alt="" className="w-[100px]"/>
  </Center>
              <Heading fontSize={"2xl"}>Sign in to your account</Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  paddingY={"6"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
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
              <Stack spacing={6}>
                <div className="flex flex-col">
                  <Link to="/register">
                    <ChakLink color={"blue.500"}>Create New Account</ChakLink>
                  </Link>

                  <Link to="/forgot-password">
                    <ChakLink color={"blue.500"}>Forgot Password</ChakLink>
                  </Link>
                </div>

                <Button
                  backgroundColor={"#206a24"}
                  _hover={{ backgroundColor: "#206a24", opacity: 0.7 }}
                  color={"#fff"}
                  paddingY={"7"}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
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
      )}
    </>
  );
};

export default Login;
