import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AvailableBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    resort,
    startDate,
    endDate,
    unitType,
    vacationType = 'rciPoints',
    price,
    points,
    paymentMethod,
    totalPoints,
    nights,
    pointsPerNight
  } = location.state;

  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsModalOpen(true);
      return;
    }

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
        points,
        paymentMethod,
        totalPoints,
        nights,
        pointsPerNight
      },
    });
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    setTimeLeft(8 * 60);
  };

  const handleRedirect = () => navigate(-1);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-semibold">
        {vacationType === 'rciPoints' ? 'RCI Points Vacation' : 'Last Call Vacation'}
      </h1>

      <div className="flex flex-col space-y-2 justify-center items-center p-4 shadow-lg">
        <h2>{resort.place_name}</h2>
        <h2 className="text-3xl text-[#0370ad]">{unitType}</h2>

        <div className="w-full my-4">
          <label className="block mb-2 font-medium">Payment Method:</label>
          <div className="p-3 bg-gray-50 rounded">
            <p className="font-semibold capitalize">{paymentMethod} Payment</p>
            {vacationType === 'lastCall' ? (
              <p className="text-lg">${price.toFixed(2)} USD (flat rate)</p>
            ) : (
              <>
                <p className="text-lg">{pointsPerNight} points per night</p>
                <p className="text-lg">Total: {totalPoints} points for {nights} nights</p>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleContinue}
        contentLabel="Session Expired"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Your session has expired</h2>
          <p className="mb-4">Would you like to continue with your booking?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleRedirect}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Go Back
            </button>
            <button
              onClick={handleContinue}
              className="px-4 py-2 bg-[#ffc445] hover:bg-[#ffbd42] rounded"
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AvailableBooking;
