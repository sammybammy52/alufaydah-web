import { useState, useEffect, useRef } from "react";
import Footer from "../../components/General/Footer";
import NavBar from "../../components/General/NavBar";
import TopBrands from "../../components/General/TopBrands";
import ProductCard from "../../components/Special/ProductCard";
import { Avatar, Input, useDisclosure } from "@chakra-ui/react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
  CheckboxGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
// import FallBackLogo from "../../assets/aoe.png";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { convertStringsToNumbers } from "../../utils/Helpers";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Pagination from "../../components/General/Pagination";
import { useAuthContext } from "../../context/AuthContext";
import CustomPlayBtn from "../../components/General/CustomPlayBtn";
import VideoModal from "../../components/Modals/VideoModal";
import BusinessListingCard from "../../components/Special/BusinessListingCard";
import { Helmet } from "react-helmet";

const VendorDirectory = () => {
  // const { user } = useAuthContext();
  const { postRequest, showRequest, getRequest } = useDataContext();
  const [loading, setLoading] = useState(false);
  //mobile filter toggle
  const [mobileFilter, setMobileFilter] = useState(false);
  const [data, setData] = useState(null);

  const getData = async (page=null) => {
    setLoading(true);
    const result = await getRequest(`client/vendor-directory?page=${page ? page : 1}&search=${search}`);
    if (result) {
      console.log(result);
      setData(result.data.data);
      //setting the pagination values
      setFrom(result.data.from);
      setTo(result.data.to);
      setTotal(result.data.total);
      setLastPage(result.data.last_page);
    //   handleFilters(Number(page), result.vendor.id, result.vendor.role);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Oops, Something Happened");
    }
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  //pagination functionality
  const search = queryParams.get("search");
  const [page, setPage] = useState(queryParams.get("page") || 1);
  const [from, setFrom] = useState(queryParams.get("from") || 0);
  const [to, setTo] = useState(queryParams.get("to") || 0);
  const [total, setTotal] = useState(queryParams.get("total") || 0);
  const [lastPage, setLastPage] = useState(queryParams.get("lastPage") || 0);

  const handleNextPage = () => {
    if (page < lastPage) {
      handleFilters(page + 1);
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      handleFilters(page - 1);
      setPage(page - 1);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleFilters = async (page, vendor_id = null, vendor_role = null) => {
    getData(page)
  };

  //anytime we apply any filters, set the page back to one if it isnt one
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [search]);


  const navigate = useNavigate();
  //change url
  useEffect(() => {
    navigate(
      `?page=${page}&search=${search}&from=${from}&to=${to}&total=${total}&lastPage=${lastPage}`
    );
  }, [page, from, to, total, lastPage, search]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
     <Helmet>
        <title> Vendor Search Results for {search}</title>
      </Helmet>
      <NavBar hideSearchBar={false} />
      {loading ? (
        <Loading />
      ) : (
        <>

          <div className="cat-page-section-container px-[50px] max-md:px-2 mt-[50px]">
            <div className="cat-page-card-box max-w-[1440px] mx-auto  bg-white rounded-t-lg">
              <div className="main-stuff mt-[21px] mb-[50px]">
                {/* <div className="hidden max-md:flex justify-end my-2">
                  <button
                    className="mobile-filter py-2 px-4 border-[1px] flex gap-2 rounded-md"
                    onClick={() => setMobileFilter(!mobileFilter)}
                  >
                    <p> Filters</p>{" "}
                    <span className="pt-1">
                      <HiOutlineAdjustmentsHorizontal />
                    </span>
                  </button>
                </div> */}

                <div className=" gap-8">
                  <div className="products shadow-xl rounded-md px-4 lg:px-[46px] py-[24px] border-t-2">
                  <h3 className="text-lg font-semibold mb-5">
                      Showing ({total}) results for "{search}"
                    </h3>
                    <div className="">
                      {data ? (
                        data?.map((i) => <BusinessListingCard key={i?.id} business={i} />)
                      ) : (
                        <>
                          <div className="flex justify-center py-10">
                            <h1>Nothing Here...</h1>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="pt-20">
                      <Pagination
                        from={from}
                        to={to}
                        total={total}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default VendorDirectory;
