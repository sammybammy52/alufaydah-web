import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import AddressCreate from "./modals/AddressCreate";
import { useDisclosure } from "@chakra-ui/react";
import AddressCard from "../../components/General/AddressCard";
import { useDataContext } from "../../context/DataContext";
import { useAuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
const Addresses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  const { getRequest } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    const getData = async (id) => {
      setLoading(true);
      const result = await getRequest(`client/get-addresses/${id}`);
      if (result) {
        setAddresses(result);
      }
      setLoading(false);
    };
    getData(user.id);
  }, []);
  return (
    <>
    <Helmet>
        <title>Addresses</title>
      </Helmet>
      {loading && <Loading />}
      <Dashboard>
        <AddressCreate isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <div className="top-row flex justify-between">
          <h1>Address Book</h1>

          <div>
            <button
              className="bg-[#206a24] text-white px-4 py-2 rounded"
              onClick={onOpen}
            >
              Add Address
            </button>
          </div>
        </div>
        <div
          className={
            addresses &&
            (addresses.length < 1 ? "flex justify-center p-8" : "hidden")
          }
        >
          <h2>No addresses found</h2>
        </div>
        <div className="lg:grid lg:grid-cols-2 py-4 gap-4">
          {addresses &&
            addresses.map((i) => <AddressCard key={i.id} data={i} />)}
        </div>
      </Dashboard>
    </>
  );
};

export default Addresses;
