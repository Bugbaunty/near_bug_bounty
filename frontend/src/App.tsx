import React from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CreateBounty from "./pages/CreateBounty";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create_bounty" element={<CreateBounty />} />
    </Routes>
  );
}

export default App;
