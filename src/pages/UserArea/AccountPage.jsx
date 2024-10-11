import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,

} from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import { useAuthContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet";
const AccountPage = () => {
  const { user } = useAuthContext();
  return (
    <>
    <Helmet>
        <title>Account Page</title>
      </Helmet>
    <Dashboard>
      <Flex justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          border={"1px"}
          borderColor="gray.300"
          boxShadow={"lg"}
          p={6}
          pb={12}
          my={12}
          mb={20}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            My Profile
          </Heading>
          <FormControl id="userName">
         
            
              <div className="flex justify-center">
              <Avatar name={user.firstName} size="lg" backgroundColor="gray.400" />
              </div>
              <div className="full-name flex justify-center mt-3 font-semibold">
                <h1 className="text-md uppercase">{user.firstName} {user.
                lastName}</h1>
              </div>
       
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={user.email}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={user.firstName}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={user.lastName}
            />
          </FormControl>
          
        </Stack>
      </Flex>
    </Dashboard>
    </>
  );
};

export default AccountPage;
