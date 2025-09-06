// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./Sections/Home";
import WhatWeProvide from "./Sections/WhatWeProvide";
import Schedule from "./Sections/Schedule";
import Prizes from "./Sections/Prizes";
import Team from "./Sections/Team";
import Sponsors from "./Sections/Sponsors";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Admin from "./components/Admin";

// Separate AppRoutes so we can use useLocation correctly
function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/admin";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <WhatWeProvide />
              <Schedule />
              <Prizes />
              <Team />
              <Sponsors />
              <Footer />
            </>
          }
        />
        {/* Register Page */}
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
