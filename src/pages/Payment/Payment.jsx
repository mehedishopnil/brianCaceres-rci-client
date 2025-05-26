import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    price, 
    points, 
    paymentMethod, 
    guestInfo, 
    isGuest, 
    resort, 
    startDate, 
    endDate, 
    unitType,
    nights
  } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const { email } = user || {};

  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);
  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingInfo = {
      resort,
      email,
      paymentMethod,
      price: paymentMethod === 'cash' ? price : 0,
      points: paymentMethod === 'points' ? points : 0,
      startDate,
      endDate,
      unitType,
      nights,
      billingInfo: guestInfo ? { isGuest: true, ...guestInfo } : billingInfo,
      paymentDetails: paymentMethod === 'cash' ? {
        cardNumber,
        expiryDate,
        cvv
      } : null
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_Link}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingInfo),
        }
      );

      if (response.ok) {
        setLoading(false);
        alert("Booking confirmed!");
        navigate("/payment-confirmation", {
          state: { 
            resort,
            paymentMethod,
            amount: paymentMethod === 'cash' ? price : points,
            isPoints: paymentMethod === 'points'
          },
        });
      } else {
        setLoading(false);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        {paymentMethod === 'cash' ? 'Confirm Your Payment' : 'Confirm Points Redemption'}
      </h1>

      {!user ? (
        <p className="text-center text-red-500">
          You must be logged in to complete your booking.
        </p>
      ) : (
        <form onSubmit={handleContinue} className="mt-4">
          {paymentMethod === 'cash' && (
            <>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-lg font-medium">
                  Card Number:
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="expiryDate" className="block text-lg font-medium">
                  Expiry Date:
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  className="mt-1 block w-full p-2 border rounded"
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="cvv" className="block text-lg font-medium">
                  CVV:
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={handleCvvChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          )}

          {!guestInfo && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Billing Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={billingInfo.firstName}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={billingInfo.lastName}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="address1"
                  placeholder="Address Line 1"
                  value={billingInfo.address1}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="address2"
                  placeholder="Address Line 2 (Optional)"
                  value={billingInfo.address2}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={billingInfo.country}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={billingInfo.city}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={billingInfo.state}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={billingInfo.postalCode}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={billingInfo.phoneNumber}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-4 p-4 bg-gray-50 rounded">
            <h3 className="text-lg font-semibold">Booking Summary</h3>
            <p>Resort: {resort?.place_name}</p>
            <p>Unit Type: {unitType}</p>
            <p>Dates: {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()} ({nights} nights)</p>
            {paymentMethod === 'cash' ? (
              <p className="font-bold mt-2">Total Price: ${price} USD + (includes tax)</p>
            ) : (
              <p className="font-bold mt-2">Total Points: {points} RCI Points</p>
            )}
          </div>

          <div className="md:grid grid-cols-2 items-center justify-between px-4 py-4 h-auto z-50 sticky bottom-0 bg-slate-100">
            <div className="flex justify-between font-semibold py-2 gap-10 row-span-1">
              <h1>View Booking Details</h1>
              {paymentMethod === 'cash' ? (
                <h1>USD {price}</h1>
              ) : (
                <h1>{points} Points</h1>
              )}
            </div>

            <div className="flex w-full row-span-1">
              <button
                type="submit"
                className="w-full py-2 rounded font-bold bg-yellow-400 hover:bg-yellow-500"
                disabled={loading}
              >
                {loading ? "Processing..." : (
                  paymentMethod === 'cash' ? "Confirm Payment" : "Confirm Points Redemption"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Payment;