import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import Profile from "./pages/Profile";
import DonationHistory from "./pages/DonationHistory";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";
import DonorProfile from "./pages/DonorProfile";
import PendingVerifications from "./pages/PendingVerifications";
import PendingApproval from "./pages/PendingApproval";
import MakeDonation from "./pages/MakeDonation"; // Added missing route

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Verification Check Route */}
        <Route path="/pending-approval" element={<PendingApproval />} />

        {/* Private Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/make-donation" element={<MakeDonation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donation-history" element={<DonationHistory />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/user/:userId" element={<DonorProfile />} />

          {/* Admin Routes */}
          <Route path="/pending-verifications" element={<PendingVerifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;