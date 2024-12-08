import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminModule = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Special check for master admin login
    if (email === "master@gmail.com" && password === "master#123") {
      navigate("/masterdashboard"); // Redirect to master dashboard
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/admin/check-admin", {
        email,
        password,
      });

      if (response.data === 1) {
        navigate("/admindashboard"); // Redirect to admin dashboard
      } else if (response.data === 0) {
        setError("You are not an admin. Request admin access in your student profile.");
      } else if (response.data === -1) {
        setError("Create a student account first!! ");
      }
    } catch (error) {
      setError("Error connecting to the server. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 min-h-screen flex flex-col text-white">
      {/* Top Right Logo */}
      <div className="absolute top-[-20px] left-2 w-40 h-18">
        <img src="/images/sa.png" alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-4 right-4">
        <Link to="/">
          <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Card: Admin Details */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-center shadow-lg w-80">
            <h2 className="text-2xl font-bold">Admin Details</h2>
            <p className="mt-4 text-white/80">
              Manage campus activities seamlessly:
            </p>
            <ul className="text-white/80 text-left mt-4 space-y-2">
              <li>✔ Approve student achievements.</li>
              <li>✔ Manage **Campus Kudos** points.</li>
              <li>✔ Add and track events.</li>
              <li>✔ Monitor attendance records.</li>
            </ul>
          </div>

          {/* Right Card: Admin Login */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-80">
            <h2 className="text-2xl font-bold text-center">Admin Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-4 w-full px-4 py-2 rounded-md bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4 w-full px-4 py-2 rounded-md bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleLogin}
              className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-800 transition w-full"
            >
              Login
            </button>
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModule;
