import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { IoIosArrowDown } from "react-icons/io";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContext } from "../../../providers/AuthProvider";

const SingleAvailableUnit = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 6),
    key: "selection",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();
  const currentResort = JSON.parse(localStorage.getItem("currentResort"));

  const vacationType = location.state?.vacationType || currentResort?.vacationType || "rciPoints";

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

  const handleClearDate = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: "selection",
    });
    setIsCalendarOpen(false);
  };

  const calculateNights = () => {
    const start = new Date(selectionRange.startDate);
    const end = new Date(selectionRange.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const unitTypes = [
    "studio",
    "1 bedroom",
    "2+ bedroom",
    "3 bedroom",
    "4 bedroom"
  ];

  // Simple implementation to check if unit is unavailable
  // You might want to replace this with actual availability logic
  const isUnitUnavailable = (unitType) => {
    return false; // Default to all units being available
  };

  const handleShowUnits = () => {
    if (!currentResort) return;
    
    if (user) {
      navigate("/available-booking", {
        state: {
          resort: currentResort,
          startDate: selectionRange.startDate,
          endDate: selectionRange.endDate,
          unitType: selectedUnit,
          vacationType,
          nights: calculateNights(),
        },
      });
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  return (
    <div className="mt-10">
      <div className="hidden md:flex justify-center text-4xl text-white py-6 bg-[#037092]">
        <h1>Available Units</h1>
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

      <div>
        <h1 className="text-center text-xl font-semibold my-4">
          {vacationType === "rciPoints" ? "RCI Points Vacations" : "Last Call Vacations"}
        </h1>
        
        {unitTypes.map((unitType) => {
          const unavailable = isUnitUnavailable(unitType);
          return (
            <div key={unitType} className={`text-center mt-5 py-3 shadow-md ${unavailable ? 'opacity-50' : ''}`}>
              <h1 className="text-3xl text-[#0370ad] bg-[#e6f8fc] py-5">
                {unitType.charAt(0).toUpperCase() + unitType.slice(1)}
                {unavailable && <span className="text-red-500 ml-2">(Unavailable)</span>}
              </h1>
              <button
                className={`mt-5 border-2 py-2 px-4 sm:px-20 font-semibold rounded ${
                  unavailable 
                    ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                    : 'text-[#0370ad] border-[#0370ad] hover:bg-[#0370ad] hover:text-white'
                }`}
                onClick={() => !unavailable && handleDateButtonClick(unitType)}
                disabled={unavailable}
              >
                {unavailable ? 'Unavailable' : 'Select Date'}
              </button>
            </div>
          );
        })}
      </div>

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
                  Show Available Units
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