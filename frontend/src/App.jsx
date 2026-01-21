import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSetup from "./pages/ProfileSetup";
import MentorMatch from "./pages/AIMentorMatch";
import StudentProgress from "./pages/ProgressOutcomes";
import CareerResources from "./pages/student/CareerResources";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />

          {/* Student */}
          <Route path="/student/mentor-match" element={<MentorMatch />} />
          <Route path="/student/progress" element={<StudentProgress />} />
          <Route
            path="/student/career-resources"
            element={<CareerResources />}
          />

          {/* Alumni (SAME component) */}
          <Route
            path="/alumni/career-resources"
            element={<CareerResources />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
