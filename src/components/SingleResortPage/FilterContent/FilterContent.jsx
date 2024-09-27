import { useState, useRef, useEffect, useContext } from "react";
import AvailableUnits from "./FilteredComponent/AvailableUnits";
import RoomDetails from "./FilteredComponent/RoomDetails";
import ResortDetails from "./FilteredComponent/ResortDetails";


const FilterContent = ({ currentResort }) => {
  const {
    room_details,
    available_amount,
    resort_details,
    check_in_time,
    check_out_time,
    place_name,
    location,
    reviews_amount,
    rating,
    resort_ID
  } = currentResort;

  // State to track the active menu
  const [activeMenu, setActiveMenu] = useState("Available Units");

  // Ref for the filter menu
  const filterMenuRef = useRef(null);

  // Function to handle menu click and set active menu
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  // Demo content for each menu
  const menuContent = {
    "Available Units": 
    <AvailableUnits 
    currentResort = {currentResort}
     />,


    // "All-inclusive info": <AllInclusiveInfo />,

    "Room Details": 
    <RoomDetails room_details={room_details} />,

    "Resort Details": (
      <div>
        <ResortDetails resort_details = {resort_details} check_in_time = {check_in_time} check_out_time = {check_out_time} />
      </div>
    ),

    "Area info": (
      <div>
          <h1>Area Info</h1>
        {/* <AreaInfo place_name={place_name} location={location} /> */}
      </div>
    ),
    Reviews: (
      <div>
          <h1>Reviews</h1>
        {/* <Reviews reviews_amount={reviews_amount} rating={rating}/> */}
        {/* <Reviews reviews_amount={reviews_amount} rating={rating}/> */}
      </div>
    ),
  };

  // Effect to update the position of the filter menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const filterMenu = filterMenuRef.current;
      const offsetTop = filterMenu.offsetTop;
      if (window.pageYOffset > offsetTop) {
        filterMenu.classList.add(
          "fixed",
          "top-0",
          "w-full",
          "z-10",
          "bg-white",
          "shadow-md"
        );
      } else {
        filterMenu.classList.remove(
          "fixed",
          "top-0",
          "w-full",
          "z-10",
          "bg-white",
          "shadow-md"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  

  return (
    <div className="overflow-x-hidden">
      {/* Filter menu */}
      <div ref={filterMenuRef} className="carousel">
        <ul className="carousel-item space-x-5 relative text-xl font-semibold pl-3 my-5">
          {Object.keys(menuContent).map((menu) => (
            <li
              key={menu}
              className={
                activeMenu === menu ? "active underline text-[#037092] " : ""
              }
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>

      {/* Content for each menu can be added below */}
      {menuContent[activeMenu]}
    </div>
  );
};

export default FilterContent;