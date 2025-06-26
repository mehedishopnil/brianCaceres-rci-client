import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const getPointsPerNight = (unitType) => {
  switch (unitType) {
    case "studio": return 7000;
    case "1 bedroom": return 7000;
    case "2 bedroom": return 9000;
    case "3 bedroom": return 10500;
    case "4 bedroom": return 12500;
    default: return 0;
  }
};

const getFixedPrice = (unitType) => {
  switch (unitType) {
    case "studio": return 309;
    case "1 bedroom": return 339;
    case "2+ bedroom":
    case "3 bedroom":
    case "4 bedroom": return 379;
    default: return 0;
  }
};

const AvailableBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, startDate, endDate, unitType, vacationType = 'rciPoints', nights } = location.state || {};

  // Calculate points with weekend surcharge
  const calculatePoints = () => {
    const basePointsPerNight = getPointsPerNight(unitType);
    let basePoints = 0;
    let weekendNights = 0;
    const currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);

    while (currentDate < endDateObj) {
      const day = currentDate.getDay();
      if (day === 0 || day === 6) { // Sunday (0) or Saturday (6)
        weekendNights++;
      }
      basePoints += basePointsPerNight;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const weekendSurcharge = weekendNights * 500;
    const totalPoints = basePoints + weekendSurcharge;

    return {
      basePoints,
      weekendNights,
      weekendSurcharge,
      totalPoints
    };
  };

  const { basePoints, weekendNights, weekendSurcharge, totalPoints } = calculatePoints();
  const pointsPerNight = getPointsPerNight(unitType);
  const price = vacationType === 'lastCall' ? getFixedPrice(unitType) : 0;
  const paymentMethod = vacationType === 'lastCall' ? 'cash' : 'points';

  const [timeLeft, setTimeLeft] = useState(8 * 60);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) setIsModalOpen(true);
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleBookNow = () => {
    navigate("/checkout", {
      state: {
        resort,
        startDate,
        endDate,
        unitType,
        vacationType,
        price,
        points: totalPoints,
        paymentMethod,
        totalPoints,
        nights,
        pointsPerNight,
        weekendSurcharge
      },
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!location.state) return <div>Error: No booking data found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">
        {vacationType === 'rciPoints' ? 'Available Unit (with Points)' : 'Available Unit'}
      </h1>

      <div className="flex flex-col space-y-2 justify-center items-center p-4 shadow-lg">
        <h2 >{resort?.place_name}</h2>
        <h2 className="text-3xl font-semibold text-[#0370ad]">{unitType}</h2>

        <div className="w-full text-center my-4">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-2xl py-2 font-semibold capitalize">{paymentMethod} Payment</p>
            {vacationType === 'lastCall' ? (
              <p className="text-lg"><span className="text-3xl font-semibold">${price.toFixed(2)}</span> USD + tax</p>
            ) : (
              <>
                <p className="text-base font-semibold text-gray-600">{pointsPerNight} points per night</p>
                {weekendNights > 0 && (
                  <p className="text-base font-semibold text-gray-600">
                    Weekend nights: {weekendNights} × 500 points = +{weekendSurcharge} points
                  </p>
                )}
                <p className="text-base font-semibold text-gray-600">
                  {basePoints} (base) + {weekendSurcharge} (weekend) 
                </p>
                <h1 className="text-3xl py-2 font-semibold">
                  Total Points: {totalPoints.toLocaleString()}
                </h1>
              </>
            )}
          </div>
        </div>

        <h2>Start Date: {new Date(startDate).toLocaleDateString()}</h2>
        <h2>End Date: {new Date(endDate).toLocaleDateString()}</h2>

        <button
          className="w-full text-lg bg-[#ffc445] hover:bg-[#ffbd42] text-gray-800 font-bold py-2 px-4 rounded mt-4"
          onClick={handleBookNow}
        >
          {vacationType === 'lastCall' ? 'Book Now' : 'Redeem Points'}
        </button>

        <p className="text-sm text-gray-500 mt-2">Time remaining: {formatTime(timeLeft)}</p>
      </div>

      {/* Modal remains same as before */}
    </div>
  );
};

export default AvailableBooking;