import React, { useState } from "react";
import { FaBed, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { MdBathtub, MdKitchen, MdMeetingRoom } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import GuestInfo from "./GuestInfo";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, startDate, endDate, unitType, price, points, paymentMethod } = location.state || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);

  if (!resort) {
    return <div>Error: No booking information provided.</div>;
  }

  const { img, place_name, location: resortLocation, resort_ID, room_details, check_in_time, check_out_time } = resort;

  // Function to get room details based on unitType
  const getRoomDetails = () => {
    if (unitType === "studio") {
      return {
        bath: room_details.studio_bath,
        kitchen: room_details.studio_kitchen,
        privacy_room_amount: room_details.studio_privacy_room_amount,
        sleeps_room: room_details.studio_sleeps_room,
      };
    } else {
      // Assuming unitType can only be 'studio' or 'bedroom'
      return {
        bath: room_details.bath,
        kitchen: room_details.kitchen,
        privacy_room_amount: room_details.privacy_room_amount,
        sleeps_room: room_details.sleeps_room,
      };
    }
  };

  const { bath, kitchen, privacy_room_amount, sleeps_room } = getRoomDetails();

  // Calculate number of nights
  const calculateNights = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  // Function to handle the continue button click
  const handleContinue = () => {
    if (selectedOption) {
      if (selectedOption === "A Guest" && !guestInfo) {
        alert("Please fill out the guest information before continuing.");
        return;
      }

      // Prepare the data to send to the payment route
      const bookingData = {
        resort,
        startDate,
        endDate,
        unitType,
        price: paymentMethod === 'cash' ? price : 0,
        points: paymentMethod === 'points' ? points : 0,
        paymentMethod,
        nights: calculateNights(),
        isGuest: selectedOption === "A Guest" ? "True" : "False",
        guestInfo: selectedOption === "A Guest" ? guestInfo : null,
      };

      navigate("/payment", {
        state: bookingData,
      });
    } else {
      alert("Please select an option before continuing.");
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-2xl font-semibold">Checkout</h1>
      <div className="divider"></div>
      <div className="md:grid grid-cols-3 gap-4 space-y-5 md:space-y-2 p-4 shadow-lg">
        <img src={img} alt={place_name} className="col-span-1" />
        <div className="col-span-2 p-4">
          <p className="md:hidden">{resortLocation}</p>
          <h1 className="font-bold text-xl md:text-lg">{place_name}</h1>
          <p>
            Resort ID: <span className="font-semibold">{resort_ID}</span>
          </p>

          <div className="mt-3 space-y-1 font-semibold text-gray-600">
            <p>
              Travel Dates:{" "}
              <span className="font-semibold">
                {new Date(startDate).toLocaleDateString()} -{" "}
                {new Date(endDate).toLocaleDateString()} ({calculateNights()} nights)
              </span>
            </p>
            <div className="md:flex gap-5">
              <p>
                Check-in: <span className="font-semibold">{check_in_time}</span>
              </p>
              <p>
                Check-out: <span className="font-semibold">{check_out_time}</span>
              </p>
            </div>

            {/* Display room details based on unitType */}
            <div className="md:grid grid-cols-2 gap-2 font-semibold text-lg text-gray-500">
              <p className="flex gap-2 items-center ">
                <MdBathtub /> {bath}
              </p>
              <p className="flex gap-2 items-center">
                <MdKitchen /> {kitchen} Kitchen
              </p>
              <p className="flex gap-2 items-center">
                <MdMeetingRoom /> {privacy_room_amount} Privacy
              </p>
              <p className="flex gap-2 items-center">
                <FaBed /> {sleeps_room} Sleep
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Display */}
      <div className="mt-6 p-4 shadow-md">
        <h1 className="text-xl font-bold mb-2">Payment Method</h1>
        <div className="p-3 bg-gray-50 rounded">
          {paymentMethod === 'cash' ? (
            <div>
              <p className="font-semibold">Cash Payment</p>
              <p>${price} USD + tax per night</p>
              <p className="font-bold mt-1">Total: ${(price * calculateNights()).toFixed(2)} USD + tax</p>
            </div>
          ) : (
            <div>
              <p className="font-semibold">RCI Points Payment</p>
              <p>7,000 points per night</p>
              <p className="font-bold mt-1">Total: {points} points</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 shadow-md">
        <h1 className="text-2xl font-bold p-4 bg-[#e6f8fc]">Who's Checking-in?</h1>
        <div>
          <div className="flex justify-center w-full gap-5 p-4">
            <div
              className={`flex flex-col items-center px-14 py-6 shadow-md rounded hover:shadow-lg hover:border hover:border-blue-700 cursor-pointer ${selectedOption === "RCI Member" ? "border-blue-700" : ""}`}
              onClick={() => setSelectedOption("RCI Member")}
            >
              <FaUserTie className="text-6xl" />
              <h1 className="font-semibold pt-2">RCI Member</h1>
              {selectedOption === "RCI Member" && <FaCheckCircle className="text-green-500 mt-2" />}
            </div>

            <div
              className={`flex flex-col items-center px-14 py-6 shadow-md rounded hover:shadow-lg hover:border hover:border-blue-700 cursor-pointer ${selectedOption === "A Guest" ? "border-blue-700" : ""}`}
              onClick={() => setSelectedOption("A Guest")}
            >
              <FaUserTie className="text-6xl" />
              <h1 className="font-semibold pt-2">A Guest</h1>
              {selectedOption === "A Guest" && <FaCheckCircle className="text-green-500 mt-2" />}
            </div>
          </div>
          {selectedOption === "A Guest" && <GuestInfo onGuestInfoChange={setGuestInfo} />}
          <div className="p-6">
            <p>
              If you have selected RCI Member, that individual must check-in for
              this vacation.
            </p>
          </div>
        </div>
      </div>

      {/* Continue to the payment Section */}
      <div className="md:grid grid-cols-2 items-center justify-between px-4 py-4 h-auto z-50 sticky bottom-0 bg-slate-100">
        <div className="flex justify-between font-semibold py-2 gap-10 row-span-1">
          <h1>View RCI Charges</h1>
          {paymentMethod === 'cash' ? (
            <h1 className="text-sm">Total: <span className="text-lg">${(price * calculateNights()).toFixed(2)}</span> USD + TAX</h1>
          ) : (
            <h1 className="text-sm">Total: <span className="text-lg">{points}</span> RCI Points</h1>
          )}
        </div>

        <div className="flex w-full row-span-1">
          <button
            className="w-full py-2 rounded font-bold bg-yellow-400 hover:bg-yellow-500"
            onClick={handleContinue}
          >
            {paymentMethod === 'cash' ? 'Continue to Payment' : 'Redeem Points'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;