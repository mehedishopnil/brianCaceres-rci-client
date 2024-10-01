import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { price, guestInfo, isGuest, resort, startDate, endDate, unitType } =
    location.state || {};

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

  const { email } = user;

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
      cardNumber,
      expiryDate,
      cvv,
      price,
      startDate,
      endDate,
      unitType,
      billingInfo: guestInfo ? { isGuest: true, ...guestInfo } : billingInfo,
    };


    try {
      const response = await fetch(
        "https://rci-last-call-server.vercel.app/bookings",
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
        alert("Payment confirmed!");
        navigate("/payment-confirmation", {
          state: { resort },
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
        Confirm Your Payment
      </h1>

      {user ? (
        <form onSubmit={handleContinue} className="mt-4">
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

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Total Price: USD {price}</h3>
          </div>

          <div className="md:grid grid-cols-2 items-center justify-between px-4 py-4 h-auto z-50 sticky bottom-0 bg-slate-100">
            <div className="flex justify-between font-semibold py-2 gap-10 row-span-1">
              <h1>View RCI Charges</h1>
              <h1>USD {price}</h1>
            </div>

            <div className="flex w-full row-span-1">
              <button
                type="submit"
                className="w-full py-2 rounded font-bold bg-yellow-400"
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-center text-red-500">
          You must be logged in to make a payment.
        </p>
      )}
    </div>
  );
};

export default Payment;
