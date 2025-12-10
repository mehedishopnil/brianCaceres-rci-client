import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { GiPoolTableCorner, GiStarsStack } from 'react-icons/gi';
import {
  FaSpa,
  FaHotTub,
 
  FaCheckCircle,
} from 'react-icons/fa';
import { MdLocalLaundryService, MdPets, MdAccessibility } from 'react-icons/md';
import { TbBeach } from 'react-icons/tb';
import Loading from '../Loading';
import { AuthContext } from '../../providers/AuthProvider';
import FilterContent from './FilterContent/FilterContent';
import { PiPersonSimpleSwimFill } from 'react-icons/pi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoBedOutline, IoCalendarOutline, IoCar, IoChevronForward, IoFitness, IoHeart, IoHeartOutline, IoLocationOutline, IoPeopleOutline, IoRestaurant, IoShareSocialOutline, IoStar, IoWifi } from 'react-icons/io5';

const SingleResortPage = () => {
  const { allResortData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentResort, setCurrentResort] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [additional_images, setAdditionalImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Function to remove "{any amount} Nights" from place_name
  const cleanPlaceName = name => {
    return name?.replace(/\d+\s*Nights/g, '').trim() || '';
  };

  useEffect(() => {
    if (allResortData && id) {
      const foundResort = allResortData.find(resort => resort._id === id);
      if (foundResort) {
        // Clean the place_name before setting the currentResort
        const cleanedResort = {
          ...foundResort,
          place_name: cleanPlaceName(foundResort.place_name),
        };
        setCurrentResort(cleanedResort);
      }
    }
  }, [allResortData, id]);

  useEffect(() => {
    if (currentResort) {
      // Collect all image URLs dynamically from the currentResort object
      const images = Object.keys(currentResort)
        .filter(key => key.startsWith('img')) // Filter keys that start with "img"
        .map(key => currentResort[key]) // Get the image URLs
        .filter(image => image); // Filter out null or undefined values

      setAdditionalImages(
        images.length > 0
          ? images
          : [
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop',
              'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop',
            ]
      );
    }
  }, [currentResort]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (additional_images.length > 0) {
        handleSwipe('left');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, additional_images.length]);

  const handleSwipe = direction => {
    if (direction === 'left' && additional_images.length > 0) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % additional_images.length);
    } else if (direction === 'right' && additional_images.length > 0) {
      setCurrentIndex(
        prevIndex =>
          (prevIndex - 1 + additional_images.length) % additional_images.length
      );
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleAddToCheckout = () => {
    navigate('/checkout', { state: { resort: currentResort } });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically make an API call to update favorites
  };

  const handleThumbnailClick = index => {
    setCurrentIndex(index);
  };

  if (!currentResort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const {
    location,
    place_name,
    resort_ID,
    reviews_amount = 0,
    rating = 4.5,
    description = 'Experience luxury and comfort at this beautiful resort. Perfect for family vacations, romantic getaways, and business retreats.',
    amenities = [],
  } = currentResort;

  // Sample amenities if not provided
  const topAmenities = [
    { icon: <IoWifi />, name: 'Free WiFi', category: 'internet' },
    { icon: <IoCar />, name: 'Free Parking', category: 'parking' },
    { icon: <IoRestaurant />, name: 'Restaurant', category: 'dining' },
    {
      icon: <PiPersonSimpleSwimFill/>,
      name: 'Swimming Pool',
      category: 'pool',
    },
    { icon: <IoFitness />, name: 'Fitness Center', category: 'fitness' },
    { icon: <FaSpa />, name: 'Spa', category: 'spa' },
    { icon: <MdLocalLaundryService />, name: 'Laundry', category: 'services' },
    {
      icon: <GiPoolTableCorner />,
      name: 'Game Room',
      category: 'entertainment',
    },
    { icon: <FaHotTub />, name: 'Hot Tub', category: 'pool' },
    { icon: <TbBeach />, name: 'Beach Access', category: 'location' },
    { icon: <MdPets />, name: 'Pet Friendly', category: 'pets' },
    {
      icon: <MdAccessibility />,
      name: 'Accessible',
      category: 'accessibility',
    },
  ];

  const displayedAmenities = showAllAmenities
    ? topAmenities
    : topAmenities.slice(0, 6);

  const renderStars = rating => {
    return Array.from({ length: 5 }).map((_, index) => (
      <IoStar
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'text-amber-500 fill-amber-500'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 lg:hidden">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[#037092] font-semibold hover:text-blue-700 transition-colors"
          >
            <IoIosArrowBack className="w-5 h-5" />
            Back to Search
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Desktop Back Button */}
        <button
          onClick={goBack}
          className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-[#037092] mb-6 transition-colors"
        >
          <IoIosArrowBack className="w-5 h-5" />
          <span className="font-medium">Back to Results</span>
        </button>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Image Gallery & Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
              <div className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
                <img
                  src={additional_images[currentIndex]}
                  alt={place_name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => setImageLoading(false)}
                />

                {/* Image Navigation */}
                <button
                  onClick={() => handleSwipe('left')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <IoIosArrowBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <IoIosArrowForward className="w-5 h-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {currentIndex + 1} / {additional_images.length}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={toggleFavorite}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  {isFavorite ? (
                    <IoHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <IoHeartOutline className="w-6 h-6 text-gray-600" />
                  )}
                </button>

                {/* Share Button */}
                <button className="absolute top-20 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                  <IoShareSocialOutline className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              {additional_images.length > 1 && (
                <div className="flex gap-2 p-4 bg-white overflow-x-auto scrollbar-hide">
                  {additional_images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? 'border-[#037092] ring-2 ring-blue-100'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resort Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                      RESORT ID: {resort_ID}
                    </span>
                    {place_name?.includes('Wyndham') && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-600 text-xs font-semibold rounded-full flex items-center gap-1">
                        <GiStarsStack className="w-3 h-3" />
                        Wyndham Exclusive
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <IoLocationOutline className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{location}</span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {place_name}
                  </h1>

                  {/* Rating Section */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(rating)}
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {rating}
                      </span>
                      <span className="text-gray-500">/5</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-amber-50 rounded-lg">
                        <img
                          src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg"
                          alt="Gold Crown"
                          className="w-6 h-6"
                        />
                      </div>
                      <span className="font-medium text-gray-700">
                        RCI Gold Crown® Resort
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 mt-4 lg:mt-0">
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <IoShareSocialOutline className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    {isFavorite ? (
                      <IoHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <IoHeartOutline className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  About This Resort
                </h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>

              {/* Amenities Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Resort Amenities
                  </h2>
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center gap-1"
                  >
                    {showAllAmenities ? 'Show Less' : 'View All Amenities'}
                    <IoChevronForward
                      className={`w-4 h-4 transition-transform ${
                        showAllAmenities ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {displayedAmenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors group cursor-pointer"
                    >
                      <div className="p-2 bg-white rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                        {amenity.icon}
                      </div>
                      <span className="font-medium text-gray-700">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TripAdvisor Rating */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  {/* Left Side - Rating Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                        TripAdvisor Traveler Rating
                      </h3>

                      {/* Mobile-only badge */}
                      <span className="lg:hidden px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                        Certified
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      {/* Rating Badge */}
                      <div className="flex items-center justify-center sm:justify-start">
                        <div className="relative">
                          <img
                            src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-32772-5.svg"
                            alt="Traveler Rating"
                            className="h-12 sm:h-14 lg:h-16"
                            loading="lazy"
                          />
                          {/* Desktop-only badge */}
                          <span className="hidden lg:block absolute -top-2 -right-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                            Certified
                          </span>
                        </div>
                      </div>

                      {/* Rating Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
                          <div className="flex items-center gap-2 mb-2 sm:mb-0">
                            <div className="flex items-center">
                              {renderStars(rating)}
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-2xl sm:text-3xl font-bold text-gray-900 ml-2">
                                {rating}
                              </span>
                              <span className="text-gray-500 ml-1">/5</span>
                            </div>
                          </div>

                          {/* Review Count */}
                          <div className="sm:border-l sm:border-gray-200 sm:pl-4">
                            <p className="text-sm sm:text-base text-gray-600">
                              Based on{' '}
                              <span className="font-bold text-gray-900">
                                {reviews_amount.toLocaleString()}
                              </span>{' '}
                              verified reviews
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              ⭐ Excellent traveler feedback
                            </p>
                          </div>
                        </div>

                        {/* Rating Breakdown - Hidden on mobile, shown on tablet+ */}
                        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                          <div className="p-3 bg-white/50 rounded-lg">
                            <p className="text-xs text-gray-500">Service</p>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex">{renderStars(4.8)}</div>
                              <span className="text-sm font-semibold">4.8</span>
                            </div>
                          </div>
                          <div className="p-3 bg-white/50 rounded-lg">
                            <p className="text-xs text-gray-500">Cleanliness</p>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex">{renderStars(4.9)}</div>
                              <span className="text-sm font-semibold">4.9</span>
                            </div>
                          </div>
                          <div className="p-3 bg-white/50 rounded-lg">
                            <p className="text-xs text-gray-500">Location</p>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex">{renderStars(4.7)}</div>
                              <span className="text-sm font-semibold">4.7</span>
                            </div>
                          </div>
                          <div className="p-3 bg-white/50 rounded-lg">
                            <p className="text-xs text-gray-500">Value</p>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex">{renderStars(4.5)}</div>
                              <span className="text-sm font-semibold">4.5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - CTA */}
                  <div className="mt-4 lg:mt-0 lg:w-auto lg:flex-shrink-0">
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                      <a
                        href="#reviews"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                      >
                        <IoChevronForward className="w-4 h-4" />
                        Read All Reviews
                      </a>
                      <a
                        href="https://www.tripadvisor.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
                          <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" />
                          <circle cx="12" cy="12" r="1.5" />
                        </svg>
                        View on TripAdvisor
                      </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="hidden lg:flex items-center gap-2 mt-4 pt-4 border-t border-blue-100">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">
                        Verified traveler reviews
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile-only trust indicators */}
                <div className="lg:hidden flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-blue-100">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-gray-600">Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-gray-600">Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-600">Top Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Filter Content */}
          <div className="lg:col-span-1">
            {/* Sticky Booking Card */}
            <div className="sticky top-24">
              {/* Booking Summary Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Booking Summary
                  </h3>

                  {/* Price Display */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        $1,299
                      </span>
                      <span className="text-gray-500">/ week</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">+ taxes & fees</p>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <IoCalendarOutline className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">Nov 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <IoPeopleOutline className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Sleeps</p>
                        <p className="font-medium">Up to 6 guests</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <IoBedOutline className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bedrooms</p>
                        <p className="font-medium">2 Bedrooms</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCheckout}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
                    >
                      Book Now
                    </button>
                    <button className="w-full py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                      Add to Wishlist
                    </button>
                  </div>

                  {/* Guarantee Badge */}
                  <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="w-6 h-6 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-emerald-800">
                          Best Price Guarantee
                        </p>
                        <p className="text-sm text-emerald-600">
                          Found a better price? We'll match it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Need Help?
                  </h4>
                  <div className="space-y-2">
                    <a
                      href="tel:1-800-RCI-VACA"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <span className="font-medium">📞 1-800-RCI-VACA</span>
                    </a>
                    <p className="text-sm text-gray-600">24/7 Member Support</p>
                  </div>
                </div>
              </div>

              {/* Filter Content Component */}
              <FilterContent currentResort={currentResort} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">$1,299</span>
                <span className="text-gray-500 text-sm">/ week</span>
              </div>
              <p className="text-xs text-gray-500">+ taxes & fees</p>
            </div>
            <button
              onClick={handleAddToCheckout}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Add custom styles for scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SingleResortPage;
