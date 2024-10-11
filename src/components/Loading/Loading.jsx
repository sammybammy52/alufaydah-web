import { Spinner } from "@chakra-ui/react";
import React from "react";
// import Lottie from "lottie-react";
// import Jambo from "../../../public/jambo.json";
const Loading = () => {
  return (
    // <div className="fixed top-0 z-50 h-screen w-full bg-gray-50 bg-opacity-50 blur-lg">
    //   <div className="absolute w-full h-screen justify-center items-center">
    //     <div className="flex justify-center">

    //     <Spinner className="text-primary" speed="0.4s" size={"xl"} />

    //     {/* <Lottie
    //           animationData={Jambo}
    //           className="w-[900px]"
    //           // className={"w-[2000px] max-md:w-[250px]"}
    //           loop={true}
    //         /> */}

    //     </div>

    //   </div>
    // </div>

    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-[9999] h-[100vh] w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 flex justify-center items-center">
        <Spinner className="text-primary" size={"xl"} />
      </div>
    </>
  );
};

export default Loading;
