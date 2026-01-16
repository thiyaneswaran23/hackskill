import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSetup from "./pages/ProfileSetup";
import MentorMatch from "./pages/AIMentorMatch";                                      
import StudentProgress from "./pages/ProgressOutcomes";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/student/mentor-match" element={<MentorMatch />} />
          <Route path="/student/progress" element={<StudentProgress />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
