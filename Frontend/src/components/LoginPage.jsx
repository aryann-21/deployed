"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios" // Axios for making HTTP requests
import bgImg from "../assets/login.png" // Use the same background image
import { useUser } from "../context/UserContext.jsx" // Import the UserContext

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("") // For error handling
  const navigate = useNavigate()

  // Access the setUser function from the context
  const { setUser } = useUser()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Send a POST request to the backend login route
      const response = await axios.post(
        "https://deployed-backend-62rm.onrender.com/login",
        { email, password },
        { withCredentials: false }, // hamesha false rakho because of CORS policy error
      )

      // On successful login, navigate to dashboard or handle the response
      if (response.status === 200) {
        console.log("Login successful:", response.data)
        const userName = response.data.name // Assuming the backend returns the user's name in the response

        // Set the user name and email in context
        setUser({ name: userName, email: response.data.email, phone: response.data.phone }) // Store user name and email in context

        // Navigate to the book ride page
        navigate("/dashboard/book-ride", { state: { name: userName, email: response.data.email } })
      }
    } catch (error) {
      console.error("Login error:", error)
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage("An error occurred during login")
      }
    }
  }

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-repeat-x bg-center"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Navigation Arrow */}
      <span className="z-10 absolute left-4 sm:left-10 top-6 sm:top-10 text-gray-100">
        <Link to="/" className="material-icons text-2xl sm:text-3xl">
          arrow_back
        </Link>
      </span>

      <div className="absolute inset-0 flex items-center justify-center px-4 py-6 bg-black bg-opacity-50">
        <div className="bg-gray-300 rounded-xl shadow-lg w-full max-w-md bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-800 text-yellow-300 py-4 sm:py-6 px-4 sm:px-8 rounded-t-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Login to CampusCabs</h2>
          </div>
          <form onSubmit={handleLogin} className="p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="mb-3 sm:mb-4">
              <label htmlFor="email" className="block text-gray-900 text-sm font-medium mb-1 sm:mb-2">
                Student Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Student Email"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorMessage && <p className="text-rose-600 font-semibold text-sm mt-1 ml-1">{errorMessage}</p>}
            </div>

            <div className="mb-3 sm:mb-4">
              <label htmlFor="password" className="block text-gray-900 text-sm font-medium mb-1 sm:mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-lg sm:text-xl bg-gray-800 text-yellow-300 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
          <div className="px-4 sm:px-8 pb-4 sm:pb-6 text-center">
            <p className="text-sm text-gray-950">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

