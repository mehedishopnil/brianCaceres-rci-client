import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const UsersBookings = () => {
  const { allBookingsData } = useContext(AuthContext);

  // Check if allBookingsData is an array and is not empty
  const flattenedBookingsData = Array.isArray(allBookingsData[0])
    ? allBookingsData.flat()
    : allBookingsData;


  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Total Bookings {flattenedBookingsData.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full hidden lg:table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Resort Name</th>
              <th>Booking Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {flattenedBookingsData.map((booking, index) => (
              <tr key={index}>
                <td>
                  {booking.resort?.img ? (
                    <img
                      src={booking.resort.img}
                      alt="Resort"
                      className="w-24 h-24 object-cover"
                    />
                  ) : (
                    <span>No image available</span>
                  )}
                </td>
                <td>{booking.resort?.name || "Unknown resort"}</td>
                <td>{booking.date || "No date available"}</td>
                <td>{booking.status || "No status available"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive */}
        <div className="block lg:hidden">
          {flattenedBookingsData.map((booking, index) => (
            <div
              key={index}
              className="card card-side bg-base-100 shadow-xl p-2 py-3 mb-4"
            >
              <figure>
                {booking.resort?.img ? (
                  <img
                    src={booking.resort.img}
                    alt="Resort"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ) : (
                  <span>No image available</span>
                )}
              </figure>
              <div className="pl-10 space-y-1">
                <h2 className="card-title">
                  {booking.billingInfo?.firstName || "Unknown"} {booking.billingInfo?.lastName || "User"}
                </h2>
                <div>
                  <p>
                    <strong>Booking Date:</strong>
                  </p>
                  <p>{booking.startDate || "No start date"}</p>
                  <p>{booking.endDate || "No end date"}</p>
                </div>
                <p>
                  <strong>Unit Type:</strong> {booking.unitType || "No unit type"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersBookings;
