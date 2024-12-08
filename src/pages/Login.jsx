import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/UserContext'; 
import { FaEnvelope, FaLock, FaSignInAlt, FaSmile } from 'react-icons/fa'; // Added FaSmile icon

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { setUser } = useUserContext(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { email, password });
      if (response.data.success) {
        const { fullName, studentId, email, password ,credits} = response.data;
        setUser(null); 
        setUser({ fullName, email, studentId, password , credits}); 
        navigate('/dashboard');
        localStorage.setItem('redirectToAddAch', true); 
      } else {
        setMessage(response.data.message || 'Invalid email or password');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Welcome Back Message */}
      <div className="flex items-center mb-6 text-indigo-600 text-2xl font-bold gap-3">
  <FaSmile className="text-xl animate-up text-indigo-900" />
  Welcome Back Student!
  <FaSmile className="text-xl animate-down text-indigo-900" />

</div>


      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg shadow-xl max-w-sm w-full bg-opacity-50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 text-xl" />
            <input
              type="email"
              className="w-full pl-10 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 text-xl" />
            <input
              type="password"
              className="w-full pl-10 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition flex justify-center items-center gap-3"
          >
            <FaSignInAlt className="text-2xl animate-bulge" />
          </button>
        </form>

        {message && <div className="text-center text-white mt-4">{message}</div>}

        <div className="text-center mt-4 text-white">Forgot your password?</div>
        <div className="text-center mt-6">
          <span className="text-white text-sm">
            New user?{' '}
            <Link to="/signup" className="text-indigo-200 hover:text-indigo-300 underline">
              Click here to Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
