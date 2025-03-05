"use client"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useUser } from "../context/UserContext"
import axios from "axios" // Import axios for making API calls

const RideHistoryPage = () => {
  const location = useLocation()
  const [rideHistory, setRideHistory] = useState([])
  const { user } = useUser() // Access user from context

  useEffect(() => {
    // Fetch ride history from backend when the component loads and user is logged in
    if (user) {
      const fetchRideHistory = async () => {
        try {
          const response = await axios.get(
            `https://deployed-backend-62rm.onrender.com/ride-history/${user.email}`, // Adjust API endpoint as needed
          )
          const sortedHistory = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort the rides in descending order by date
          setRideHistory(sortedHistory) // Assuming the response returns an array of rides
        } catch (error) {
          console.error("Error fetching ride history:", error)
          toast.error("Ride history missing. Please book a ride to view history.")
        }
      }

      fetchRideHistory()
    }
  }, [user]) // Re-run when user changes

  useEffect(() => {
    // If there is a new ride passed from the ConfirmRidePage
    if (location.state && location.state.rideBooked) {
      toast.success("Your ride has been confirmed!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "#d4edda", color: "#155724" },
      })

      // Update the ride history with the new ride
      if (location.state.rideHistory) {
        const updatedHistory = location.state.rideHistory.sort((a, b) => new Date(b.date) - new Date(a.date))
        setRideHistory(updatedHistory)
      }
    }
  }, [location.state])

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Ride History</h2>

      {/* Display the ride history */}
      {rideHistory.length > 0 ? (
        <ul className="space-y-3 sm:space-y-4">
          {rideHistory.map((ride, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow hover:bg-gray-200 hover:-translate-y-1 duration-150"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-sm sm:text-base">
                  <p className="text-gray-600">Drop Location: {ride.dropLocation}</p>
                  <p className="text-gray-600">
                    Date:{" "}
                    {new Date(ride.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600">Time: {ride.time}</p>
                  <p className="text-gray-600">Payment: Rs {ride.payment}/-</p>
                </div>
                <span className="material-icons text-gray-500 hidden sm:block">directions_car</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm sm:text-base">No ride history available.</p>
      )}
    </div>
  )
}

export default RideHistoryPage

