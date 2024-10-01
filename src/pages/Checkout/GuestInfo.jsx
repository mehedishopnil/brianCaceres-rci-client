import React, { useState } from 'react';

const GuestInfo = ({ onGuestInfoChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    workPhone: '',
    sendConfirmation: false,
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    onGuestInfoChange({ ...formData, [name]: newValue });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
      <form className="space-y-4">
        <div>
          <label>Guest First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Guest Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Guest Address Line 1</label>
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Guest Address Line 2</label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Guest Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Guest Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Guest Work Phone</label>
          <input
            type="tel"
            name="workPhone"
            value={formData.workPhone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="sendConfirmation"
            checked={formData.sendConfirmation}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Send a confirmation email to the guest above</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Agree to the Terms and Conditions</label>
        </div>
      </form>
    </div>
  );
};

export default GuestInfo;