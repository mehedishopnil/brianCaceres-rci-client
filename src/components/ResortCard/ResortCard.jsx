import { useState } from 'react';
import { FaRegHeart, FaHeart, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { GiStarsStack } from 'react-icons/gi';
import { IoBedOutline, IoPeopleOutline } from 'react-icons/io5';

const ResortCard = ({ resort }) => {
  const {
    img,
    place_name,
    reviews_amount,
    location,
    ownerExclusive,
    price,
    bedrooms,
    sleeps,
  } = resort;
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Function to remove "{any amount} Nights" from place_name
  const cleanPlaceName = name => {
    if (!name) return '';
    return name.replace(/\d+\s*Nights/g, '').trim();
  };

  // Clean the place_name before rendering
  const cleanedPlaceName = cleanPlaceName(place_name);

  // Fallback image URLs if main image fails
  const fallbackImages = [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=600&h=400&fit=crop&crop=center',
  ];

  // Get a random fallback image
  const getFallbackImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

  // Generate star rating (4-5 stars for display)
  const generateRating = () => {
    const rating = 4 + Math.random(); // Random between 4 and 5
    return rating.toFixed(1);
  };

  const rating = generateRating();

  const renderStars = rating => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating)
            ? 'text-amber-500 fill-amber-500'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const toggleFavorite = e => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] border border-gray-100 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-40 sm:h-44 overflow-hidden">
        <img
          src={imageError ? getFallbackImage() : img}
          alt={cleanedPlaceName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <FaHeart className="w-3.5 h-3.5 text-red-500" />
          ) : (
            <FaRegHeart className="w-3.5 h-3.5 text-gray-600" />
          )}
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-2 left-2">
          <div className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded shadow-sm">
            <span className="text-[10px] font-normal text-gray-600">From </span>
            <span>${price || '1,299'}</span>
          </div>
        </div>

        {/* Exclusive Badge */}
        {ownerExclusive && (
          <div className="absolute top-2 left-2">
            <div className="px-2 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <GiStarsStack className="w-2.5 h-2.5" />
              <span>Exclusive</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Container - Flex grow to fill space */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-1">
          <FaMapMarkerAlt className="w-3 h-3 text-blue-500 flex-shrink-0" />
          <span className="text-xs text-gray-600 truncate">
            {location || 'Location not specified'}
          </span>
        </div>

        {/* Resort Name */}
        <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {cleanedPlaceName || 'Premium Resort'}
        </h3>

        {/* Property Details - Compact */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <IoBedOutline className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-800">
              {bedrooms || 2}
            </span>
            <span className="text-xs text-gray-500 ml-0.5">beds</span>
          </div>
          <div className="flex items-center gap-1">
            <IoPeopleOutline className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-800">
              {sleeps || 6}
            </span>
            <span className="text-xs text-gray-500 ml-0.5">sleeps</span>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="mt-auto space-y-2">
          {/* Combined Rating Badge */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">{renderStars(rating)}</div>
              <div className="flex items-baseline">
                <span className="text-xs font-bold text-gray-900 ml-0.5">
                  {rating}
                </span>
                <span className="text-[10px] text-gray-500 ml-0.5">/5</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <img
                src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
                alt="Gold Crown"
                className="w-4 h-4"
              />
              <span className="text-[10px] font-medium text-gray-700">
                Gold
              </span>
            </div>
          </div>

          {/* Reviews Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg"
                alt="TripAdvisor Rating"
                className="h-3"
              />
              <span className="text-[10px] text-gray-600">
                {reviews_amount
                  ? `${reviews_amount.toLocaleString()}+ reviews`
                  : 'New'}
              </span>
            </div>

            {/* Wyndham Indicator */}
            {cleanedPlaceName?.toLowerCase().includes('wyndham') && (
              <div className="flex items-center gap-0.5">
                <GiStarsStack className="w-2.5 h-2.5 text-blue-600" />
                <span className="text-[10px] font-medium text-blue-600">
                  Wyndham
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-3 w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-200 active:scale-[0.98]">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ResortCard;
