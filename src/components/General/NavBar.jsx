import { useState, useEffect, useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
import ALogo from "../../assets/al-logo.png";
import { FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BiHelpCircle } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import "../../App.css";
import MobileSideBar from "../Special/MobileSideBar";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { MdSell } from "react-icons/md";

const NavBar = ({ hideSearchBar }) => {
  const [isOpen, setOpen] = useState(false);
  const { totalQuantities } = useCartContext();
  const { getRequest, categoryStore, handleCategoryStore } = useDataContext();
  const { user } = useAuthContext();
  const [categories, setCategories] = useState(null);
  const [query, setQuery] = useState("");

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!isOpen);
  };
  const [searchFocus, setSearchFocus] = useState("products");

  const handleSearch = () => {
    if (query != "") {
      if (searchFocus === 'products') {
      return navigate("/catalog/" + query);
    }else{
      return navigate("/vendor-directory?page=1&search=" + query);
    }
    } else {
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Perform desired action or submit the form
      handleSearch();
      event.preventDefault(); // Prevents form submission if using within a form
    }
  };

  const getCategories = async () => {
    if (categoryStore) {
      setCategories(categoryStore);
      return;
    }
    const result = await getRequest("client/all-categories");
    if (result) {
      setCategories(result);
      handleCategoryStore(result);
    }
  };
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getCategories();
  }, []);

  return (
    <div>
      <div
        className={`navbar-contaner ${
          hideSearchBar ? "bg-transparent absolute z-50" : "bg-primary"
        } w-full h-[100px] max-[1000px]:hidden`}
      >
        <div className="navbar-content-box max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between px-[50px]">
            <div className="burger-logo flex mr-[74px]">
              <div className="py-[36px] dropdown">
                <GiHamburgerMenu color="white" size={30} />

                <div className=" bg-primary absolute z-20 p-4 rounded-md shadow-xl border-[0.1px] border-primary mt-4 dropdown-content w-[200px]">
                  <ul className="">
                    {categories &&
                      categories.map((i) => (
                        <Link to={`/category/${i.slug}`}>
                          <li className="text-white hover:opacity-70 py-2">
                            {i.category_name}
                          </li>
                        </Link>
                      ))}
                  </ul>
                </div>
              </div>
              <Link to="/">
                <img src={ALogo} alt="" className="w-[60px] mt-6 ml-4" />
              </Link>
            </div>
            {!hideSearchBar && (
              <div className="nav-search-box my-auto flex justify-center items-center">
                <div className="input-container relative">
                  {/* <FaSearch className="absolute left-3 top-3" size={20} /> */}
                  <input
                    type="text"
                    placeholder={`Search for all ${searchFocus}`}
                    className="py-[12px] pl-[16px] pr-20 rounded-[5px] lg:min-w-[404px]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                   <select onChange={(e) => setSearchFocus(e.target.value)} className="text-gray-800 text-sm absolute right-20 top-4 outline-none">
                        <option value="products">Products</option>
                        <option value="vendors">Vendors</option>
                      </select>
                  <div className="nav-search-btn absolute right-1 top-[6px]">
                  <button
                    className="py-[10px] px-[20.5px] bg-secondary rounded-[5px] text-white"
                    onClick={handleSearch}
                  >
                    <FaSearch/>
                  </button>
                </div>
                </div>

                
              </div>
            )}
            <div className="nav-profile-cart-help gap-4 flex my-auto justify-end py-4 px-3 relative">
              <div className="text-white text-sm flex items-center gap-1 dropdown">
                <BsFillPersonFill />{" "}
                {user ? (
                  <>
                    <p className="mt-1">{user.firstName}</p>
                  </>
                ) : (
                  <p className="mt-1">Account</p>
                )}{" "}
                <IoIosArrowDown size={24} />
                <div className=" bg-[#206a24] absolute z-20 top-[1px] p-4 rounded-md shadow-xl border-[0.1px] border-primary mt-6 dropdown-content w-[150px]">
                  <ul className="">
                    {user ? (
                      <>
                        <Link to="/dashboard">
                          <li className="text-white hover:opacity-70 py-2">
                            My Profile
                          </li>
                        </Link>

                        <Link to="/logout">
                          <li className="text-white hover:opacity-70 py-2">
                            Logout
                          </li>
                        </Link>
                      </>
                    ) : (
                      <Link to="/login">
                        <li className="text-white hover:opacity-70 py-2">
                          Sign In
                        </li>
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
              <Link to={`/tracking`}>
                <div className="text-white text-sm flex justify-center items-center gap-1">
                  <HiLocationMarker  />{" "}
                  <p className="mt-1">tracking</p>
                </div>
              </Link>
              <Link to={`/become-a-vendor`}>
                <div className=" flex justify-center text-sm items-center gap-1 text-white">
                  <MdSell size={20} /> <p className="mt-1">Become a vendor</p>
                </div>
              </Link>
              <span className="cart-item-qty">{totalQuantities}</span>
              <Link
                to="/cart"
                className="text-white text-sm flex gap-1 items-center relative"
              >
                <IoMdCart /> <p className="mt-1">Cart</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden max-[1000px]:block">
        <MobileSideBar
          open={isOpen}
          categories={categories && categories}
          handleOpen={handleOpen}
        />
        <div
          className={`mobile-nav-container ${
            hideSearchBar
              ? "bg-transparent absolute z-50 w-full"
              : "bg-primary"
          }`}
        >
          <div className="mobile-nav-upper flex justify-between">
            <div className="flex">
              <div className={isOpen ? "z-50 " : "z-50"}>
                <Hamburger toggled={isOpen} toggle={setOpen} color="#fff" />
              </div>

              <Link to="/">
                <img className="mt-2" src={ALogo} alt="" width={40} />
              </Link>
            </div>

            <div className="flex my-auto gap-4 mr-4">
              <Link to={ user ? "/dashboard" : "/login"}>
                <BsFillPersonFill color="white" size={24} />
              </Link>
              <span className="cart-item-qty">{totalQuantities}</span>
              <Link to="/cart">
                <IoMdCart color="white" size={24} />
              </Link>
            </div>
          </div>

          <div className="mobile-nav-lower">
            {!hideSearchBar && (
              <div className="search-div flex">
                <div className="nav-input-div relative w-[80vw]">
                  <FaSearch className="absolute top-5 left-4" />
                  <input
                    type="text"
                    className="py-2 px-8 m-2 rounded-[5px] w-[70vw]"
                    placeholder="I am looking for"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="mobile-search-btn mr-3 my-auto w-full">
                  <button
                    className=" py-2 px-4 bg-[#000000] text-white rounded-[5px] w-full"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
