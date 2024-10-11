import { useState, useEffect, useRef } from "react";
import Footer from "../../components/General/Footer";
import NavBar from "../../components/General/NavBar";
import ProductCard from "../../components/Special/ProductCard";
import { Avatar, Input } from "@chakra-ui/react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
} from "@chakra-ui/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Pagination from "../../components/General/Pagination";
import { Helmet } from 'react-helmet';
import PromoRow from "../../components/General/PromoRow";


const BrandPage = () => {
  const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    // Get existing query parameters
    const existingParams = Object.fromEntries(searchParams);

  const { postRequest, showRequest, getRequest, categoryStore, handleCategoryStore } = useDataContext();
  const [loading, setLoading] = useState(false);
  //mobile filter toggle
  const [mobileFilter, setMobileFilter] = useState(false);

  const [data, setData] = useState(null);
  const [allCategories, setAllCategories] = useState(null);

  // const [brandName, setBrandName] = useState("");
  const brandName = searchParams.get("brandName");
  // const [brandId, setBrandId] = useState(null);
  const brandId = searchParams.get("brandId");

  // const [brandImg, setBrandImg] = useState(null)
  const brandImg = searchParams.get("brandImg");
  // const [category, setCategory] = useState("");
  const category = searchParams.get("category");

  //pagination functionality
  //const [page, setPage] = useState(1);
  const page = searchParams.get("page");

  // const [from, setFrom] = useState(0);
  const from = searchParams.get("from");
  // const [to, setTo] = useState(0);
  const to = searchParams.get("to");
  // const [total, setTotal] = useState(0);
  const total = searchParams.get("total");
  // const [lastPage, setLastPage] = useState(0);
  const lastPage = searchParams.get("lastPage");

  // const [priceRange, setpriceRange] = useState([0, 1000000]);
  const priceRange = searchParams.get("priceRange");

  const handleOptionChange = (event) => {
    // setCategory(event.target.value);
    setSearchParams({ ...existingParams, category: event.target.value });
  };

  const getData = async (id) => {
    if (Number(page) > 1  || priceRange || selectedBrands || category ) {
      handleFilters(Number(page));

      return;
    }
    setLoading(true);
    const result = await showRequest("client/brand-products", id);
    if (result) {
      console.log(result);
      setData(result.products.data);
     // setAllCategories(result.all_categories);
       //setting the pagination values
       

       const newParams = {
        ...existingParams,
        page: 1,
        from: result.products.from,
        to: result.products.to,
        total: result.products.total,
        lastPage: result.products.last_page,
        brandId: result.brand.id,
        brandName: result.brand.brand_name,
        brandImg: result.brand.image
      };
      if (result.max_price && result.max_price > 0) {
        // setpriceRange([0, result.max_price]);
        newParams["priceRange"] = JSON.stringify([0, result.max_price]);
      }
      setSearchParams(newParams);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Oops, Something Happened");
    }
  };

  
  const handleNextPage = () => {
    if (Number(page) < lastPage) {
      handleFilters(Number(page) + 1);
      //setPage(page + 1);
      const newParams = {
        ...existingParams,
        page: Number(existingParams.page) + 1,
      };
      setSearchParams(newParams);
    }
  };

  const handlePrevPage = () => {
    if (Number(page) > 1) {
      handleFilters(Number(page) - 1);
      //setPage(page + 1);
      const newParams = {
        ...existingParams,
        page: Number(existingParams.page) - 1,
      };
      setSearchParams(newParams);
    }
  };

  const getCategories = async () => {
    if (categoryStore) {
      setAllCategories(categoryStore)
      return;
    } else {
      const result = await getRequest("client/all-categories");
      if (result) {
        setAllCategories(result);
        handleCategoryStore(result);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
   
    getData(id);
  }, [id]);

 
  const selectedBrands = searchParams.get('selectedBrands');

  const handleFilters = async (page) => {
    setLoading(true);
    const result = await postRequest(`client/filter?page=${page}`, {
      brand: [brandId],
      category: parseInt(category),
      min_price: JSON.parse(priceRange)[0],
      max_price: JSON.parse(priceRange)[1],
    });

    if (result) {
      setData(result.products.data);
      //setting the pagination values
      const newParams = {
        ...existingParams,
        page: page,
        from: result.products.from,
        to: result.products.to,
        total: result.products.total,
        lastPage: result.products.last_page,
      };
      setSearchParams(newParams);

      setLoading(false);
    } else {
      toast.error("Oops, Something Happened");
      setLoading(false);
    }
  };

   //anytime we apply any filters, set the page back to one if it isnt one
   useEffect(() => {
    if (Number(page) !== 1) {
      const newParams = { ...existingParams, page: 1 };
      setSearchParams(newParams);
    }
  }, [selectedBrands, priceRange]);

  useEffect(() => {
    const handleBackButton = (event) => {
      navigate("/")
    };

    // Event listener for the popstate event
    window.addEventListener('popstate', handleBackButton);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);


  return (
    <>
    <Helmet>
        <title>Everything {id}</title>
      </Helmet>
    <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          

          <div className="cat-page-section-container px-[50px] max-md:px-2 mt-[50px]">
            <div className="cat-page-card-box max-w-[1440px] mx-auto">
             
              <div className="main-stuff mt-[21px] mb-[50px]">
                <div className="hidden max-md:flex justify-end my-2">
                  <button
                    className="mobile-filter py-2 px-4 border-[1px] flex gap-2 rounded-md"
                    onClick={() => setMobileFilter(!mobileFilter)}
                  >
                    <p> Filters</p>{" "}
                    <span className="pt-1">
                      <HiOutlineAdjustmentsHorizontal />
                    </span>
                  </button>
                </div>

                <div className="lg:grid lg:grid-cols-4 gap-8">
                  <div
                    className={
                      mobileFilter
                        ? "filter-div lg:shadow-xl rounded-md p-4 lg:border-t-2 transition-all duration-300"
                        : "filter-div lg:shadow-xl rounded-md p-4 lg:border-t-2 max-[1000px]:h-0 transition-all duration-300"
                    }
                  >
                    <div className={mobileFilter ? "" : "max-[1000px]:hidden"}>
                      <h3>Filters</h3>

                      <h3 className="mt-10 uppercase mb-2 ml-2 text-sm font-semibold">
                        Category
                      </h3>
                      <Select
                        placeholder="All"
                        value={category}
                        onChange={handleOptionChange}
                      >
                        {allCategories &&
                          allCategories.map((i) => (
                            <option value={i.id}>
                              {i.category_name}
                            </option>
                          ))}
                      </Select>

                      <div className="price-div py-8">
                        <h3 className=" uppercase mb-2 ml-2 text-sm font-semibold">
                          Price (N)
                        </h3>
                        <RangeSlider
                          aria-label={["min", "max"]}
                          colorScheme="pink"
                          min={0}
                          max={1000000}
                          step={1000}
                          defaultValue={JSON.parse(priceRange)}
                          onChangeEnd={(val) =>
                            setSearchParams({
                              ...existingParams,
                              priceRange: JSON.stringify(val),
                            })
                          }
                        >
                          <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                          </RangeSliderTrack>
                          <RangeSliderThumb index={0} />
                          <RangeSliderThumb index={1} />
                        </RangeSlider>

                        <div className="flex gap-3">
                          <div>
                            <p className="mb-2">Min.</p>
                            <Input
                              placeholder="from"
                              value={
                                JSON.parse(priceRange) &&
                                JSON.parse(priceRange)[0]
                              }
                              onChange={(e) =>
                                setSearchParams({
                                  ...existingParams,
                                  priceRange: JSON.stringify([
                                    e.target.value,
                                    JSON.parse(priceRange)[1],
                                  ]),
                                })
                              }
                            />
                          </div>
                          <div>
                            <p className="mb-2">Max.</p>
                            <Input
                              placeholder="from"
                              value={
                                JSON.parse(priceRange) &&
                                JSON.parse(priceRange)[1]
                              }
                              onChange={(e) =>
                                setSearchParams({
                                  ...existingParams,
                                  priceRange: JSON.stringify([
                                    JSON.parse(priceRange)[0],
                                    e.target.value,
                                  ]),
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      

                      <div className="filter-btn-div flex justify-center my-4">
                        <button
                          className="apply-filter py-2 px-4 bg-[#206a24] text-white rounded-md hover:scale-110 transition-all"
                          onClick={() => handleFilters(page)}
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="products col-span-3 shadow-xl rounded-md px-4 lg:px-[46px] py-[24px] border-t-2">
                    <div className="toprow py-4 flex justify-center">
                      <div className="mb-6">
                            <div>
                         
                              <img class="w-[150px] h-[150px] object-cover p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`${import.meta.env.VITE_FULL_URL}/${import.meta.env.VITE_IMAGE_URL}/${brandImg}`} alt="Bordered avatar"></img>
                            </div>
                        <h4 className="text-xl text-center pt-2 font-semibold">{brandName} Store</h4>
                      </div>
                      
                    </div>
                    <div className="grid grid-cols-5 gap-y-4 max-md:grid-cols-3 max-sm:grid-cols-2">
                      <PromoRow data={data}/>
                      {data && (
                        data.map((i) => <ProductCard key={i.id} product={i} />)
                      ) }
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
  )
}

export default BrandPage