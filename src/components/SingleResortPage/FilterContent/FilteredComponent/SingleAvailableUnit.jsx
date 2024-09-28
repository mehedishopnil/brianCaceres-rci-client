import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { IoIosArrowDown } from "react-icons/io";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContext } from "../../../../providers/AuthProvider";

const SingleAvailableUnit = () => {
  const {user} = useContext(AuthContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 6),
    key: "selection",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate()
  const currentResort = JSON.parse(localStorage.getItem('currentResort'));

  // Ensure currentResort is not null before using it
  if (!currentResort) {
    return <div>Error: No resort data found.</div>;
  }
  

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    const startDate = new Date(
      selection.startDate.getFullYear(),
      selection.startDate.getMonth(),
      selection.startDate.getDate()
    );
    setSelectionRange({
      startDate: startDate,
      endDate: addDays(startDate, 6),
      key: "selection",
    });
  };
  
  

  const handleDateButtonClick = (unitType) => {
    setSelectedUnit(unitType);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  const handleShowUnits = () => {
    if (!currentResort) {
        console.error("Error: No currentResort data available.");
        return;
    }

    if (user) {
        navigate("/available-booking", {
            state: {
                resort: currentResort,
                startDate: selectionRange.startDate,
                endDate: selectionRange.endDate,
                unitType: selectedUnit,
            },
        });
    } else {
        // User is not logged in, save current path and redirect to login
        navigate("/login", {
            state: { from: location.pathname }
        });
    }
};


  const handleClearDate = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: "selection",
    });
    setIsCalendarOpen(false);
  };


  return (
    <div className="mt-10">
      <div className="hidden md:flex justify-center text-4xl text-white py-6 bg-[#037092]">
        <h1> Available Units</h1>
      </div>

      <div className="md:hidden flex justify-center text-white py-6 bg-[#037092]">
        <div className="flex flex-col items-center bg-[#e6f8fc] px-10 py-4 rounded text-gray-700">
          <h1>TRAVEL DATES</h1>
          <button
            className="flex items-center text-2xl font-semibold"
            onClick={() => handleDateButtonClick("studio")}
          >
            Select check-in <IoIosArrowDown />
          </button>
        </div>
      </div>

      <div className="flex justify-center my-10">
        <div className="w-10/12 flex flex-col items-center border-[1px] p-2 rounded shadow-md">
          <h1>BEFORE YOU BOOK</h1>
          <div className="divider"></div>
          <button className="flex link items-center text-xl font-semibold text-[#037092]">
            Fees & Urgent Information
          </button>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h1 className="text-center text-xl font-semibold"> Available Units </h1>
        <div className="text-center mt-5 py-3 shadow-md">
          <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">Studio</h1>
          <button
            className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
            onClick={() => handleDateButtonClick("studio")}
          >
            Select Date
          </button>
        </div>

        <div className="text-center mt-5 py-3 shadow-md">
          <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">1 bedroom</h1>
          <button
            className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
            onClick={() => handleDateButtonClick("1 bedroom")}
          >
            Select Date
          </button>
        </div>

        <div className="text-center mt-5 py-3 shadow-md">
          <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">2 bedroom</h1>
          <button
            className="mt-5 border-2 py-2 px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
            onClick={() => handleDateButtonClick("2 bedroom")}
          >
            Select Date
          </button>
        </div>
      </div>

      {/* Date functions */}

      {isCalendarOpen && (
        <div className="fixed inset-0 flex flex-col justify-between bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Booking Dates</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleCloseCalendar}
              >
                Close
              </button>
            </div>
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              maxDate={addDays(new Date(), 365)} // Optional: Set a maximum date
              direction="vertical"
              moveRangeOnFirstSelection={false}
              rangeColors={["#0370ad"]}
              months={1}
              className="w-full"
            />
            <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg mx-auto mb-5">
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={handleShowUnits}
                >
                  Show Units
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={handleClearDate}
                >
                  Clear Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAvailableUnit;
