import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPoster, setSelectedPoster] = useState(null); // State for selected poster

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/events/all");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle event approval
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/events/update/${id}`, {
        flag: 1,
      });
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, flag: 1 } : event
        )
      );
    } catch (err) {
      setError("Failed to approve the event. Please try again.");
    }
  };

  // Handle event rejection
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/events/update/${id}`, {
        flag: -1,
      });
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, flag: -1 } : event
        )
      );
    } catch (err) {
      setError("Failed to reject the event. Please try again.");
    }
  };

  const handlePosterClick = (posterUrl) => {
    setSelectedPoster(posterUrl); // Set the clicked poster as the selected one
  };

  const handleClosePopup = () => {
    setSelectedPoster(null); // Close the popup when clicked outside
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-3xl text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Event Management
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Venue</th>
                <th className="border border-gray-300 px-4 py-2">Date & Time</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Poster</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{event.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.venue}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(event.eventDateTime).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{event.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={event.poster}
                      alt="Poster"
                      className="w-12 h-12 rounded-md cursor-pointer"
                      onClick={() => handlePosterClick(event.poster)} // Trigger poster click
                    />
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      event.flag === 0
                        ? "text-yellow-500"
                        : event.flag === 1
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {event.flag === 0
                      ? "Pending"
                      : event.flag === 1
                      ? "Approved"
                      : "Rejected"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {event.flag === 0 && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(event.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 flex items-center gap-1"
                        >
                          <FaCheckCircle />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(event.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 flex items-center gap-1"
                        >
                          <FaTimesCircle />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Poster Popup Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={handleClosePopup}
        >
          <div
            className="relative bg-transparent p-0 rounded-lg max-w-full max-h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <img
              src={selectedPoster}
              alt="Selected Poster"
              className="w-full h-auto max-h-[80vh] object-contain" // Ensures the image is responsive and maintains its aspect ratio
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
