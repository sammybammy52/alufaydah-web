import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/DataContext";
import Dashboard from "../UserArea/Dashboard";
import { FaTruckLoading } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const TrackingPage = () => {
  const { getRequest } = useDataContext();
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await getRequest(`client/tracking/${trackingId}`);
    if (result) {
      setOrder(result);
    }
    else if (result == "") {
      toast.warning("order does not exist")
      setOrder(null)
    }
    setLoading(false);
  };
  return (
    <>
    <Helmet>
        <title>Tracking Page</title>
      </Helmet>
    <Dashboard>
      <h1>Tracking</h1>

      <form
        className="lg:grid lg:grid-cols-10 gap-4 mt-8"
        onSubmit={handleSubmit}
      >
        <div className="col-span-7 w-full max-md:mb-4">
          <input
          required
            type="text"
            className="py-3 px-4 border-2 w-full rounded-md"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
        </div>

        <div className="col-span-3 h-full w-full">
          <button className="bg-primary text-white px-4 py-2 w-full h-full rounded-md">
            Track
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center my-10">
          <Spinner
            className="text-primary"
            speed="0.95s"
            size={"lg"}
            thickness={"3px"}
          />
        </div>
      )}
      {
        !order && <div className="flex justify-center my-10">
        <p className="text-gray-600">Track your orders with your order number</p>
      </div>
      }

      <div className="px-10 py-10">
        {order && 
<ol className="relative text-gray-400 border-l border-gray-200  ">                  
  <li className="mb-10 ml-6">            
    <span className={`absolute flex items-center justify-center w-8 h-8 ${ order?.status == "processing" ? "bg-yellow-400" : "bg-green-200"} rounded-full -left-4 ring-4 ring-white `}>
      {
        order?.status == "processing" ? <FaTruckLoading size={18} className="text-white"/> : <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5.917 5.724 10.5 15 1.5" />
      </svg>
      }

      
    </span>
    <h3 className={`${order?.status == "processing" && "text-gray-900"} font-medium leading-tight`}>Processing</h3>
    <p className={`text-sm ${order?.status == "processing" && "text-gray-900"}`}>{
      order?.status == "processing" && <>Your order has been recieved and is now being processed, you will be notfied when its time for delivery </>
    }</p>
  </li>
  <li className="mb-10 ml-6">
  <span className={`absolute flex items-center justify-center w-8 h-8 ${ order?.status == "delivered" ? "bg-green-200" : order?.status == "in transit" ? "bg-yellow-400" : "bg-gray-100"} rounded-full -left-4 ring-4 ring-white `}>
      {
        order?.status == "in transit" ? <TbTruckDelivery size={18} className="text-white"/> : order?.status == "delivered" ? <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5.917 5.724 10.5 15 1.5" />
      </svg> : <TbTruckDelivery size={18} className="text-gray-500"/>
      }

      
    </span>
    <h3 className={`${order?.status == "in transit" && "text-gray-900"} font-medium leading-tight`}>Out for delivery</h3>
    <p className={`text-sm ${order?.status == "in transit" && "text-gray-900"}`}>{
      order?.status == "in transit" && <>Your Order has been sent out for delivery click <Link to={`/dashboard/my-orders/${trackingId}`} className="text-primary">here</Link> to get delivery code or check your email</>
    }</p>
  </li>
  <li className="mb-10 ml-6">
  <span className={`absolute flex items-center justify-center w-8 h-8 ${ order?.status == "delivered" ? "bg-green-200" : "bg-gray-100"} rounded-full -left-4 ring-4 ring-white `}>
      {
        order?.status == "delivered" ? <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5.917 5.724 10.5 15 1.5" />
      </svg> : <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
            </svg>
      }

      
    </span>
    <h3 className={`${order?.status == "delivered" && "text-gray-900"} font-medium leading-tight`}>Delivered</h3>
    <p className={`text-sm ${order?.status == "delivered" && "text-gray-900"}`}>{
      order?.status == "delivered" && <>Your order has been delivered </>
    }</p>
  </li>
  
</ol>


}
      </div>
    </Dashboard>
    </>
  );
};

export default TrackingPage;
