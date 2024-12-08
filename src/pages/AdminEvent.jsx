import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminEvent = () => {
  const [notHappenedAccepted, setNotHappenedAccepted] = useState([]);
  const [happenedAccepted, setHappenedAccepted] = useState([]);
  const [notHappenedPending, setNotHappenedPending] = useState([]);
  const [notHappenedRejected, setNotHappenedRejected] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const [
        notHappenedAcceptedRes,
        happenedAcceptedRes,
        notHappenedPendingRes,
        notHappenedRejectedRes,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/events/not-happened-accepted"),
        axios.get("http://localhost:8080/api/events/happened-accepted"),
        axios.get("http://localhost:8080/api/events/not-happened-pending"),
        axios.get("http://localhost:8080/api/events/not-happened-rejected"),
      ]);

      console.log("notHappenedAcceptedRes.data:", notHappenedAcceptedRes.data);
      console.log("happenedAcceptedRes.data:", happenedAcceptedRes.data);
      console.log("notHappenedPendingRes.data:", notHappenedPendingRes.data);
      console.log("notHappenedRejectedRes.data:", notHappenedRejectedRes.data);

      setNotHappenedAccepted(notHappenedAcceptedRes.data);
      setHappenedAccepted(happenedAcceptedRes.data);
      setNotHappenedPending(notHappenedPendingRes.data);
      setNotHappenedRejected(notHappenedRejectedRes.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading events...</p>;

  const renderTable = (title, events, gradient, statusColumn, showButton) => {
    console.log(`Rendering table for: ${title}`);
    console.log("events:", events);

    return (
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          <span
            className={`mr-2 ${
              gradient === "from-green-500 to-green-700"
                ? "text-green-500"
                : gradient === "from-yellow-500 to-yellow-700"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          ></span>
          {title}
        </h2>
        <table className="table-auto w-full bg-white text-black rounded-lg shadow-lg overflow-hidden">
          <thead className={`bg-gradient-to-r ${gradient} text-white`}>
            <tr>
              <th className="px-6 py-4 text-left">Event Title</th>
              <th className="px-6 py-4 text-left">Event Date</th>
              <th className="px-6 py-4 text-left">Event Time</th>
              <th className="px-6 py-4 text-left">Venue</th>
              {statusColumn && <th className="px-6 py-4 text-left">Status</th>}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventId} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">
                  📅 {new Date(event.eventDateTime).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FaRegClock className="text-blue-500" />
                    {new Date(event.eventDateTime).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    {event.venue}
                  </div>
                </td>
                {statusColumn && (
                  <td className="px-6 py-4">
                    {showButton ? (
                      <button
                        onClick={() =>
                          navigate("/postattendance", {
                            state: { eventId: event.id, credits: event.credits , title: event.title},
                          })
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Post Attendance
                      </button>
                    ) : (
                      <span
                        className={
                          event.flag === 0
                            ? "text-yellow-500"
                            : event.flag === -1
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {event.flag === 0
                          ? "Pending"
                          : event.flag === -1
                          ? "Rejected"
                          : "Attendance Posted"}
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-200 to-gray-400 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        📝 Admin Event Dashboard
      </h1>

      {renderTable(
        "➤ Upcoming Events",
        notHappenedAccepted,
        "from-blue-500 to-blue-700",
        true, // Show status column with button
        true
      )}
      {renderTable(
        "➤ Completed Events",
        happenedAccepted,
        "from-green-500 to-green-700",
        true, // Show status column without button
        false
      )}
      {renderTable(
        "➤ Pending Requests",
        notHappenedPending,
        "from-yellow-500 to-yellow-700",
        false, // Don't show status column
        false
      )}
      {renderTable(
        "➤ Rejected Events",
        notHappenedRejected,
        "from-red-500 to-red-700",
        false, // Don't show status column
        false
      )}
    </div>
  );
};

export default AdminEvent;
