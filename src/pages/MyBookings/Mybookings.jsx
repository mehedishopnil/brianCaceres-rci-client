import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const MyBookings = () => {
  const { allBookingsData, user } = useContext(AuthContext);

  // Ensure allBookingsData is an array
  const bookingsArray = Array.isArray(allBookingsData) ? allBookingsData : [allBookingsData];

  // Filter bookings that match the user's email
  const userBookings = bookingsArray.filter(booking => booking.email === user.email);

  return (
    <div className="py-6 px-4">
      <h1 className="text-center text-2xl font-bold mb-6">Total Bookings {allBookingsData.length}</h1>

      {/* Booking Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userBookings.length > 0 ? (
          userBookings.map((booking, index) => {
            const { img, place_name, location } = booking.resort;
            const { startDate, endDate, price } = booking;

            return (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={img} alt={place_name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{place_name}</h2>
                  <p className="text-gray-500">{location}</p>
                  <p className="mt-2 text-gray-700">Price: ${price}</p>
                  <p className="text-gray-500">Dates: {startDate} - {endDate}</p>
                  <a href={`/resorts/${place_name}`} className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                    View Resort
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;