import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditAch = () => {
  const { user } = useUserContext();
  const [achievements, setAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    company: '',
    priceMoney: '',
    flag: 0, // Default value or retrieved value for 'flag'
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // New state to handle delete confirmation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/achievements/${user.studentId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user && user.studentId) {
      fetchAchievements();
    }
  }, [user]);

  const handleSelectAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      year: achievement.year,
      company: achievement.company || '',
      priceMoney: achievement.priceMoney || '',
    });
  };

  const handleDelete = async () => {
    if (!selectedAchievement) {
      console.error("No achievement selected.");
      return;
    }
  
    const { id, studentId, credits } = selectedAchievement;
  
    try {
      // Step 1: Subtract credits from the user
      const subtractResponse = await fetch("http://localhost:8080/api/subtractCredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, credits }),
      });
  
      if (!subtractResponse.ok) {
        const errorMessage = await subtractResponse.text();
        alert(`Error updating user credits: ${errorMessage}`);
        return;
      }
  
      console.log("User credits updated successfully.");
  
      // Step 2: Delete the achievement
      const deleteResponse = await fetch(`http://localhost:8080/api/achievements/${id}`, {
        method: "DELETE",
      });
  
      if (!deleteResponse.ok) {
        const errorMessage = await deleteResponse.text();
        alert(`Error deleting achievement: ${errorMessage}`);
        return;
      }
  
      console.log("Achievement deleted successfully.");
  
      // Step 3: Update frontend state
      setAchievements((prev) => prev.filter((ach) => ach.id !== id));
      setSelectedAchievement(null);
    } catch (err) {
      console.error("Error during delete process:", err);
      alert("Failed to delete achievement.");
    }
  
    // Close the confirmation popup after deletion
    setShowConfirmDelete(false);
  };
  

  const handleCancelDelete = () => {
    setShowConfirmDelete(false); // Close the confirmation popup without deletion
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/achievements/${user.studentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Achievement updated successfully!');
        setSelectedAchievement(null); // Close the popup by resetting the state
        navigate('/viewAch'); // Redirect to the main page or refresh the list
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatus = (flag) => {
    switch (flag) {
      case 0:
        return 'Pending';
      case 1:
        return 'Accepted';
      case -1:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 text-white relative">
<div className="absolute top-[-20px] left-2 w-40 h-18">
  <img src="/images/a.png" alt="Logo" className="w-full h-full object-contain" />
</div>

<h1 className="text-3xl font-bold mb-6 flex items-center space-x-4 text-gray-800">
  <i className="fas fa-edit text-yellow-500 text-2xl animate-up"></i> {/* Edit Icon */}
  <span>Edit or Delete your Achievement</span>
  <i className="fas fa-trash-alt text-red-500 text-2xl animate-down"></i> {/* Delete Icon */}
</h1>

      
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-4 right-4 flex items-center px-6 py-3 font-bold bg-gray-200 text-gray-800 rounded-lg shadow-lg hover:bg-transparent transition"
        >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Dashboard
      </button>

      {selectedAchievement ? (
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Prize Money</label>
            <input
              type="number"
              name="priceMoney"
              value={formData.priceMoney}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setSelectedAchievement(null)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-4"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowConfirmDelete(true)} // Show the confirmation modal
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Achievement
            </button>
          </div>
        </form>
      ) : (
        <table className="bg-white text-gray-800 w-full max-w-4xl rounded-lg shadow-lg">
  <thead>
    <tr>
      <th className="px-6 py-4 text-left font-medium text-gray-700 border-b">Title</th>
      <th className="px-6 py-4 text-left font-medium text-gray-700 border-b">Description</th>
      <th className="px-6 py-4 text-left font-medium text-gray-700 border-b">Company</th>
      <th className="px-6 py-4 text-center font-medium text-gray-700 border-b">Status</th>
    </tr>
  </thead>
  <tbody>
    {achievements
      .sort((a, b) => a.flag - b.flag) // Sort by status (Pending=0, Accepted=1, Rejected=-1)
      .map((achievement) => (
        <tr
          key={achievement.id}
          className="relative group cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out"
          onClick={() => handleSelectAchievement(achievement)}
        >
          <td className="px-6 py-4 border-b text-gray-700">{achievement.title}</td>
          <td className="px-6 py-4 border-b text-gray-700">{achievement.description}</td>
          <td className="px-6 py-4 border-b text-gray-700">{achievement.company || 'N/A'}</td>
          <td
            className={`px-6 py-4 border-b text-center font-semibold rounded ${
              achievement.flag === 0
                ? 'bg-blue-200 text-blue-800'
                : achievement.flag === 1
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}
          >
            {getStatus(achievement.flag)}
          </td>

          {/* Blur effect and Edit text */}
          <div className="absolute inset-0 bg-gray-100/70 backdrop-blur-md hidden group-hover:flex items-center justify-center">
            <span className="text-lg font-medium text-gray-800">
              <i className="fas fa-edit mr-2 text-blue-500"></i>
              Edit <span className="font-semibold italic">{achievement.title}</span> Achievement
            </span>
          </div>
        </tr>
      ))}
  </tbody>
</table>

      )}

      {/* Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Are you sure you want to delete the achievement: "{selectedAchievement.title}"?
            </h2>
            <p className="mb-4 text-gray-700">Once deleted, this cannot be retrieved.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAch;
