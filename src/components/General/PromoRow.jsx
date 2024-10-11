import { useState, useEffect } from "react";
import { useDataContext } from "../../context/DataContext";
import PromoProductCard from "../Special/PromoProductCard";

const PromoRow = ({ data }) => {
  const { getRequest } = useDataContext();
  const [promotions, setPromotions] = useState();
  const getPromotions = async () => {
    const result = await getRequest(`send-promotions?amount=3`);
    if (result.success) {
      setPromotions(result.promotions);
    }
  };

  useEffect(() => {
    if (data) {
      getPromotions();
    }
  }, [data]);
  return (
    <>
      {promotions?.map((i) => (
        <PromoProductCard
          product={{
            ...i?.product,
            vendor: i?.vendor,
            store_slug: i?.store_slug,
            is_verified: i?.is_verified,
          }}
        />
      ))}
    </>
  );
};

export default PromoRow;
