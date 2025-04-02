import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const ResortInputForm = () => {
  const { allResortData } = useContext(AuthContext);

  // Function to generate random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [formData, setFormData] = useState({
    img: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
    location: "",
    resort_ID: "",
    place_name: "",
    price_usd: "",
    resort_details: "",
    check_in_time: "",
    check_out_time: "",
    rating: getRandomNumber(7, 9).toString(), // Random between 7-9
    stateRating: "RCI Gold Crown", // Default value
    ownerExclusive: "Owner Exclusive", // Default value
    available_amount: "",
    reviews_amount: getRandomNumber(80, 800).toString(), // Random between 80-800
    room_details: {
      room_Description: "",
      sleeps_room: "2", // Default value
      privacy_room_amount: "2", // Default value
      kitchen: "Full", // Default value
      bath: "Full", // Default value
      studio_sleeps_room: "2", // Default value
      studio_privacy_room_amount: "2", // Default value
      studio_kitchen: "Partial", // Default value
      studio_bath: "Full", // Default value
      hotel_room: "2", // Default value
      hotel_privacy_room_amount: "2", // Default value
      hotel_kitchen: "No", // Default value
      hotel_bath: "Full", // Default value
    },
  });

  // If you need to regenerate random values when the component mounts or at other times
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      rating: getRandomNumber(7, 9).toString(),
      reviews_amount: getRandomNumber(80, 800).toString()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoomDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      room_details: {
        ...prevData.room_details,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_Link}/resorts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      // Reset form after successful submission (keeping the default values)
      setFormData({
        img: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        location: "",
        resort_ID: "",
        place_name: "",
        price_usd: "",
        resort_details: "",
        check_in_time: "",
        check_out_time: "",
        rating: getRandomNumber(7, 9).toString(),
        stateRating: "RCI Gold Crown",
        ownerExclusive: "Owner Exclusive",
        available_amount: "",
        reviews_amount: getRandomNumber(80, 800).toString(),
        room_details: {
          room_Description: "",
          sleeps_room: "2",
          privacy_room_amount: "2",
          kitchen: "Full",
          bath: "Full",
          studio_sleeps_room: "2",
          studio_privacy_room_amount: "2",
          studio_kitchen: "Partial",
          studio_bath: "Full",
          hotel_room: "2",
          hotel_privacy_room_amount: "2",
          hotel_kitchen: "No",
          hotel_bath: "Full",
        },
      });

      // Show success popup
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Form data submitted successfully");
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Show error popup
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  // Options for numbers 1 to 8
  const numberOptions = [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
    <option key={num} value={num}>
      {num}
    </option>
  ));

  // Options for Kitchen and Bath fields
  const kitchenBathOptions = [
    "Full",
    "Partial",
    "2 Full Baths",
    "3/4 Baths",
    "Full Bath & 3/4 Bath",
    "3 Full Baths",
    "No",
  ].map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="max-w-md p-4 mx-auto my-5">
      <h2 className="text-xl text-center font-semibold mb-4">
        Resort Input Form
      </h2>
      <h1>Total Data: {allResortData.length}</h1>
      <form onSubmit={handleSubmit} className="drop-shadow-sm border rounded p-4">
        {/* Rest of your form fields remain the same */}
        {/* They will now show the default values we set in the initial state */}
        
        {/* Example of how a field will now show the default value */}
        {/* Rating field - will show random value between 7-9 */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select the Rating</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        {/* All other form fields remain exactly the same */}
        {/* They will automatically show the default values we set in the initial state */}
        
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResortInputForm;