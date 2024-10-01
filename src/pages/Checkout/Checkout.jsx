import React, { useState, useEffect } from "react";
import { FaBed, FaUserTie, FaCheckCircle, FaRegClock } from "react-icons/fa";
import { MdBathtub, MdKitchen, MdMeetingRoom } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Swal from "sweetalert2";
import GuestInfo from "./GuestInfo";
import DropdownInfo from "../../components/DropdownInfo/DropdownInfo";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resort, startDate, endDate, unitType, price } = location.state || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);
  const [countdown, setCountdown] = useState(9 * 60); // 9 minutes in seconds
  const [popupShown, setPopupShown] = useState(false); // Track if the 2-minute popup has been shown


  const dropdownInfo =[{
    header: "How we protect your information",
    content: "We use industry-standard encryption to protect your personal information. Your booking is secure and your personal details are confidential. We also implement strict access controls to ensure that only authorized staff can access and modify your booking information."
  }]

  useEffect(() => {
    if (!resort) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        // Show notification at the 2-minute mark, but only once
        if (prevCountdown === 2 * 60 && !popupShown) {
          setPopupShown(true); // Set popupShown to true so it doesn't show again
          showTwoMinuteWarning(); // Call the function to display notification
        }

        // Timeout and redirect if countdown reaches 0
        if (prevCountdown <= 1) {
          clearInterval(timer);
          navigate("/singleResortPage"); // Redirect on timeout
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [navigate, resort, popupShown]);

  const showTwoMinuteWarning = () => {
    Swal.fire({
      title: "Time is running out!",
      text: "Your time left to book will expire in two minutes. Do you want to extend the time?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset the countdown if "Yes" is clicked
        setCountdown(9 * 60); // Reset to 9 minutes
        setPopupShown(false); // Allow the popup to show again when the countdown reaches 2 minutes
      } else {
        // Redirect if "No" is clicked
        navigate("/singleResortPage");
      }
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!resort) {
    return <div>Error: No booking information provided.</div>;
  }



  const { img, place_name, location: resortLocation, resort_ID, room_details, check_in_time, check_out_time } = resort;

  const getRoomDetails = () => {
    if (unitType === "studio") {
      return {
        bath: room_details.studio_bath,
        kitchen: room_details.studio_kitchen,
        privacy_room_amount: room_details.studio_privacy_room_amount,
        sleeps_room: room_details.studio_sleeps_room,
      };
    } else {
      return {
        bath: room_details.bath,
        kitchen: room_details.kitchen,
        privacy_room_amount: room_details.privacy_room_amount,
        sleeps_room: room_details.sleeps_room,
      };
    }
  };

  const { bath, kitchen, privacy_room_amount, sleeps_room } = getRoomDetails();

  const handleContinue = () => {
    if (selectedOption) {
      if (selectedOption === "A Guest" && !guestInfo) {
        alert("Please fill out the guest information before continuing.");
        return;
      }

      const bookingData = {
        resort,
        startDate,
        endDate,
        unitType,
        price,
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
      <div className="flex justify-between items-center text-[#016e84] px-10 pt-4">
        <h1 className="font-semibold" >Trip Info</h1>

        <div className="flex items-center gap-3 ">
        <FaRegClock  className="text-2xl"/>
        {/* here I need a conditional operation. The page will timeout after 9minutes and the time countdown will be here. when it will be timeout then it will be return to the /singleResortPage*/}
        <h1 className="font-bold bg-[#e6f8fc] py-1 px-2">{formatTime(countdown)}</h1>

        </div>
      </div>
      {/* <h1 className="text-center text-2xl font-semibold">Checkout</h1> */}
      <div className="divider"></div>
      <div className="md:grid grid-cols-3 gap-4 space-y-5 md:space-y-2 mx-5  border border-gray-300">
        <img src={img} alt={place_name} className="col-span-1" />
        <div className="col-span-2 p-4">
          <p className="md:hidden">{resortLocation}</p>
          <h1 className="font-bold text-xl md:text-lg">{place_name}</h1>
          <p>
            Resort ID: <span className="font-medium">{resort_ID}</span>
          </p>

          <div className="mt-3  space-y-1 text-[16px]  text-[#525252]">
            <p className="-mb-2 text-lg">
              Travel Dates:
            </p>
            <p>
            {" "}
              <span className="font-semibold text-gray-900">
                {new Date(startDate).toLocaleDateString()} -{" "}
                {new Date(endDate).toLocaleDateString()}
              </span>
            </p>

            <div className="md:flex gap-5">
              <p>
                Check-in: <span className="font-semibold text-gray-900">{check_in_time}</span>
              </p>
              <p>
                Check-out: <span className="font-semibold">{check_out_time}</span>
              </p>
            </div>

            {/* Display room details based on unitType */}
            <div className="md:grid grid-cols-2 gap-2 text-[18px] text-[#545454] space-y-2">
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

      <div className="my-10 mx-5 border border-gray-300">
        <h1 className="text-4xl font-bold p-4 bg-[#e6f8fc]">Who's Checking-in?</h1>
        <div>
          <div className="flex justify-center w-full gap-8 p-4">
            <div
              className={`relative w-full h-1/2 px-14 py-6 shadow-md border border-gray-200 rounded hover:shadow-lg hover:border hover:border-[#016e84] cursor-pointer ${selectedOption === "RCI Member" ? "border-[#016e84]" : ""}`}
              onClick={() => setSelectedOption("RCI Member")}
            >
              <div className="flex flex-col items-center">
              <img className="w-14" src="https://clubs.rci.com/static/media/rci-member.455654d9.svg" alt="RCI Member" />
              <h1 className="text-lg pt-2">RCI Member</h1>
              </div>

              <div className="absolute top-3 right-3">
              {selectedOption === "RCI Member" && <FaCheckCircle className="text-[#016e84] text-2xl mt-2" />}
              </div>
            </div>

            <div
              className={`relative w-full h-1/2 px-14 py-6 shadow-md rounded border border-gray-200 hover:shadow-lg hover:border hover:border-[#016e84] cursor-pointer ${selectedOption === "A Guest" ? "border-[#016e84]" : ""}`}
              onClick={() => setSelectedOption("A Guest")}
            >
              
              <div className="flex flex-col items-center">
              <img className="w-14" src="https://clubs.rci.com/static/media/guest.86a36989.svg" alt="Guest" />
              <h1 className="text-xl pt-2">A Guest</h1>
              </div>

              <div className="absolute top-3 right-3">
              {selectedOption === "A Guest" && <FaCheckCircle className="text-[#016e84] text-2xl mt-2" />}
              </div>
              
            </div>
          </div>

          {selectedOption === "A Guest" && <GuestInfo   onGuestInfoChange={setGuestInfo} />}
          <div className="p-6">
            <p>
              If you have selected RCI Member, that individual must check-in for
              this vacation.
            </p>
          </div>
        </div>
      </div>

      {/* Continue to the payment Section */}
      <div className="md:grid grid-cols-2 items-center justify-between my-5 px-4 py-4 h-auto z-50 sticky bottom-0 bg-slate-100">
        <div className="flex justify-between font-semibold py-2 gap-10 row-span-1">
          <h1>View RCI Charges</h1>
          <h1 className="text-sm">
            <span className="text-lg">${price}</span> USD + TAX
          </h1>
        </div>

        <div className="flex w-full row-span-1">
          <button
            className="w-full font-2xl py-2 rounded uppercase font-bold bg-yellow-400 shadow"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>

      {/* How we protect your information Section */}
      {
        dropdownInfo.map(info =>  <DropdownInfo key={info} info = {info} />)
      }
    </div>
  );
};

export default Checkout;