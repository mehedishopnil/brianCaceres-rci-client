import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/Loading";

const Overview = () => {
  const { user, bookingsData } = useContext(AuthContext);

  if (!user) {
    return (
      <div>
        <Loading />
      </div>
    ); // or any loading indicator you prefer
  }


  const { name, email, photoURL } = user;

  // Ensure bookingsData is an array
  const bookingsArray = Array.isArray(bookingsData) ? bookingsData : [bookingsData];

  // Billing Info (assuming it is the same for all bookings)
  const billingInfo = bookingsArray[0]?.billingInfo || {};

  const {
    firstName,
    lastName,
    phoneNumber,
    postalCode,
    country,
    city,
    state,
    address1,
    address2,
  } = billingInfo;

  return (
    <div className="my-10 py-10 px-5">
      <div className="flex flex-col justify-center items-center">
        <img src={photoURL} alt="User" className="w-20 rounded-full" />
        <h1 className="text-xl font-bold text-center">{name}</h1>
        <p className="text-sm">{email}</p>
      </div>

      <div className="mt-10">
        <h1 className="text-lg font-bold">Your Bookings:</h1>

        {/* Booking cards */}
        <div className="flex flex-wrap gap-5 mt-2">
          {bookingsArray.length > 0 ? (
            bookingsArray.map((booking, index) => {
              const { img, place_name, location } = booking.resort;
              const { startDate, endDate, unitType } = booking;

              return (
                <div key={index} className="flex flex-col w-full md:w-1/2 lg:w-1/3 bg-gray-100 rounded-3xl p-5 shadow-lg">
                  <div className="flex-shrink-0">
                    <img src={img} alt="" className="w-full h-32 object-cover rounded-lg mb-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{place_name}</h2>
                    <p className="text-gray-700">{location}</p>
                    <p className="mt-2"><strong>Start Date:</strong> {startDate}</p>
                    <p><strong>End Date:</strong> {endDate}</p>
                    <p><strong>Unit Type:</strong> {unitType}</p>
                  </div>
                  <Link to='/dashboard/my-bookings' className="mt-4">
                  <button className="w-full text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    See all the bookings
                  </button>
                  </Link>
                </div>
              );
            })
          ) : (
            <div>No bookings found.</div>
          )}
        </div>
      </div>

      {/* Billing Info Card */}
      <div className="mt-10 bg-white shadow-lg rounded-3xl p-6">
        <h2 className="text-lg font-bold mb-4">Your Billing Info:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>First Name:</strong> {firstName}</p>
            <p><strong>Last Name:</strong> {lastName}</p>
            <p><strong>Phone Number:</strong> {phoneNumber}</p>
          </div>
          <div>
            <p><strong>Address Line 1:</strong> {address1}</p>
            <p><strong>Address Line 2:</strong> {address2 || 'N/A'}</p>
            <p><strong>City:</strong> {city}</p>
            <p><strong>State:</strong> {state}</p>
            <p><strong>Postal Code:</strong> {postalCode}</p>
            <p><strong>Country:</strong> {country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;