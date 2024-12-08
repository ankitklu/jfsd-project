import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; // Import the UserContext
import { FaTasks,FaQuestionCircle, FaCalendarAlt, FaEdit, FaTrophy, FaBars, FaHome, FaCog, FaEye, FaEyeSlash } from 'react-icons/fa';

const Dashboard = () => {
  const { user, setUser } = useUserContext(); // Access user data from UserContext
  const navigate = useNavigate();

  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    fullName: '',
    password: '',
  });

  // Check if the user is loaded from context or localStorage
  useEffect(() => {
    if (user) {
      setUpdatedUser({
        fullName: user.fullName || '',
        password: user.password || '',
      });
    } else {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser); // Update context with the saved user data
        setUpdatedUser({
          fullName: parsedUser.fullName || '',
          password: parsedUser.password || '',
        });
      }
    }
  }, [user, setUser]);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  const toggleEditCard = () => {
    setShowEditCard(!showEditCard);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChanges = () => {
    if (updatedUser.password === '') {
      console.error('Password field is empty. Please enter a password.');
      return;
    }
  
    setUser({ ...user, fullName: updatedUser.fullName, password: updatedUser.password });
  
    console.log('Updated user:', {
      fullName: updatedUser.fullName,
      password: updatedUser.password,
    });
  
    localStorage.setItem('user', JSON.stringify({ fullName: updatedUser.fullName, password: updatedUser.password }));
  
    setShowEditCard(false);
  };
  

  const handleEditOutsideClick = (e) => {
    if (e.target.id === 'edit-overlay' || e.target.id === 'profile-overlay') {
      setShowEditCard(false);
    }
  };

  // Show loading if user data is still not available
  if (!user) {
    return <div className="text-center mt-10">Loading user information...</div>;
  }

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage if necessary
    navigate('/'); // Redirect to login
  };

  const handleAddAchievements = () => {
    navigate('/addAch', {
      state: {
        fullName: user.fullName,
        email: user.email,
        studentId: user.studentId,
      },
    });
  };

  const handleSaveAndUpdate = async () => {
    await handleSaveChanges(); // Call handleSaveChanges first
    await handleUpdateProfile(); // Then call handleUpdateProfile
  };
  
  const handleUpdateProfile = async () => {
    const updatedDetails = {
      fullName: updatedUser.fullName,
      password: updatedUser.password,
      studentId: user.studentId,
      email: user.email,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Profile updated successfully:', data);
  
        // Update user context and localStorage
        setUser({ ...user, fullName: updatedDetails.fullName, password: updatedDetails.password });
        localStorage.setItem('user', JSON.stringify(updatedDetails));
  
        setShowProfileCard(false);
      } else {
        console.error('Failed to update profile:', await response.text());
      }
    } catch (error) {
      console.error('Error while updating profile:', error);
    }
  };
  return (
    <div className="bg-gradient-to-br from-green-400 via-white-500 to-purple-600 min-h-screen flex flex-col">
      
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-transform transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="w-64 bg-blue-900 p-4 h-full flex flex-col text-black">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <button onClick={toggleSidebar} className="text-black">
              <FaBars size={24} />
            </button>
          </div>
          <nav className="space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaHome size={20} />
              <span>Home</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaCog size={20} />
              <span>Settings</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center py-8 px-6">
      <div
  className="absolute top-5 right-8 w-12 h-12 rounded-full overflow-hidden cursor-pointer shadow-lg transition-opacity duration-300 ease-in-out"
  onClick={toggleProfileCard}
  title="Profile"
>
  <img
    src="/images/profile.png"
    alt="Profile"
    className="w-full h-full object-cover transition-opacity duration-300 ease-in-out hover:opacity-40"
  />
</div>


        <div className="absolute top-[-20px] left-2 w-40 h-18">
  <img src="./images/logo.png" alt="Logo" className="w-full h-full object-contain" />
</div>

        <div className="text-center mb-8">
  <h1 className="text-4xl flex items-center font-semibold text-gray-100">Welcome, {user.fullName}!</h1>
  

          <p className="text-xl text-gray-200 mt-2">current credits🪙 : {user.credits}</p>
      </div>
      <p className="text-xl text-gray-300 mt-2">Here's your personalized dashboard</p>

      </div>


      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
  {/* Add Achievements Card */}
  <div
    onClick={handleAddAchievements}
    className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
  >
    <div className="flex items-center gap-x-4">
      <FaTrophy className="text-6xl animate-bulge" />
      <div>
        <h3 className="text-xl font-bold">Add Courses</h3>
        <p>Record and showcase your Courses here.</p>
      </div>
    </div>
  </div>

  {/* View Achievements Card */}
  <Link to="/viewAch" className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
    <div className="flex items-center gap-x-4">
      <FaEye className="text-6xl animate-bulge" />
      <div>
        <h3 className="text-xl font-bold">View Courses</h3>
        <p>Check and track all your recorded COurses.</p>
      </div>
    </div>
  </Link>

  {/* Edit Achievements Card */}
  <Link to="/editAch" className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
    <div className="flex items-center gap-x-4">
      <FaEdit className="text-6xl animate-bulge" />
      <div>
        <h3 className="text-xl font-bold">Edit Courses</h3>
        <p>Edit or update your previously recorded Courses.</p>
      </div>
    </div>
  </Link>

  <Link to="/participateInEvents" className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
  <div className="flex items-center gap-x-4">
    <FaCalendarAlt className="text-6xl animate-bulge" />
    <div>
      <h3 className="text-xl font-bold">Participate in Hackathons/Contests</h3>
      <p>Join and participate in upcoming events to earn free enrollment.</p>
    </div>
  </div>
</Link>




  {/* Dummy Card 2 */}
  <Link to="/viewevents" className="bg-orange-500 text-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
    <div className="flex items-center gap-x-4">
      <FaTasks className="text-6xl animate-bulge" />
      <div>
        <h3 className="text-xl font-bold">View and Manage Registered Events</h3>
        <p>See the events you've registered for, and track your participation status.</p>
      </div>
    </div>
  </Link>

  {/* Dummy Card 3 */}
  <div className="bg-gray-500 text-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
    <div className="flex items-center gap-x-4">
      <FaQuestionCircle className="text-6xl animate-bulge" />
      <div>
        <h3 className="text-xl font-bold">Dummy Card 3</h3>
        <p>This is a final placeholder card for demonstration purposes.</p>
      </div>
    </div>
  </div>
</div>


     {/* Profile Card */}
{showProfileCard && (
  <div
    id="profile-overlay"
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
      <button
        onClick={toggleProfileCard}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        Close
      </button>
      <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>
      <div className="mt-6 space-y-4">
        <div className="text-lg text-gray-700">
          <strong>Full Name:</strong> {user.fullName}
        </div>
        <div className="text-lg text-gray-700">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="text-lg text-gray-700">
          <strong>Student ID:</strong> {user.studentId}
        </div>
        <div className="text-lg text-gray-700">
          <strong>Password:</strong> {showPassword ? user.password : '******'}
          <button
            onClick={togglePasswordVisibility}
            className="ml-2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button onClick={toggleEditCard} className="text-blue-500">
          Edit Profile
        </button>
        <button onClick={handleSaveAndUpdate} className="text-blue-500">
          Update Profile
        </button>
        <button 
          onClick={handleLogout} 
          className="text-blue-500"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}


     {/* Edit Profile Pop-up Card */}
{showEditCard && (
  <div
    id="edit-overlay"
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={handleEditOutsideClick} // Handle clicks outside the modal
  >
    <div
      className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full"
      onClick={(e) => e.stopPropagation()} // Prevent click propagation inside the modal
    >
      <div className="flex justify-end">
        <button onClick={toggleEditCard} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
      <div className="space-y-4">
      <div>
  <label className="block text-gray-700">Full Name:</label>
  <input
    type="text"
    value={updatedUser.fullName}
    onChange={(e) => setUpdatedUser({ ...updatedUser, fullName: e.target.value })}
    className="w-full p-3 border rounded-lg"
  />
</div>

        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-gray-700">Student ID:</label>
          <input
            type="text"
            value={user.studentId}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-200"
          />
        </div>
        <div>
  <label className="block text-gray-700">Password:</label>
  <input
    type={showPassword ? 'text' : 'password'}
    value={updatedUser.password}
    onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
    className="w-full p-3 border rounded-lg"
  />


          <button
            onClick={togglePasswordVisibility}
            className="ml-2 text-gray-600"
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={toggleEditCard}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
