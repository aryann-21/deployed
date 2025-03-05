"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import bgImg from "../assets/contactus.png" // Use the same background image
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ContactPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://deployed-backend-62rm.onrender.com/send-whatsapp", {
        name,
        email,
        message,
      })
      toast.success("Sent message via WhatsApp!")

      // Redirect to home page after 1 second
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } catch (error) {
      alert("Error sending message.")
      console.error("Error:", error)
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
      <ToastContainer />
      <div className="absolute inset-0 flex items-center justify-center px-4 py-6 bg-black bg-opacity-50">
        <div className="bg-gray-300 rounded-xl shadow-lg w-full max-w-md bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-800 text-yellow-300 py-4 sm:py-6 px-4 sm:px-8 rounded-t-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Contact Us</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="mb-3 sm:mb-4">
              <label htmlFor="name" className="block text-gray-900 text-sm font-medium mb-1 sm:mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150 ease-in-out"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label htmlFor="email" className="block text-gray-900 text-sm font-medium mb-1 sm:mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 sm:mb-4">
              <label htmlFor="message" className="block text-gray-900 text-sm font-medium mb-1 sm:mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Enter your message"
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-150 ease-in-out"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full text-lg sm:text-xl bg-gray-800 text-yellow-300 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-300 ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

