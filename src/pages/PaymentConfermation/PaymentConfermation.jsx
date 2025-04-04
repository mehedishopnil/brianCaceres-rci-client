import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Loading from '../../components/Loading';

const PaymentConfirmation = () => {
  const { allBookingsData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { resort, paymentMethod, amount, isPoints } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [matchingBooking, setMatchingBooking] = useState(null);

  useEffect(() => {
    console.log('Bookings Data:', allBookingsData);
    console.log('Resort Data:', resort);
  
    if (allBookingsData && resort) {
      // Ensure allBookingsData is an array
      const bookingsArray = Array.isArray(allBookingsData) ? allBookingsData : [allBookingsData];
      console.log('Bookings Array:', bookingsArray);
  
      // Find the most recent matching booking
      const foundBooking = bookingsArray
        .filter(booking => booking?.resort?.resort_ID === resort?.resort_ID)
        .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))[0];
  
      console.log('Found Booking:', foundBooking);
      setMatchingBooking(foundBooking);
    }
    setLoading(false);
  }, [allBookingsData, resort]);
  

  if (loading) {
    return <div><Loading/></div>;
  }

  if (!resort) {
    return <div>Error: Resort data is not available.</div>;
  }

  if (!matchingBooking) {
    return <div>No matching booking found for the selected resort.</div>;
  }

  const { email, price, points, paymentDetails, billingInfo } = matchingBooking;
  const { firstName, lastName, address1, address2, country, city, state, postalCode, phoneNumber } = billingInfo || {};
  const usedPaymentMethod = paymentMethod || matchingBooking.paymentMethod;
  const isPointsPayment = isPoints || usedPaymentMethod === 'points';

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          {isPointsPayment ? 'Points Redemption Confirmation' : 'Payment Confirmation'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-2">Billing Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>First Name:</strong> {firstName || 'N/A'}</p>
              <p><strong>Last Name:</strong> {lastName || 'N/A'}</p>
              <p><strong>Address Line 1:</strong> {address1 || 'N/A'}</p>
              <p><strong>Address Line 2:</strong> {address2 || 'N/A'}</p>
              <p><strong>Country:</strong> {country || 'N/A'}</p>
              <p><strong>City:</strong> {city || 'N/A'}</p>
              <p><strong>State:</strong> {state || 'N/A'}</p>
              <p><strong>Postal Code:</strong> {postalCode || 'N/A'}</p>
              <p><strong>Phone Number:</strong> {phoneNumber || 'N/A'}</p>
            </div>
          </div>

          {!isPointsPayment && (
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
              <div className="bg-gray-100 p-4 rounded">
                <p><strong>Card Number:</strong> **** **** **** {paymentDetails?.cardNumber?.slice(-4) || '****'}</p>
                <p><strong>Expiry Date:</strong> {paymentDetails?.expiryDate || 'N/A'}</p>
                <p><strong>CVV:</strong> ***</p>
                <p><strong>Payment Method:</strong> Credit Card</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Booking Summary</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Resort:</strong> {resort.place_name}</p>
            <p><strong>Email:</strong> {email}</p>
            {isPointsPayment ? (
              <p className="text-lg font-bold">
                <strong>Total Points Redeemed:</strong> {amount || points} RCI Points
              </p>
            ) : (
              <p className="text-lg font-bold">
                <strong>Total Paid:</strong> USD {amount || price}
              </p>
            )}
            <p><strong>Payment Method:</strong> {isPointsPayment ? 'RCI Points' : 'Credit Card'}</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </button>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
            onClick={() => navigate('/my-bookings')}
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;