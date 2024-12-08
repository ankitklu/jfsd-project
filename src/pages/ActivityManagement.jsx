import React, { useState } from "react";
import ActivityCard from "../components/ActivityCard";

const ActivityManagement = () => {
  const [activities, setActivities] = useState([
    { name: "Debate Competition", description: "Annual debate event.", date: "2024-12-05" },
    { name: "Art Workshop", description: "Learn painting techniques.", date: "2024-12-10" },
  ]);

  const [newActivity, setNewActivity] = useState({
    name: "",
    description: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.description && newActivity.date) {
      setActivities([...activities, newActivity]);
      setNewActivity({ name: "", description: "", date: "" });
    } else {
      alert("Please fill all fields before adding.");
    }
  };

  const handleDeleteActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  return (
    <div>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Activities</h2>

        {/* Form to Add New Activity */}
        <div className="mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Add New Activity</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Activity Name</label>
              <input
                type="text"
                name="name"
                value={newActivity.name}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter activity name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={newActivity.description}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter activity description"
              />
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={newActivity.date}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <button
              type="button"
              onClick={handleAddActivity}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Activity
            </button>
          </form>
        </div>

        {/* List of Activities */}
        <h3 className="text-lg font-bold mb-4">Existing Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="relative">
              <ActivityCard activity={activity} />
              <button
                onClick={() => handleDeleteActivity(index)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityManagement;
