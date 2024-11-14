import React, { useState } from 'react';
import axios from 'axios';

const RideForm = ({ fetchRides }) => {
  const [rideData, setRideData] = useState({ from: '', to: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideData({
      ...rideData,
      [name]: value
    });
  };

  const generateRandomPrice = () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rideWithPrice = { ...rideData, price: generateRandomPrice() }; 

    try {
      await axios.post('http://localhost:5000/api/rides/request', rideWithPrice);
      alert('Ride requested successfully!');
      setRideData({ from: '', to: '' });
      fetchRides();
    } catch (error) {
      console.error('Error requesting ride:', error);
      //alert('Failed to request ride. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request a New Ride</h2>
      <label>
        From: 
        <input 
          type="text" 
          name="from" 
          value={rideData.from} 
          onChange={handleChange} 
          required 
        />
      </label>
      <label>
        To: 
        <input 
          type="text" 
          name="to" 
          value={rideData.to} 
          onChange={handleChange} 
          required 
        />
      </label>
      <button type="submit">Request Ride</button>
    </form>
  );
};

export default RideForm;
