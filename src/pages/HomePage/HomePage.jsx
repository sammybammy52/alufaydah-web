import React from 'react'
import Content from '../../components/General/Content';
import Footer from '../../components/General/Footer';
// import HeroCard from '../../components/General/HeroCard'
import NavBar from '../../components/General/NavBar'
import './HomePage.css';
import { Helmet } from 'react-helmet';
// import PromoImg from '../../components/General/PromoImg';
import PromoSection from '../../components/General/PromoSection';
import NewHero from '../../components/General/NewHero';
// import { useDisclosure } from '@chakra-ui/react';
// import PriceFlunctuationAlert from '../../components/General/PriceFlunctuationAlert';
// import { useEffect } from 'react';

const HomePage = () => {
  // const { isOpen, onClose, onOpen } = useDisclosure();

  // useEffect(() => {
  //   setTimeout(() => {
  //     onOpen();
  //   }, 1000);
  // }, [])
  
  return (
    <>
    <Helmet>
    <title>
    Jambo.ng - Your trusted online store
    </title>
      </Helmet>
    {/* <PriceFlunctuationAlert isOpen={isOpen} onClose={onClose}/> */}
    <NavBar hideSearchBar={true}/>
      {/* <PromoImg/> */}
    {/* <HeroCard/> */}
    <NewHero/>
    <PromoSection/>
    <Content/>
    <Footer/>
    </>
  )
}

export default HomePage