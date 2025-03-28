import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const ResortInputForm = () => {
  const { allResortData } = useContext(AuthContext);

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
    rating: "",
    stateRating: "",
    ownerExclusive: "",
    available_amount: "",
    reviews_amount: "",
    room_details: {
      room_Description: "",
      sleeps_room: "",
      privacy_room_amount: "",
      kitchen: "",
      bath: "",
      studio_sleeps_room: "",
      studio_privacy_room_amount: "",
      studio_kitchen: "",
      studio_bath: "",
      hotel_room: "",
      hotel_privacy_room_amount: "",
      hotel_kitchen: "",
      hotel_bath: "",
    },
  });

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

      // Reset form after successful submission
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
        rating: "",
        stateRating: "",
        ownerExclusive: "",
        available_amount: "",
        reviews_amount: "",
        room_details: {
          room_Description: "",
          sleeps_room: "",
          privacy_room_amount: "",
          kitchen: "",
          bath: "",
          studio_sleeps_room: "",
          studio_privacy_room_amount: "",
          studio_kitchen: "",
          studio_bath: "",
          hotel_room: "",
          hotel_privacy_room_amount: "",
          hotel_kitchen: "",
          hotel_bath: "",
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
        {/* Image 1 */}
        <div className="mb-4">
          <label htmlFor="img" className="block text-sm font-medium text-gray-700">
            Main Image
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Image 2 */}
        <div className="mb-4">
          <label htmlFor="img2" className="block text-sm font-medium text-gray-700">
            Image 2
          </label>
          <input
            type="text"
            id="img2"
            name="img2"
            value={formData.img2}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Image 3 */}
        <div className="mb-4">
          <label htmlFor="img3" className="block text-sm font-medium text-gray-700">
            Image 3
          </label>
          <input
            type="text"
            id="img3"
            name="img3"
            value={formData.img3}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>


        {/* Image 4 */}
        <div className="mb-4">
          <label htmlFor="img4" className="block text-sm font-medium text-gray-700">
            Image 4
          </label>
          <input
            type="text"
            id="img4"
            name="img4"
            value={formData.img4}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>


        {/* Image 5 */}
        <div className="mb-4">
          <label htmlFor="img5" className="block text-sm font-medium text-gray-700">
            Image 5
          </label>
          <input
            type="text"
            id="img5"
            name="img5"
            value={formData.img5}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Resort ID */}
        <div className="mb-4">
          <label htmlFor="resortID" className="block text-sm font-medium text-gray-700">
            Resort ID
          </label>
          <input
            type="text"
            id="resortID"
            name="resort_ID"
            value={formData.resort_ID}
            onChange={handleChange}
            className="mt-1 p-2 w-full text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Place Name */}
        <div className="mb-4">
          <label htmlFor="placeName" className="block text-sm font-medium text-gray-700">
            Place Name
          </label>
          <input
            type="text"
            id="placeName"
            name="place_name"
            value={formData.place_name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Price USD */}
        <div className="mb-4">
          <label htmlFor="priceUSD" className="block text-sm font-medium text-gray-700">
            Price USD
          </label>
          <input
            type="number"
            id="priceUSD"
            name="price_usd"
            value={formData.price_usd}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Resort Details */}
        <div className="mb-4">
          <label htmlFor="resortDetails" className="block text-sm font-medium text-gray-700">
            Resort Details
          </label>
          <textarea
            id="resortDetails"
            name="resort_details"
            value={formData.resort_details}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Check-in Time */}
        <div className="mb-4">
          <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700">
            Check-in Time
          </label>
          <select
            id="check_in_time"
            name="check_in_time"
            value={formData.check_in_time}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select the Time</option>
            <option value="12.00">12.00</option>
            <option value="13.00">13.00</option>
            <option value="14.00">14.00</option>
            <option value="15.00">15.00</option>
            <option value="16.00">16.00</option>
            <option value="17.00">17.00</option>
            <option value="18.00">18.00</option>
          </select>
        </div>

        {/* Check-out Time */}
        <div className="mb-4">
          <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700">
            Check-out Time
          </label>
          <select
            id="check_out_time"
            name="check_out_time"
            value={formData.check_out_time}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select the Time</option>
            <option value="09.00">09.00</option>
            <option value="09.30">09.30</option>
            <option value="10.00">10.00</option>
            <option value="10.30">10.30</option>
            <option value="11.00">11.00</option>
            <option value="12.00">12.00</option>
            <option value="13.00">13.00</option>
          </select>
        </div>

        {/* Rating */}
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

        {/* RCI Gold Crown / Silver Crown */}
        <div className="mb-4">
          <label htmlFor="stateRating" className="block text-sm font-medium text-gray-700">
            Rating Option
          </label>
          <select
            id="stateRating"
            name="stateRating"
            value={formData.stateRating}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select the Option</option>
            <option value="RCI Gold Crown">RCI Gold Crown</option>
            <option value="RCI Silver Crown">RCI Silver Crown</option>
          </select>
        </div>

        {/* Owner Exclusive */}
        <div className="mb-4">
          <label htmlFor="ownerExclusive" className="block text-sm font-medium text-gray-700">
            Owner Exclusive
          </label>
          <select
            id="ownerExclusive"
            name="ownerExclusive"
            value={formData.ownerExclusive}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select the Option</option>
            <option value="Owner Exclusive">Owner Exclusive</option>
            <option value="new Owner Exclusive">new Owner Exclusive</option>
          </select>
        </div>

        {/* Available Amount */}
        <div className="mb-4">
          <label htmlFor="availableAmount" className="block text-sm font-medium text-gray-700">
            Available Amount
          </label>
          <input
            type="number"
            id="availableAmount"
            name="available_amount"
            value={formData.available_amount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Reviews Amount */}
        <div className="mb-4">
          <label htmlFor="reviewsAmount" className="block text-sm font-medium text-gray-700">
            Reviews Amount
          </label>
          <input
            type="number"
            id="reviewsAmount"
            name="reviews_amount"
            value={formData.reviews_amount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Room Description */}
        <div className="mb-4">
          <label htmlFor="room_Description" className="block text-sm font-medium text-gray-700">
            Room Description
          </label>
          <textarea
            id="roomDescription"
            name="room_Description"
            value={formData.room_details.room_Description}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Sleeps Room */}
        <div className="mb-4">
          <label htmlFor="sleeps_room" className="block text-sm font-medium text-gray-700">
            Sleeps Room
          </label>
          <select
            id="sleeps_room"
            name="sleeps_room"
            value={formData.room_details.sleeps_room}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Number</option>
            {numberOptions}
          </select>
        </div>

        {/* Privacy Room Amount */}
        <div className="mb-4">
          <label htmlFor="privacy_room_amount" className="block text-sm font-medium text-gray-700">
            Privacy Room Amount
          </label>
          <select
            id="privacy_room_amount"
            name="privacy_room_amount"
            value={formData.room_details.privacy_room_amount}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Number</option>
            {numberOptions}
          </select>
        </div>

        {/* Kitchen */}
        <div className="mb-4">
          <label htmlFor="kitchen" className="block text-sm font-medium text-gray-700">
            Kitchen
          </label>
          <select
            id="kitchen"
            name="kitchen"
            value={formData.room_details.kitchen}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Option</option>
            {kitchenBathOptions}
          </select>
        </div>

        {/* Bath */}
        <div className="mb-4">
          <label htmlFor="bath" className="block text-sm font-medium text-gray-700">
            Bath
          </label>
          <select
            id="bath"
            name="bath"
            value={formData.room_details.bath}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Option</option>
            {kitchenBathOptions}
          </select>
        </div>

        {/* Studio Sleeps Room */}
        <div className="mb-4">
          <label htmlFor="studio_sleeps_room" className="block text-sm font-medium text-gray-700">
            Studio Sleeps Room
          </label>
          <select
            id="studio_sleeps_room"
            name="studio_sleeps_room"
            value={formData.room_details.studio_sleeps_room}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Number</option>
            {numberOptions}
          </select>
        </div>

        {/* Studio Privacy Room Amount */}
        <div className="mb-4">
          <label htmlFor="studio_privacy_room_amount" className="block text-sm font-medium text-gray-700">
            Studio Privacy Room Amount
          </label>
          <select
            id="studio_privacy_room_amount"
            name="studio_privacy_room_amount"
            value={formData.room_details.studio_privacy_room_amount}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Number</option>
            {numberOptions}
          </select>
        </div>

        {/* Studio Kitchen */}
        <div className="mb-4">
          <label htmlFor="studio_kitchen" className="block text-sm font-medium text-gray-700">
            Studio Kitchen
          </label>
          <select
            id="studio_kitchen"
            name="studio_kitchen"
            value={formData.room_details.studio_kitchen}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Option</option>
            {kitchenBathOptions}
          </select>
        </div>

        {/* Studio Bath */}
        <div className="mb-4">
          <label htmlFor="studio_bath" className="block text-sm font-medium text-gray-700">
            Studio Bath
          </label>
          <select
            id="studio_bath"
            name="studio_bath"
            value={formData.room_details.studio_bath}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Option</option>
            {kitchenBathOptions}
          </select>
        </div>

        {/* Hotel Room */}
        <div className="mb-4">
          <label htmlFor="hotel_room" className="block text-sm font-medium text-gray-700">
            Hotel Room
          </label>
          <select
            id="hotel_room"
            name="hotel_room"
            value={formData.room_details.hotel_room}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Number</option>
            {numberOptions}
          </select>
        </div>

        {/* Hotel Privacy Room Amount */}
        <div className="mb-4">
          <label htmlFor="hotel_privacy_room_amount" className="block text-sm font-medium text-gray-700">
            Hotel Privacy Room Amount
          </label>
          <select
            id="hotel_privacy_room_amount"
            name="hotel_privacy_room_amount"
            value={formData.room_details.hotel_privacy_room_amount}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Number</option>
            {numberOptions}
          </select>
        </div>

        {/* Hotel Kitchen */}
        <div className="mb-4">
          <label htmlFor="hotel_kitchen" className="block text-sm font-medium text-gray-700">
            Hotel Kitchen
          </label>
          <select
            id="hotel_kitchen"
            name="hotel_kitchen"
            value={formData.room_details.hotel_kitchen}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Option</option>
            {kitchenBathOptions}
          </select>
        </div>

        {/* Hotel Bath */}
        <div className="mb-4">
          <label htmlFor="hotel_bath" className="block text-sm font-medium text-gray-700">
            Hotel Bath
          </label>
          <select
            id="hotel_bath"
            name="hotel_bath"
            value={formData.room_details.hotel_bath}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Option</option>
            {kitchenBathOptions}
          </select>
        </div>

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
