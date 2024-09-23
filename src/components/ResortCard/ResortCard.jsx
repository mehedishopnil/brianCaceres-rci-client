import { FaRegHeart } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";

const ResortCard = ({ resort }) => {
  const { img, place_name, reviews_amount, location, ownerExclusive } = resort;

  return (
    <div>
      <div className="card h-full bg-white shadow-xl">
        <figure className="relative">
          <img src={img} alt="Resort" />
          <p className="absolute top-5 right-5 text-xl">
            <FaRegHeart />
          </p>
        </figure>

        <div className="card-body">
          <p>{location}</p>
          <h2 className="card-title">{place_name}</h2>

          <div className="flex items-center gap-2">
            <h1>{ownerExclusive}</h1>
          </div>

          {place_name.includes("Wyndham") && (
            <div className="flex items-center gap-2">
                <GiStarsStack />
              <h1>Wyndham owner exclusive</h1>
            </div>
          )}

          <div className="divider"></div>

          <div className="flex items-center gap-1">
            <img
              src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
              alt="Gold Crown"
            />
            <div className="border-l-2 "></div>

            <div className="">
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg"
                alt="TripAdvisor Rating"
              />
              <div>
                <p>{reviews_amount} reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortCard;