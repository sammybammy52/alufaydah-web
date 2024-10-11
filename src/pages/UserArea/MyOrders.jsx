import { useState, useEffect} from 'react'
import MyOrderSection from '../../components/Special/MyOrderSection'
import Dashboard from './Dashboard'
import { useDataContext } from '../../context/DataContext'
import { useAuthContext } from '../../context/AuthContext'
import Loading from '../../components/Loading/Loading';
import { Helmet } from 'react-helmet'

const MyOrders = () => {
    const { user } = useAuthContext();
    const { getRequest } = useDataContext();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const getData = async (id) => {
          setLoading(true);
          const result = await getRequest(`client/get-all-orders/${id}`);
          if (result) {
            setOrders(result);
          }
          setLoading(false);
        }
        getData(user.id);
    }, []);
  return (
    <>
    <Helmet>
        <title>My Orders</title>
      </Helmet>
          {loading && <Loading />}
    <Dashboard>
        <h1 className='mb-4'>My Orders</h1>
        <div>
          {
            orders?.map((i) => (
              <MyOrderSection key={i.id} date={i.created_at} tracking_id={i.tracking_id} cartItems={i.cartItems}/>
            ))
          }
          
        </div>
    </Dashboard>
    </>
    
  )
}

export default MyOrders