import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Donations from "./pages/Donations"
import NGOs from "./pages/NGOs"
import Restaurants from "./pages/Restaurants"
import EventManagers from "./pages/EventManagers"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import MakeDonation from "./pages/MakeDonation"
import DonorProfile from "./pages/DonorProfile"
import DonationHistory from "./pages/DonationHistory"
import "./App.css"

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/donation-history" element={<DonationHistory />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/ngos" element={<NGOs />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/event-managers" element={<EventManagers />} />
            <Route path="/pending-verifications" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/make-donation" element={
              <ProtectedRoute>
                <MakeDonation />
              </ProtectedRoute>
            } />
            <Route path="/users/:id" element={<DonorProfile />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App