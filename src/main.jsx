import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { CartContext } from "./context/CartContext";
import { ChatNotifyProvider } from "./context/ChatNotifyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartContext>
        <DataProvider>
        <ChatNotifyProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ChatNotifyProvider>
        </DataProvider>
      </CartContext>
    </AuthProvider>
  </React.StrictMode>
);
