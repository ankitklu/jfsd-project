import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { FaRegClock, FaMapMarkerAlt, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const ViewEvents = () => {
  const { user } = useUserContext();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [conductedEvents, setConductedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.studentId) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = () => {
    axios
      .get(`http://localhost:8080/api/participate/events?studentId=${user.studentId}`)
      .then((response) => {
        const data = response.data;
        const upcoming = data.filter((event) => event.flag === 0);
        const conducted = data.filter((event) => event.flag !== 0);

        setUpcomingEvents(upcoming);
        setConductedEvents(conducted);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUnregister = (eventId) => {
    axios
      .delete(`http://localhost:8080/api/participate/delete?studentId=${user.studentId}&eventId=${eventId}`)
      .then(() => {
        setUpcomingEvents((prev) => prev.filter((event) => event.eventId !== eventId));
      })
      .catch((error) => {
        console.error("Error unregistering event:", error);
        alert("Failed to unregister from the event. Please try again.");
      });
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-8 bg-gradient-to-br from-blue-400 to-blue-600 min-h-screen text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center">🎉 Events Dashboard</h1>

      {/* Upcoming Events Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          📅 Upcoming Events
        </h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-center text-lg">No upcoming events found.</p>
        ) : (
          <table className="table-auto w-full bg-white text-black rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Event Title</th>
                <th className="px-4 py-3 text-left">Event Date</th>
                <th className="px-4 py-3 text-left">Event Time</th>
                <th className="px-4 py-3 text-left">Venue</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{event.title}</td>
                  <td className="px-4 py-3">
                  📅 {new Date(event.eventDateTime).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FaRegClock className="text-blue-500" />
                      {new Date(event.eventDateTime).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      {event.venue}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleUnregister(event.eventId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                    >
                      <FaTimesCircle />
                      Unregister
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Conducted Events Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          ✅ Conducted Events
        </h2>
        {conductedEvents.length === 0 ? (
          <p className="text-center text-lg">No conducted events found.</p>
        ) : (
          <table className="table-auto w-full bg-white text-black rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Event Title</th>
                <th className="px-4 py-3 text-left">Event Date</th>
                <th className="px-4 py-3 text-left">Event Time</th>
                <th className="px-4 py-3 text-left">Venue</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {conductedEvents.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{event.title}</td>
                  <td className="px-4 py-3">
                  📅{new Date(event.eventDateTime).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FaRegClock className="text-blue-500" />
                      {new Date(event.eventDateTime).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      {event.venue}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-left">
                    {event.flag === 1 ? (
                      <span className="text-green-600 flex items-center gap-2">
                        <FaCheckCircle />
                        Attended
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-2">
                        <FaTimesCircle />
                        Not Attended
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ViewEvents;
