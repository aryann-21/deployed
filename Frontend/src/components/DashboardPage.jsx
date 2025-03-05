import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import BookRidePage from "./BookRidePage";
import RideHistoryPage from "./RideHistoryPage";
import MessagesPage from "./MessagesPage";
import ProfilePage from "./ProfilePage";
import AvailableRidesPage from "./AvailableRidesPage";
import ConfirmRidePage from "./ConfirmRidePage"; // Import the new page
import { allRides } from "../data/allRides"; // Import allRides data
import { rideHistory } from "../data/rideHistory"; // Import rideHistory data
import { useUser } from "../context/UserContext"; // Import your UserContext
import axios from "axios"; // Import axios for making API calls

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("book-ride");
  const [filteredRides, setFilteredRides] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Get user details from context
  const { user, setUser } = useUser();
  const userEmail = user?.email; // Access the user's email

  const handleLogout = async () => {
    if(user) {
    try {
      // Send a POST request to the backend logout route
      await axios.get('https://deployed-backend-62rm.onrender.com/logout');

      // Clear user data from context
      setUser(null);

      // Optionally, clear user data from local storage or cookies
      localStorage.removeItem('user');
      // Redirect user to login page after logout
      navigate('/');
    } catch (error) {
      navigate('/');
      console.error("Logout failed:", error);
    }}
    else {
      navigate('/');
    }
  };

  const handleFilterRides = (filters) => {
    const filtered = allRides.filter(
      (ride) =>
        ride.isAvailable === true &&
        ride.availableSeats >= filters.numberOfPeople
    );
    setFilteredRides(filtered);
    navigate("/dashboard/filtered-rides", {
      state: {
        filteredRides: filtered,
        userEmail: userEmail, // Pass user's email here
      },
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <span className="material-icons">
          {sidebarOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Sidebar - Fixed on desktop, slide-in on mobile */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 fixed md:static top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col justify-between z-40`}
      >
        <div>
          {/* Logo/Header */}
          <div className="flex items-center mb-6">
            <span className="material-icons mr-3">dashboard</span>
            <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>
          </div>
          <ul>
            <li className="mb-4">
              <Link
                to="book-ride"
                onClick={() => {
                  setActiveTab("book-ride");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "book-ride"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">directions_car</span>
                Book a Ride
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="ride-history"
                onClick={() => {
                  setActiveTab("ride-history");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "ride-history"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">history</span>
                Ride History
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="available-rides"
                onClick={() => {
                  setActiveTab("available-rides");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "available-rides"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">directions_car</span>
                All Rides
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="profile"
                onClick={() => {
                  setActiveTab("profile");
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "profile"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">person</span>
                User Profile
              </Link>
            </li>
          </ul>
        </div>
        {/* Footer */}
        <div className="mt-6">
          <ul>
            <li className="mb-4">
              <div
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center text-left p-2 rounded-lg ${
                  activeTab === "settings"
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-700"
                } hover:bg-blue-50 hover:text-blue-500`}
              >
                <span className="material-icons mr-3">settings</span>
                Settings
              </div>
            </li>
            {/* Logout Button */}
            <div className="mt-6 flex justify-start">
              <button
                onClick={handleLogout}
                className="flex items-center text-left bg-red-500 text-white hover:bg-red-700 duration-150 w-fit py-2 px-3 rounded-lg"
              >
                <span className="material-icons mr-3">logout</span>
                Logout
              </button>
            </div>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 overflow-y-auto pt-16 md:pt-6">
        {/* Tab Content */}
        <Routes>
          <Route
            path="book-ride"
            element={
              <BookRidePage
                onFilterRides={handleFilterRides}
                userEmail={userEmail}
              />
            }
          />
          <Route
            path="ride-history"
            element={
              <RideHistoryPage
                email={userEmail}
                rideHistory={user?.rideHistory}
              />
            }
          />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="available-rides"
            element={<AvailableRidesPage allRides={allRides} />}
          />
          <Route
            path="filtered-rides"
            element={
              <AvailableRidesPage
                allRides={allRides}
                filteredRides={filteredRides}
              />
            }
          />
          <Route
            path="confirm-ride"
            element={<ConfirmRidePage userEmail={userEmail} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;
