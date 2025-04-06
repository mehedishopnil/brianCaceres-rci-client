import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AvailableBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, startDate, endDate, unitType } = location.state;
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes in seconds
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // 'cash' or 'points'

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsModalOpen(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const getPrice = (unitType) => {
    switch (unitType) {
      case "studio":
        return 309.0; // Weekly price
      case "1 bedroom":
        return 379.0 ; // Weekly price
      case "2 bedroom":
        return 379.0; // Weekly price
      case "3 bedroom":
        return 379.0; // Weekly price
      case "4 bedroom":
        return 379.0; // Weekly price
      default:
        return 0.0;
    }
  };

  const getPoints = (unitType) => {
    switch (unitType) {
      case "studio":
        return 5500; // Total points for stay
      case "1 bedroom":
        return 7500; // Total points for stay
      case "2 bedroom":
        return 9500; // Total points for stay
      case "3 bedroom":
        return 12500; // Updated to 12,500 points
      case "4 bedroom":
        return 14000; // Updated to 14,000 points
      default:
        return 0;
    }
  };

  const handleBookNow = () => {
    navigate("/checkout", {
      state: {
        resort,
        startDate,
        endDate,
        unitType,
        price: paymentMethod === "cash" ? getPrice(unitType) : 0,
        points: paymentMethod === "points" ? getPoints(unitType) : 0,
        paymentMethod,
      },
    });
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    setTimeLeft(8 * 60); // Reset the timer
  };

  const handleRedirect = () => {
    navigate(-1); // Go back to previous page
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="p-4">
      {/* <div className="w-full text-center mb-2 text-red-500 font-semibold">
        Time remaining: {formatTime(timeLeft)}
      </div> */}
      <h1 className="text-center text-2xl font-semibold">
        Available Unit (<span className="text-[#0370ad]">3+</span>){" "}
      </h1>
      <div className="flex flex-col space-y-2 justify-center items-center p-4 shadow-lg">
        <h2>{resort.place_name}</h2>
        <h2 className="text-3xl text-[#0370ad]">{unitType}</h2>

        <div className="w-full my-4">
          <label className="block mb-2 font-medium">Payment Method:</label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-[#0370ad]"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              <span className="ml-2 text-lg">
                Pay with Cash: ${getPrice(unitType)} USD (weekly rate)
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-[#0370ad]"
                name="paymentMethod"
                value="points"
                checked={paymentMethod === "points"}
                onChange={() => setPaymentMethod("points")}
              />
              <span className="ml-2 text-lg">
                Pay with Points: {getPoints(unitType).toLocaleString()} RCI Points
                <span className="block text-sm text-gray-600">
                  (Total per night)
                </span>
              </span>
            </label>
          </div>
        </div>

        <h2>Start Date: {new Date(startDate).toLocaleDateString()}</h2>
        <h2>End Date: {new Date(endDate).toLocaleDateString()}</h2>

        <button
          className="w-full text-lg bg-[#ffc445] hover:bg-[#ffbd42] text-gray-800 font-bold py-2 px-4 rounded mt-4"
          onClick={handleBookNow}
        >
          {paymentMethod === "cash" ? "Book Now" : "Redeem Points"}
        </button>
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