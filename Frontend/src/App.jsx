import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ContactPage from './components/ContactPage';
import DashboardPage from './components/DashboardPage';
import { UserProvider } from './context/UserContext.jsx'; // Import UserProvider

function App() {
  return (
    <UserProvider> {/* Wrap your app with UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} /> {/* Update the Dashboard route */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
