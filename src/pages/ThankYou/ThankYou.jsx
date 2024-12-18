import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const ThankYou = () => {
    const { ref } = useParams();
  return (
    <>
    <Helmet>
        <title>Thank You!</title>
      </Helmet>
    <div class="flex items-center justify-center h-screen max-md:px-3">
      <div>
        <div class="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 class="text-4xl font-bold">Thank You !</h1>
          <p>
            Thank you for your patronage, Your Transaction Reference is <span className="text-[#206a24]">{ref}</span> Check your email for the full details.
          </p>
          <a href="/" class="inline-flex items-center px-4 py-2 text-white bg-[#206a24] border border-[#206a24] rounded rounded-full hover:bg-[#c20959de] focus:outline-none focus:ring">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span class="text-sm font-medium">Home</span>
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default ThankYou;
