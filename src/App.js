import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // Import the UserProvider
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddAch from "./pages/AddAch";
import ViewAch from "./pages/ViewAch";
import EditAch from "./pages/EditAch";
import AdminModule from "./pages/AdminModule";
import AdminDashboard from "./pages/AdminDashboard";
import MasterDashboard from "./pages/MasterDashboard";
import HandleAdmin from "./pages/HandleAdmin";
import GradeAchievements from "./pages/GradeAchievements";
import AddEvents from "./pages/AddEvents";
import ParticipateInEvents from "./pages/ParticipateInEvents";
import EventManagement from "./pages/EventManagement";
import ViewEvents from "./pages/ViewEvents";
import AdminEvent from "./pages/AdminEvent";
import PostAttendance from "./pages/PostAttendance";
import Student from "./pages/Student";
import EventInsights from "./pages/EventInsights";
import Visualize from "./pages/Visualize";
import EventUser from "./pages/EventUser";
import AchUser from "./pages/AchUser";
import AchInsights from "./pages/AchInsights";

function App() {
  return (
    <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addach" element={<AddAch />} />
            <Route path="/viewach" element={<ViewAch />} />
            <Route path="/editach" element={<EditAch />} />
            <Route path="/adminmodule" element={<AdminModule />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/masterdashboard" element={<MasterDashboard />} />
            <Route path="/handleadmin" element={<HandleAdmin />} />
            <Route path="/gradeachievements" element={<GradeAchievements />} />
            <Route path="/addevents" element={<AddEvents />} />
            <Route path="/participateinevents" element={<ParticipateInEvents />} />
            <Route path="/eventmanagement" element={<EventManagement />} />
            <Route path="/viewevents" element={<ViewEvents />} />
            <Route path="/adminevent" element={<AdminEvent />} />
            <Route path="/postattendance" element={<PostAttendance />} />
            <Route path="/student" element={<Student />} />
            <Route path="/eventinsights" element={<EventInsights />} />
            <Route path="/visualize" element={<Visualize />} />
            <Route path="/eventuser" element={<EventUser />} />
            <Route path="/achuser" element={<AchUser />} />
            <Route path="/achinsights" element={<AchInsights />} />
            </Routes>
        </Router>
    </UserProvider>
  );
}

export default App;
