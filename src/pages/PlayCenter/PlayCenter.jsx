import { useState, useEffect } from "react";
import Footer from "../../components/General/Footer";
import NavBar from "../../components/General/NavBar";
import ProductCard from "../../components/Special/ProductCard";
import { useDataContext } from "../../context/DataContext";
import { Container } from "@chakra-ui/react";
import Loading from "../../components/Loading/Loading";
import { FaGamepad } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { Helmet } from "react-helmet";

const PlayCenter = () => {
  const { getRequest } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    const may_like = await getRequest("client/may-like");
    if (may_like) {
      setRecommendations(may_like);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeGame]);

  useEffect(() => {
    getProduct();
  }, []);

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  const handleSelectGame = (e) => {
    setActiveGame(e.target.id);
  };

  const handleFullScreen = () => {
    setFullScreen(!fullScreen)
  }
  return (
    <>
    <Helmet>
        <title>Play Center</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <Container maxW={"6xl"}>
            <div className="lg:grid lg:grid-cols-10 gap-8 max-md:flex max-md:flex-col max-md:justify-center">
              <div className="col-span-8 w-full custom-scrollbar py-8 max-md:flex max-md:flex-col max-md:justify-center max-md:items-center">
                <h1 className="text-2xl flex items-center justify-center gap-2 mb-4">
                  <FaGamepad className="text-primary" /> Jambo Games
                </h1>
                <iframe
                  src={activeGame}
                  allowFullScreen={true}
                  className={activeGame ? `${fullScreen ? `w-full fixed z-40 right-0 left-0 top-0 h-screen bottom-0 mb-6` : `w-full  h-[600px] mb-6`}` : "hidden"}
                ></iframe>

                <div className={ activeGame ? "flex justify-center py-3" : 'hidden'}>
                  <button className="text-white bg-primary px-6 py-2 rounded-lg" onClick={handleFullScreen}>Full Screen</button>
                </div>

                <div className={ fullScreen ? "fixed z-50 top-20 right-4" : "hidden"} onClick={handleFullScreen}>
                  <MdCancel className="text-red-600" size={40}/>
                </div>
                

                <div className="lg:grid grid-cols-3">
                  <div className="relative rounded-lg h-[200px] w-[280px] max-md:mb-6 hover:scale-90 transition-all duration-150">
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 hover:opacity-70 rounded-lg"></div>
                    <img
                      src="https://i.pcmag.com/imagery/articles/036dkuBzDaQpru9IYmjuU3c-1..v1569488491.jpg"
                      className="object-cover h-[200px] w-full rounded-lg"
                    />
                    <div className="text-div absolute  text-white shadow-lg z-30 top-[90px] w-full flex flex-col items-center gap-2 justify-center ">
                      <h4 className="font-bold text-xl">Flappy Bird Classic</h4>
                      <button
                        className="bg-primary px-8 py-2 rounded font-semibold"
                        id="https://www.addictinggames.com/embed/html5-games/24032"
                        onClick={handleSelectGame}
                      >
                        Play
                      </button>
                    </div>
                  </div>

                  <div className="relative rounded-lg h-[200px] w-[280px] max-md:mb-6 hover:scale-90 transition-all duration-150">
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 hover:opacity-70 rounded-lg"></div>
                    <img
                      src="https://lh3.googleusercontent.com/2jKRiqn8MRLvNNUJ4N6y0Kzkm1VqdRQK2ASrPj4nbJ2oebnSTuI0-RmL-dIXIzCBoqm-8pXqqLTDULjO2c6Y62tLNyM=w640-h400-e365-rj-sc0x00ffffff"
                      className="object-cover h-[200px] w-full rounded-lg"
                    />
                    <div className="text-div absolute  text-white shadow-lg z-30 top-[90px] w-full flex flex-col items-center gap-2 justify-center ">
                      <h4 className="font-bold text-xl">Penalty Shooter 2</h4>
                      <button
                        className="bg-primary px-8 py-2 rounded font-semibold"
                        id="https://games.poki.com/458768/penaltyshooters2"
                        onClick={handleSelectGame}
                      >
                        Play
                      </button>
                    </div>
                  </div>

                  <div className="relative rounded-lg h-[200px] w-[280px] max-md:mb-6 hover:scale-90 transition-all duration-150">
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 hover:opacity-70 rounded-lg"></div>
                    <img
                      src="https://picon.ngfiles.com/688000/flash_688232_card.png?f1601057316"
                      className="object-cover h-[200px] w-full rounded-lg"
                    />
                    <div className="text-div absolute  text-white shadow-lg z-30 top-[90px] w-full flex flex-col items-center gap-2 justify-center ">
                      <h4 className="font-bold text-xl">Basketball FRVR</h4>
                      <button
                        className="bg-primary px-8 py-2 rounded font-semibold"
                        id="https://basketball.frvr.com/"
                        onClick={handleSelectGame}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-span-2 custom-scrollbar max-md:flex gap-3 scrollable-div"
                onWheel={handleScroll}
              >
                {recommendations &&
                  recommendations.map((i) => (
                    <ProductCard key={i.id} product={i} />
                  ))}
              </div>
            </div>
          </Container>

          <Footer />
        </>
      )}
    </>
  );
};

export default PlayCenter;
