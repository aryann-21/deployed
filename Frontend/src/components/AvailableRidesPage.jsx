import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import UserContext

const AvailableRidesPage = ({ allRides, filteredRides }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFilteredRides = location.pathname.includes('filtered-rides');
  const ridesToDisplay = isFilteredRides ? filteredRides : allRides;

  const { user } = useUser(); // Get the user from context

  const handleRideClick = (ride) => {
    if (isFilteredRides) {
      const { filters } = location.state;
      navigate('/dashboard/confirm-ride', {
        state: {
          ride: { ...ride, ...filters },
          name: user?.name || '', // Pass user's name
          email: user?.email || '', // Pass user's email
        }
      });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Available Rides</h2>
      {ridesToDisplay.length > 0 ? (
        <ul className="space-y-4">
          {ridesToDisplay.map((ride, index) => (
            <li
              key={index}
              className={`flex bg-gray-100 p-3 sm:p-4 rounded-lg shadow ${isFilteredRides ? 'cursor-pointer' : ''} ${isFilteredRides ? 'hover:bg-gray-200 hover:-translate-y-1 duration-150' : ''}`}
              onClick={() => handleRideClick(ride)}
            >
              <div
                className={`w-1 rounded-l-lg ${
                  ride.isAvailable ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <div className="flex-1 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="text-sm sm:text-base">
                    <p className="font-semibold">Driver Name: {ride.driverName}</p>
                    <p className="font-semibold">Driver Phone: {ride.driverPhone}</p>
                    <p className="font-semibold">Cab Number: {ride.cabNumber}</p>
                    <p className="font-semibold">Available Seats: {ride.availableSeats}</p>
                    <p className="font-semibold">Availability: {ride.isAvailable ? 'YES' : 'NO'}</p>
                  </div>
                  <span className="material-icons text-gray-500 hidden sm:block">directions_car</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-4">No rides available.</p>
      )}
    </div>
  );
};

export default AvailableRidesPage;
