import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import bgImg from "../assets/tukTuk1.jpg";
import FeaturesSection from "./FeaturesSection";

const HeroSection = () => {
  const featuresRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const scrollToFeatures = () => {
    window.scrollTo({
      top: featuresRef.current.offsetTop + 800,
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Navigation */}
      <div className="fixed top-0 z-50 w-full flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-gray-900 text-white text-base sm:text-lg md:text-xl shadow-md">
        {/* Left side - Logo */}
        <div
          className="text-2xl sm:text-3xl md:text-4xl cursor-pointer font-semibold"
          onClick={scrollToTop}
        >
          Campus<span className="text-yellow-400">Cabs</span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-4 lg:space-x-8 items-center">
          <li>
            <button
              onClick={scrollToTop}
              className="hover:text-yellow-400 duration-200"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={scrollToFeatures}
              className="hover:text-yellow-400 duration-200"
            >
              About Us
            </button>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 duration-200">
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="border-[2px] border-yellow-500 text-yellow-500 px-3 py-1 sm:px-5 sm:py-2 rounded-full hover:bg-black duration-150"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="border-[2px] border-blue-300 text-blue-300 px-3 py-1 sm:px-5 sm:py-2 rounded-full hover:bg-black hover:border-blue-400 hover:text-blue-400 duration-150"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/book-ride"
              className="border-[2px] border-green-500 text-green-500 px-3 py-1 sm:px-5 sm:py-2 rounded-full hover:bg-black hover:border-green-600 hover:text-green-600 duration-150"
            >
              View as Guest
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 z-40 w-full bg-gray-900 text-white md:hidden">
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <button
                onClick={scrollToTop}
                className="w-full text-left py-2 hover:text-yellow-400 duration-200"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={scrollToFeatures}
                className="w-full text-left py-2 hover:text-yellow-400 duration-200"
              >
                About Us
              </button>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="block py-2 hover:text-yellow-400 duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/login"
                className="border-[2px] border-yellow-500 text-yellow-500 px-4 py-2 rounded-full hover:bg-black duration-150 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border-[2px] border-blue-300 text-blue-300 px-4 py-2 rounded-full hover:bg-black hover:border-blue-400 hover:text-blue-400 duration-150 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/dashboard/book-ride"
                className="border-[2px] border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-black hover:border-green-600 hover:text-green-600 duration-150 text-center"
                onClick={() => setMenuOpen(false)}
              >
                View as Guest
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Background Image */}
      <div className="bg-black">
        <div className="pt-1 flex overflow-hidden opacity-25">
          <img src={bgImg || "/placeholder.svg"} alt="" className="h-screen w-full" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <motion.div
          className="z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-4xl sm:text-6xl md:text-8xl font-bold text-white">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            >
              Campus
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
              className="text-yellow-400"
            >
              Cabs
            </motion.span>
          </div>
          <div className="mt-6 text-xl sm:text-2xl md:text-3xl text-white">
            <Typewriter
              options={{
                strings: [
                  "Your Trusted Campus Ride Awaits",
                  "Enjoy student-friendly fares",
                  "Seamlessly Connect with Fellow Students",
                  "Prioritizing Safety in Every Ride",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef}>
        <FeaturesSection />
      </div>
    </>
  );
};

export default HeroSection;
