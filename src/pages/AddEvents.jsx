import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddEventForm = () => {
  const [event, setEvent] = useState({
    title: "",
    venue: "",
    eventDate: "",
    eventTime: "",
    description: "",
    poster: "",
    credits: "0",
  });
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEvent({ ...event, poster: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event.title || !event.venue || !event.eventDate || !event.eventTime || !event.description || !event.credits) {
      setErrorMessage("All fields are required!");
      return;
    }
    setErrorMessage("");

    const eventDateTime = `${event.eventDate}T${event.eventTime}`;

    const eventData = { ...event, eventDateTime };

    axios
      .post("http://localhost:8080/api/events/create", eventData)
      .then(() => {
        setSuccessMessage("Event created successfully!");
        setTimeout(() => navigate("/adminDashboard"), 2000);
        setEvent({
          title: "",
          venue: "",
          eventDate: "",
          eventTime: "",
          description: "",
          poster: "",
          credits: "",
        });
      })
      .catch(() => setErrorMessage("Failed to create event."));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white">
      {/* Fixed Gradient Background */}
      <div className="absolute top-[-10px] left-8 w-32 h-18">
        <img
          src="/images/sa.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>
      

      {/* Header Section */}
      <div className="container mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
           
          </div>
          <button
            onClick={() => navigate("/adminDashboard")}
            className="flex items-center px-6 py-3 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Dashboard
          </button>
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center">
          <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-2xl max-w-3xl w-full backdrop-blur-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-indigo-700 animate-bounce">
                Upload a New Event
              </h2>
              <p className="text-lg text-gray-700">
                Fill in the event details below
              </p>
            </div>

            {successMessage && (
              <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Fields */}
            {/* Title */}
<div>
  <label className="block text-gray-800 font-semibold mb-1">
    Event Title
  </label>
  <input
    type="text"
    name="title"
    value={event.title}
    onChange={handleInputChange}
    className="w-full border-2 border-indigo-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
    placeholder="Enter event title"
    required
  />
</div>

{/* Venue */}
<div>
  <label className="block text-gray-800 font-semibold mb-1">
    Venue
  </label>
  <input
    type="text"
    name="venue"
    value={event.venue}
    onChange={handleInputChange}
    className="w-full border-2 border-indigo-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
    placeholder="Enter event venue"
    required
  />
</div>

{/* Date and Time */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-800 font-semibold mb-1">
      Event Date
    </label>
    <input
      type="date"
      name="eventDate"
      value={event.eventDate}
      onChange={handleInputChange}
      className="w-full border-2 border-indigo-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
      required
    />
  </div>
  <div>
    <label className="block text-gray-800 font-semibold mb-1">
      Event Time
    </label>
    <input
      type="time"
      name="eventTime"
      value={event.eventTime}
      onChange={handleInputChange}
      className="w-full border-2 border-indigo-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
      required
    />
  </div>
</div>

{/* Description */}
<div>
  <label className="block text-gray-800 font-semibold mb-1">
    Description
  </label>
  <textarea
    name="description"
    value={event.description}
    onChange={handleInputChange}
    className="w-full border-2 border-indigo-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
    placeholder="Enter event description"
    rows="4"
    required
  />
</div>

{/* Poster Upload */}
<div>
  <label className="block text-gray-800 font-semibold mb-1">
    Event Poster
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileUpload}
    className="w-full border-2 border-indigo-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow shadow-sm hover:shadow-md"
  />
</div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 text-white py-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
