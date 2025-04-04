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
    check_in_time: "16:00",
    check_out_time: "11:00",
    rating: getRandomNumber(8, 10).toString(),
    stateRating: "RCI Gold Crown",
    ownerExclusive: "Owner Exclusive",
    available_amount: "5",
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
        check_in_time: "3:00 PM",
        check_out_time: "11:00 AM",
        rating: getRandomNumber(7, 9).toString(),
        stateRating: "RCI Gold Crown",
        ownerExclusive: "Owner Exclusive",
        available_amount: "5",
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
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
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

  // Options for state rating
  const stateRatingOptions = [
    "RCI Gold Crown",
    "RCI Silver Crown",
    "RCI Hospitality",
  ].map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  // Options for owner exclusive
  const ownerExclusiveOptions = [
    "Owner Exclusive",
    "Member Exclusive",
    "Public Resort",
  ].map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="max-w-4xl mx-auto my-5 p-4">
      <h2 className="text-2xl text-center font-semibold mb-6">
        Resort Input Form
      </h2>
      <h3 className="text-lg mb-4">Total Resorts in System: {allResortData.length}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Basic Information Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Resort ID</label>
              <input
                type="text"
                name="resort_ID"
                value={formData.resort_ID}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Resort Name</label>
              <input
                type="text"
                name="place_name"
                value={formData.place_name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
              <input
                type="number"
                name="price_usd"
                value={formData.price_usd}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Image URLs</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num}>
                <label className="block text-sm font-medium text-gray-700">Image {num} URL</label>
                <input
                  type="url"
                  name={num === 1 ? "img" : `img${num}`}
                  value={formData[num === 1 ? "img" : `img${num}`]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Resort Details Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Resort Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in Time</label>
              <input
                type="text"
                name="check_in_time"
                value={formData.check_in_time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-out Time</label>
              <input
                type="text"
                name="check_out_time"
                value={formData.check_out_time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                {[5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State Rating</label>
              <select
                name="stateRating"
                value={formData.stateRating}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                {stateRatingOptions}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Owner Exclusive</label>
              <select
                name="ownerExclusive"
                value={formData.ownerExclusive}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                {ownerExclusiveOptions}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Available Units</label>
              <input
                type="number"
                name="available_amount"
                value={formData.available_amount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reviews Amount</label>
              <input
                type="number"
                name="reviews_amount"
                value={formData.reviews_amount}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Resort Description</label>
              <textarea
                name="resort_details"
                value={formData.resort_details}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Room Details Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Room Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard Room */}
            <div className="border p-4 rounded-lg">
              <h4 className="font-medium mb-3">Standard Room</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sleeps</label>
                  <select
                    name="sleeps_room"
                    value={formData.room_details.sleeps_room}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {numberOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Privacy Rooms</label>
                  <select
                    name="privacy_room_amount"
                    value={formData.room_details.privacy_room_amount}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {numberOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kitchen</label>
                  <select
                    name="kitchen"
                    value={formData.room_details.kitchen}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {kitchenBathOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bath</label>
                  <select
                    name="bath"
                    value={formData.room_details.bath}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {kitchenBathOptions}
                  </select>
                </div>
              </div>
            </div>

            {/* Studio Room */}
            <div className="border p-4 rounded-lg">
              <h4 className="font-medium mb-3">Studio Room</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sleeps</label>
                  <select
                    name="studio_sleeps_room"
                    value={formData.room_details.studio_sleeps_room}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {numberOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Privacy Rooms</label>
                  <select
                    name="studio_privacy_room_amount"
                    value={formData.room_details.studio_privacy_room_amount}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {numberOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kitchen</label>
                  <select
                    name="studio_kitchen"
                    value={formData.room_details.studio_kitchen}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {kitchenBathOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bath</label>
                  <select
                    name="studio_bath"
                    value={formData.room_details.studio_bath}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {kitchenBathOptions}
                  </select>
                </div>
              </div>
            </div>

            {/* Hotel Room */}
            <div className="border p-4 rounded-lg">
              <h4 className="font-medium mb-3">Hotel Room</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sleeps</label>
                  <select
                    name="hotel_room"
                    value={formData.room_details.hotel_room}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {numberOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Privacy Rooms</label>
                  <select
                    name="hotel_privacy_room_amount"
                    value={formData.room_details.hotel_privacy_room_amount}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {numberOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kitchen</label>
                  <select
                    name="hotel_kitchen"
                    value={formData.room_details.hotel_kitchen}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {kitchenBathOptions}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bath</label>
                  <select
                    name="hotel_bath"
                    value={formData.room_details.hotel_bath}
                    onChange={handleRoomDetailsChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {kitchenBathOptions}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Resort Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResortInputForm;