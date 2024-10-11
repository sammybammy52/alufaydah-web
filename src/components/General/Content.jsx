import { useState, useEffect, useRef } from 'react'
import { useDataContext } from '../../context/DataContext'
import Loading from '../Loading/Loading'
import FeaturedBrands from '../Special/FeaturedBrands'
import FeaturedSection from '../Special/FeaturedSection'
import FeaturedSkeleton from '../Special/FeaturedSkeleton'
import FullRow from '../Special/FullRow'
import TwoHalves from '../Special/TwoHalves'

const Content = () => {
  const { getRequest, brandStore, handleBrandStore, featuredProductStore,
    handleFeaturedProductStore,
    featuredSectionStore,
    handleFeaturedSectionStore, } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [featuredSections, setFeaturedSections] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [featuredBrands, setFeaturedBrands] = useState(null);
  const [phones, setPhones] = useState(null);
  const [electronics, setElectronics] = useState(null)
  const [accessories, setAccessories] = useState(null)
  //functions
  const getFeaturedSections = async() => {
    if (featuredSectionStore) {
      setFeaturedSections(featuredSectionStore)
      return;
    }
    const result = await getRequest('client/all-featured-sections')
    if (result) {
    
      setFeaturedSections(result);
      handleFeaturedSectionStore(result);
    }
  }

  const getFeaturedProducts = async() => {
    if (featuredProductStore) {
      setFeaturedProducts(featuredProductStore)
      return;
    }
    const result = await getRequest('client/all-featured-products')
    if (result) {
      
      setFeaturedProducts(result);
      handleFeaturedProductStore(result);
    }
  }

  const getFeaturedBrands = async() => {
    if (brandStore) {
      setFeaturedBrands(brandStore);
      return;
    }
    const result = await getRequest('client/all-brands');
    if (result) {
      setFeaturedBrands(result);
      handleBrandStore(result);
    }
  }

  const getPhones = async () => {
    const result = await getRequest('client/products/phones');
    if (result) {
      console.log(result);
      setPhones(result);
    }
  }

  const getElectronics = async () => {
    const result = await getRequest('client/products/electronics');
    if (result) {
      console.log(result);
      setElectronics(result);
    }
  }

  const getAccessories = async () => {
    const result = await getRequest('client/products/accessories');
    if (result) {
      console.log(result);
      setAccessories(result);
    }
  }
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
   getFeaturedSections();
   getFeaturedProducts();
   getFeaturedBrands();
   getPhones();
   getElectronics();
   getAccessories();

  }, []);
   
  
  return (
    <>
    {
      loading && <Loading/>
    }
   {
    featuredSections ? featuredSections.map((i) => (
      <FeaturedSection key={i.id} name={i.section_name} data={featuredProducts} sectionId={i.id}/> 
    )) : <>
    <FeaturedSkeleton/>
    <FeaturedSkeleton/>
    <FeaturedSkeleton/>
    </>

    
   }


<FeaturedBrands name={"Top Brands"} data={featuredBrands && featuredBrands}/>
   {
    phones && <FullRow data={phones} name="PHONES" cat_id={"phones-36278431"}/>
   }
   <TwoHalves one={electronics && electronics} two={accessories && accessories}/>
    </>
  )
}

export default Content