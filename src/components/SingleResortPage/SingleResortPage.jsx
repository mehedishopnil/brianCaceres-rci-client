import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GiStarsStack } from "react-icons/gi";
import Loading from "../Loading";
import { AuthContext } from "../../providers/AuthProvider";
import TopAmenities from "./TopAmenities/TopAmenities";
import FilterContent from "./FilterContent/FilterContent";

const SingleResortPage = () => {
  const { allResortData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentResort, setCurrentResort] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [additional_images, setAdditionalImages] = useState([]);

  useEffect(() => {
    if (allResortData && id) {
      const foundResort = allResortData.find((resort) => resort._id === id);
      setCurrentResort(foundResort);
    }
  }, [allResortData, id]);

  useEffect(() => {
    if (currentResort) {
      const { img, img2, img3 } = currentResort;
      setAdditionalImages([img, img2, img3].filter(Boolean)); // Filter out null or undefined values
    }
  }, [currentResort]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSwipe("left");
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleSwipe = (direction) => {
    if (direction === "left" && additional_images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % additional_images.length);
    } else if (direction === "right" && additional_images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + additional_images.length) % additional_images.length);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    e.target.ontouchmove = (moveEvent) => {
      const touchEndX = moveEvent.touches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        handleSwipe("left");
        e.target.ontouchmove = null;
      } else if (touchStartX - touchEndX < -50) {
        handleSwipe("right");
        e.target.ontouchmove = null;
      }
    };
  };

  const handleMouseDown = (e) => {
    const mouseDownX = e.clientX;
    e.target.onmousemove = (moveEvent) => {
      const mouseMoveX = moveEvent.clientX;
      if (mouseDownX - mouseMoveX > 50) {
        handleSwipe("left");
        e.target.onmousemove = null;
      } else if (mouseDownX - mouseMoveX < -50) {
        handleSwipe("right");
        e.target.onmousemove = null;
      }
    };
  };

  const handleMouseUp = (e) => {
    e.target.onmousemove = null;
  };

  const handleAddToCheckout = () => {
    navigate("/checkout", { state: { resort: currentResort } });
  };

  if (!currentResort) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const { location, place_name, resort_ID, reviews_amount } = currentResort;

  return (
    <div>
      <button onClick={goBack} className="flex items-center m-2 text-[#037092] font-bold">
        <IoIosArrowBack /> Back
      </button>

      <div className="container mx-auto p-4">
        {/* Image Slider */}
        <div
          className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {additional_images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ${
                index === currentIndex
                  ? "translate-x-0"
                  : index < currentIndex
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              <img src={image} className="w-full h-full object-cover" alt={`Slide ${index}`} />
            </div>
          ))}
        </div>

        <div className="flex justify-center py-2 gap-2">
          {additional_images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-[#037092]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        <div className="p-4">
          <p className="text-lg text-[#303030]">{location}</p>
          <p>Resort ID: {resort_ID}</p>
          <h1 className="text-3xl font-semibold mt-5">{place_name}</h1>

          <div className="mt-5">
            {place_name.includes("Wyndham") && (
              <div className="flex items-center gap-2">
                <GiStarsStack />
                <h1>Wyndham owner exclusive</h1>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200"></div>

          <div className="mt-3">
            <h1>Rating</h1>
            <div className="flex items-center gap-2">
              <img
                src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
                alt="Gold Crown"
              />
              <h1>RCI Gold Crown</h1>
            </div>
          </div>

          <div className="border-b border-gray-200"></div>

          <div className="mt-2">
            <h1>Top Amenities</h1>
            <TopAmenities />
          </div>

          <div className="border-b border-gray-200"></div>

          <div className="mt-2">
            <h1 className="text-xl font-semibold">TripAdvisor Traveler Rating</h1>
            <div className="flex gap-3">
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-32772-5.svg"
                alt="Traveler Rating"
              />
              <p className="font-bold">{reviews_amount} reviews</p>
            </div>
          </div>
        </div>

        <FilterContent currentResort={currentResort} />

      </div>
    </div>
  );
};

export default SingleResortPage;