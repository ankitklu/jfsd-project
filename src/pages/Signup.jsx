import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'; // Import icons

const Signup = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    password: '',
  });

  const [isLoginMode, setIsLoginMode] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Call the signup endpoint first
      const signupResponse = await axios.post('http://localhost:8080/api/signup', formData);
  
  
      // If signup is successful, proceed to call the add-admin endpoint
      if (signupResponse.status === 200) {
        const adminData = {
          studentId: formData.studentId, // Include student ID
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        };
  
        await axios.post('http://localhost:8080/api/admin/add-admin', adminData);
  
      }
  
      // Redirect to login page after successful signup and admin record creation
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      alert('An error occurred. Please try again.');
    }
  };
  
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg shadow-xl max-w-sm w-full bg-opacity-50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Student ID and Full Name Fields */}
          {!isLoginMode && (
            <>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 text-xl" />
                <input
                  type="text"
                  name="studentId"
                  className="w-full pl-10 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 text-xl" />
                <input
                  type="text"
                  name="fullName"
                  className="w-full pl-10 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 text-xl" />
            <input
              type="email"
              name="email"
              className="w-full pl-10 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 text-xl" />
            <input
              type="password"
              name="password"
              className="w-full pl-10 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition flex justify-center items-center gap-3"
          >
            <FaSignInAlt
              className="text-2xl animate-bulge"
              style={{ opacity: 0.8 }}
            />
            <span>{isLoginMode ? 'Login' : 'Sign Up'}</span>
          </button>
        </form>

        {/* Message */}
        <p className="text-white mt-4 text-center">
          {isLoginMode
            ? "Don't have an account? "
            : 'Already have an account? '}
          <span
            className="underline cursor-pointer text-indigo-300 hover:text-indigo-400"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              navigate(isLoginMode ? '/signup' : '/login'); // Navigate to the opposite page
            }}
          >
            {isLoginMode ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
