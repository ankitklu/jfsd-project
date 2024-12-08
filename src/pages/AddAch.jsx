import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddAch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { studentId } = location.state || {};

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    company: '',
    priceMoney: '',
    achievementProof: '',
    studentId: studentId || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = 'http://localhost:8080/api/achievements';
      await axios.post(endpoint, formData);
      setFormData({
        title: '',
        description: '',
        year: '',
        company: '',
        priceMoney: '',
        achievementProof: '',
        fullName: formData.fullName,
        email: formData.email,
        studentId: formData.studentId,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      alert('Failed to add achievement');
    }
  };

  useEffect(() => {
    if (location.state) {
      setFormData((prevState) => ({
        ...prevState,
        fullName: location.state.fullName,
        email: location.state.email,
        studentId: location.state.studentId,
      }));
    } else {
      setFormData({
        title: '',
        description: '',
        year: '',
        company: '',
        priceMoney: '',
        achievementProof: '',
        fullName: '',
        email: '',
        studentId: '',
      });
    }
  }, [location.state]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
      {/* Logo */}
      <div className="absolute top-[-20px] left-5 w-36 h-auto">
        <img src="/images/sa.png" alt="Logo" className="object-contain" />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 right-6 flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition-transform transform hover:scale-105"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Dashboard
      </button>

      {/* Form Card */}
      <div 
  className="bg-white bg-opacity-80 p-10 rounded-lg shadow-2xl max-w-3xl w-full backdrop-blur-md" 
  style={{ marginTop: '100px' }}
>        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-indigo-700 animate-bounce">
            Hello, <span className="text-indigo-900">{formData.fullName}</span>!
          </h2>
          <p className="text-lg text-gray-700">Add your Courses below</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-800 font-semibold mb-1">Course Title</label>
            <input
              type="text"
              name="title"
              className="w-full border-2 border-indigo-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
              placeholder="Enter Course title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              className="w-full border-2 border-indigo-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
              placeholder="Enter course description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-800 font-semibold mb-1">Duration</label>
    <select
      name="year"
      className=" border-2 border-indigo-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
      value={formData.year}
      onChange={handleChange}
      required
    >
      <option value="" disabled>
        Select your Duration months
      </option>
      {Array.from({ length: 12 }, (_, i) => (
  <option key={i} value={i + 1}>
    {i + 1}
  </option>
))}
    </select>
  </div>
</div>

            <div>
              <label className="block text-gray-800 font-semibold mb-1">Company</label>
              <input
                type="text"
                name="company"
                className="w-full border-2 border-indigo-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
                placeholder="Enter the company name"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-1">Course Fee</label>
            <input
              type="number"
              name="priceMoney"
              className="w-full border-2 border-indigo-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
              placeholder="Enter course price"
              value={formData.priceMoney}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-1">Additional Details</label>
            <input
              type="text"
              name="achievementProof"
              className="w-full border-2 border-indigo-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
              placeholder="Enter proof link or description"
              value={formData.achievementProof}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-600 mt-1">
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 text-white py-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAch;
