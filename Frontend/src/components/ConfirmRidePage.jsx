import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; // Make sure Axios is imported for the POST request
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";

const ConfirmRidePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = 'debugger';
  const message = 'debugging';
  const { user } = useUser(); // Access user from context

  // Destructure ride and email from location.state with fallback
  const { ride = {}, email = "", contactMessage = "" } = location.state || {}; // Assuming contactMessage is passed

  const handleConfirm = async () => {
    if (!email || !ride) {
      toast.error("Missing ride details or email.");
      return;
    }

    try {
      // Send the WhatsApp message
      const response = await axios.post("https://deployed-backend-62rm.onrender.com/send-whatsapp", {
        name: name,
        email: email,
        uName: user.name,
        uPhone: user.phone,
        message: message,
        driverName: ride.driverName,
        driverPhone: ride.driverPhone,
        cabNumber: ride.cabNumber,
        dropLocation: ride.dropLocation,
        date: ride.date,
        time: ride.time,
        numberOfPeople: ride.numberOfPeople,
        payment: ride.fare * ride.numberOfPeople,
      });

      if (response.status === 200) {
        console.log("Ride history saved:", response.data);
        toast.success("Ride confirmed and history updated!");

        // Save ride history to the backend
        await saveRideHistory();

        // Navigate to ride history page after confirmation
        navigate("/dashboard/ride-history", {
          state: {
            rideBooked: true,
          },
        });
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
      toast.error("Error confirming ride");
    }
  };

  // Function to save ride history
  const saveRideHistory = async () => {
    try {
      const rideHistoryResponse = await axios.post("https://deployed-backend-62rm.onrender.com/save-ride-history", {
        email: email,
        dropLocation: ride.dropLocation,
        date: ride.date,
        time: ride.time,
        payment: ride.fare * ride.numberOfPeople,
      });

      if (rideHistoryResponse.status === 200) {
        console.log("Ride history updated:", rideHistoryResponse.data);
      } else {
        console.error("Failed to update ride history");
        toast.error("Failed to update ride history");
      }
    } catch (error) {
      console.error("Error saving ride history:", error);
      toast.error("Error saving ride history");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-4 sm:mt-10">
      <ToastContainer />
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        Confirm Your Ride
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap justify-between mb-4 sm:mb-6 text-sm sm:text-base md:text-[17px]">
        {/* Left Column - Rider Details */}
        <div className="w-full md:w-1/2 p-2 sm:p-4 space-y-2 sm:space-y-4">
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Driver Name:</p>
            <p className="text-gray-800">{ride.driverName}</p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Driver Phone:</p>
            <p className="text-gray-800">{ride.driverPhone}</p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Cab Number:</p>
            <p className="text-gray-800">{ride.cabNumber}</p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Available Seats:</p>
            <p className="text-gray-800">{ride.availableSeats}</p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Total Fare:</p>
            <p className="text-green-600">
              Rs {ride.fare * ride.numberOfPeople}/-
            </p>
          </div>
        </div>

        {/* Right Column - Ride Details */}
        <div className="w-full md:w-1/2 p-2 sm:p-4 space-y-2 sm:space-y-4 mt-4 md:mt-0">
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Availability:</p>
            <p
              className={`text-gray-900 ${
                ride.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {ride.isAvailable ? "YES" : "NO"}
            </p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Drop Location:</p>
            <p className="text-gray-800">{ride.dropLocation}</p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Number of People:</p>
            <p className="text-gray-800">{ride.numberOfPeople}</p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Pickup Time:</p>
            <p className="text-gray-800">{ride.time}</p>
          </div>
          <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded-md shadow-sm">
            <p className="font-semibold text-gray-900">Pickup Date:</p>
            <p className="text-gray-800">{ride.date}</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-150"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePage;
