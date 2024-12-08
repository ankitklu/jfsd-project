import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const EventInsights = () => {
  const { state } = useLocation();
  const { studentId, fullName } = state || {}; // Extract both studentId and fullName
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoster, setSelectedPoster] = useState(null);

  useEffect(() => {
    if (studentId) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/participate/events?studentId=${studentId}`
          );
          if (response.ok) {
            const data = await response.json();
            setEvents(data);
          } else {
            console.error("Failed to fetch events:", await response.text());
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, [studentId]);

  const getAttendance = (flag) => {
    switch (flag) {
      case 1:
        return "Present";
      case -1:
        return "Absent";
      case 0:
        return "Not Conducted";
      default:
        return "Unknown";
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #1e3c72, #2a5298)",
        }}
      >
        <FaSpinner className="animate-spin text-4xl text-white" />
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #1e3c72, #2a5298)",
        padding: "20px",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5em", margin: "10px 0", letterSpacing: "1px" }}>
          Events Registered by  {fullName || "Guest"} 
        </h1>
      </div>
      {/* Table Section */}
      <div
        style={{
          margin: "0 auto",
          width: "90%",
          maxWidth: "1200px",
          background: "#ffffffaa",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            textAlign: "left",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#1e3c72", color: "#fff" }}>
            <tr>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Title</th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Description</th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Date & Time</th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Venue</th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Poster</th>
              <th style={{ padding: "12px 20px", textAlign: "center", width: "200px" }}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#e8f5ff" : "#d1eaff",
                  color: "#000",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#bcd7ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#e8f5ff" : "#d1eaff";
                }}
              >
                <td style={{ padding: "12px 16px", textAlign: "center" }}>{event.title}</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>{event.description}</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  {new Date(event.eventDateTime).toLocaleString()}
                </td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>{event.venue}</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  {event.poster && (
                    <img
                      src={event.poster}
                      alt="Event Poster"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => handlePosterClick(event.poster)}
                    />
                  )}
                </td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span
                    style={{
                      width: "50px",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color:
                        getAttendance(event.flag) === "Present"
                          ? "#28a745"
                          : getAttendance(event.flag) === "Absent"
                          ? "#dc3545"
                          : "#ffc107",
                      backgroundColor:
                        getAttendance(event.flag) === "Present"
                          ? "#e6f8eb"
                          : getAttendance(event.flag) === "Absent"
                          ? "#f8d7da"
                          : "#fff3cd",
                    }}
                  >
                    {getAttendance(event.flag)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Poster Popup Modal */}
      {selectedPoster && (
        <div
          style={{
            position: "fixed",
            inset: "0",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "50",
          }}
          onClick={handleClosePopup}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "transparent",
              padding: "0",
              borderRadius: "8px",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPoster}
              alt="Selected Poster"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInsights;
