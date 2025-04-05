import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { IoIosArrowDown } from "react-icons/io";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContext } from "../../../providers/AuthProvider";

const SingleAvailableUnit = () => {
  const { user } = useContext(AuthContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 6),
    key: "selection",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();
  const currentResort = JSON.parse(localStorage.getItem("currentResort"));

  if (!currentResort) {
    return <div>Error: No resort data found.</div>;
  }

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setSelectionRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
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
      navigate("/login", {
        state: { from: location.pathname },
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

  // Array of unit types for cleaner rendering
  const unitTypes = [
    "studio",
    "1 bedroom",
    "2 bedroom",
    "3 bedroom",
    "4 bedroom"
  ];

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
        
        {/* Map through unit types for consistent rendering */}
        {unitTypes.map((unitType) => (
          <div key={unitType} className="text-center mt-5 py-3 shadow-md">
            <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">
              {unitType.charAt(0).toUpperCase() + unitType.slice(1)}
            </h1>
            <button
              className="mt-5 border-2 py-2 px-4 sm:px-20 font-semibold text-[#0370ad] border-[#0370ad] rounded"
              onClick={() => handleDateButtonClick(unitType)}
            >
              Select Date
            </button>
          </div>
        ))}
      </div>

      {/* Date Picker - Responsive */}
      {isCalendarOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2 md:p-0">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto overflow-auto max-h-[90vh]">
            <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-semibold">Select Booking Dates</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleCloseCalendar}
              >
                Close
              </button>
            </div>
            <div className="p-2 overflow-auto">
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                minDate={new Date()}
                maxDate={addDays(new Date(), 365)}
                direction="vertical"
                moveRangeOnFirstSelection={false}
                rangeColors={["#0370ad"]}
                months={1}
                className="w-full"
              />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t">
              <div className="flex justify-between gap-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded flex-1"
                  onClick={handleShowUnits}
                >
                  Show Units
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded flex-1"
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