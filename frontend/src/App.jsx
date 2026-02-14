import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Donations from "./pages/Donations"
import Profile from "./pages/Profile"
import DonationHistory from "./pages/DonationHistory"
import Messages from "./pages/Messages"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes wrapped in MainLayout */}
        {/* All Routes wrapped in Apple-Style MainLayout for consistency */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donation-history" element={<DonationHistory />} />
          <Route path="/messages" element={<Messages />} />
        </Route>

        {/* Auth Routes (Standalone) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App