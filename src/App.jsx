import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Loading from "./components/Loading/Loading";

// Lazy-loaded components
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PrivateRoutes = lazy(() => import("./utils/PrivateRoutes"));
const Category = lazy(() => import("./pages/CategoryPage/Category"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("./pages/CartPage/Cart"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Login = lazy(() => import("./pages/AuthPages/Login"));
const Register = lazy(() => import("./pages/AuthPages/Register"));
const AccountPage = lazy(() => import("./pages/UserArea/AccountPage"));
const MyOrders = lazy(() => import("./pages/UserArea/MyOrders"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Addresses = lazy(() => import("./pages/UserArea/Addresses"));
const Logout = lazy(() => import("./pages/AuthPages/Logout"));
const PaymentPage = lazy(() => import("./pages/PaymentPage/PaymentPage"));
const ThankYou = lazy(() => import("./pages/ThankYou/ThankYou"));
const VariableProductDetails = lazy(() =>
  import("./pages/ProductDetails/VariableProductDetails")
);
const TrackOrders = lazy(() => import("./pages/UserArea/TrackOrders"));
const PlayCenter = lazy(() => import("./pages/PlayCenter/PlayCenter"));
const BrandPage = lazy(() => import("./pages/BrandPage/BrandPage"));
const ForgotPassword = lazy(() => import("./pages/AuthPages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/AuthPages/ResetPassword"));
const TrackingPage = lazy(() => import("./pages/TrackingPage/TrackingPage"));
const PublicTracking = lazy(() =>
  import("./pages/TrackingPage/PublicTracking")
);
const PayOnDelivery = lazy(() => import("./pages/PaymentPage/PayOnDelivery"));
const VendorOnboarding = lazy(() =>
  import("./pages/VendorOnboarding/VendorOnboarding")
);
const ShopPages = lazy(() => import("./pages/ShopPages/ShopPages"));
import Layout from "./components/General/Layout";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import Chats from "./pages/UserArea/Chats";
import VendorDirectory from "./pages/VendorDirectory/VendorDirectory";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-P9CMKKPQQV"); // Replace 'YOUR_TRACKING_ID' with your actual ID
    ReactGA.pageview(window.location.pathname + window.location.search);

    const options = {
      autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
      debug: false, // enable logs
    };
    ReactPixel.init("gmslxerdkjm0k370zdqq2o5zjsw3lk", {}, options);
    ReactPixel.pageView(); // For tracking page view
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/**Public Routes */}

        <Route index element={<HomePage />} />
        <Route path="/play-center" element={<PlayCenter />} />
        <Route path="/brands/:id" element={<BrandPage />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/catalog/:q" element={<Catalog />} />
        <Route path="/vendor-directory" element={<VendorDirectory />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/v-products/:id" element={<VariableProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tracking" element={<PublicTracking />} />

        {/*Protected Routes */}

        <Route element={<PrivateRoutes />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<AccountPage />} />
          <Route path="/dashboard/my-orders" element={<MyOrders />} />
          <Route path="/dashboard/my-orders/:id" element={<TrackOrders />} />
          <Route path="/dashboard/chats" element={<Chats />} />
          <Route path="/dashboard/tracking-page" element={<TrackingPage />} />
          <Route path="/become-a-vendor" element={<VendorOnboarding />} />
          <Route path="/dashboard/addresses" element={<Addresses />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/online-payment" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<PayOnDelivery />} />
          <Route path="/thank-you/:ref" element={<ThankYou />} />
        </Route>
        
        <Route path="/:id" element={<ShopPages/>} />
      </Route>
    )
  );

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
