import AOE1 from "../../assets/aoe-1.png";
import AOE2 from "../../assets/aoe-2.png";
import AOE3 from "../../assets/aoe-3.png";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NavBar from "../../components/General/NavBar";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/DataContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TermsConditions from "./TermsConditions";
import Loading from "../../components/Loading/Loading";
import { useAuthContext } from "../../context/AuthContext";

const VendorOnboarding = () => {
  const { handleUser } = useAuthContext();
  const MySwal = withReactContent(Swal);
  const { getRequest } = useDataContext();
  const [checkbox, setCheckbox] = useState(false);
  const [loading, setLoading] = useState(false);

  const vendorCheck = async() => {
    setLoading(true);
    const result = await getRequest(`vendor-check`);
    if (result.status === 'success') {
      if (Number(result.isVendor)) {
        window.location.href = import.meta.env.VITE_VENDOR_URL
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    vendorCheck();
  }, [])
  

  const handleSubmit = async () => {
    setLoading(true);
    toast.loading("Activating your vendor account...");

    const result = await getRequest(`activate-vendor-account`);

    if (result.status === 'success') {
      handleUser(result.vendor);
      toast.dismiss();
      MySwal.fire(
        "Vendor Account Activated",
        "you are now a vendor",
        "success"
      ).then((res) => {
        if (res.isConfirmed) {
          window.location.href = import.meta.env.VITE_VENDOR_URL;
        }
      });
    } else {
      toast.dismiss();
      toast.error("Something went wrong!")
    }
    setLoading(false);
  };
  return (
    <>
    {loading && <Loading/>}
      <NavBar />

      <div className="bg-gray-50 flex justify-center items-center h-[100vh]">
        <div className="bg-white border shadow-sm max-w-screen-md w-full mx-auto rounded-md  p-5">
          <h1 className="font-bold text-gray-700 text-xl mb-2">
            Become a Vendor on Jambo.ng
          </h1>

          <div className="max-h-[68vh] overflow-y-scroll">
            <p className="text-gray-700 mb-4">Terms and Conditions</p>

            <TermsConditions />
          </div>
          <div className="flex gap-2 items-center py-2 px-3 bg-primary bg-opacity-20 my-2 rounded-md">
            <input className="w-6 h-6" value={checkbox} checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} type="checkbox" name="" id="" />
            <p className="text-sm text-primary">
              By registering as a vendor on Jambo.ng, you acknowledge that you
              have read, understood, and agree to be bound by these terms and
              conditions.
            </p>
          </div>

          <button disabled={!checkbox} onClick={handleSubmit} className="bg-primary disabled:hover:cursor-not-allowed disabled:hover:opacity-60 text-white py-2 w-full rounded-md">
            Become a Vendor
          </button>
        </div>
      </div>
    </>
  );
};

export default VendorOnboarding;
