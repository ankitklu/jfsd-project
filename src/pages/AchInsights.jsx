import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AchInsights = () => {
  const { state } = useLocation();
  const { studentId, fullName } = state || {}; // Access studentId and fullName from state
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:8080/api/achievements/${studentId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch achievements");
          }
        })
        .then((data) => setAchievements(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [studentId]);

  const getStatus = (flag) => {
    if (flag === 1) return "Accepted";
    if (flag === -1) return "Rejected";
    return "Pending";
  };

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
          Achievements of {fullName || "Guest"} 
        </h1>
        <p style={{ fontSize: "1.2em", fontStyle: "italic" }}>
          Review your hard-earned achievements below
        </p>
      </div>
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
              <th style={{ padding: "12px 16px", textAlign: "center" }}>
                Description
              </th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>
                Company
              </th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>
                Credits Awarded
              </th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>
                Proof
              </th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <tr
                  key={achievement.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f7f9fc" : "#eef3f9",
                    color: "#333",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d0e2f2";
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#f7f9fc" : "#eef3f9";
                    e.currentTarget.style.color = "#333";
                  }}
                >
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {achievement.title}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {achievement.description}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {achievement.company || "N/A"}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {achievement.credits || 0}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    {achievement.achievementProof || "N/A"}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        color:
                          getStatus(achievement.flag) === "Accepted"
                            ? "#28a745"
                            : getStatus(achievement.flag) === "Rejected"
                            ? "#dc3545"
                            : "#ffc107",
                        backgroundColor:
                          getStatus(achievement.flag) === "Accepted"
                            ? "#e6f8eb"
                            : getStatus(achievement.flag) === "Rejected"
                            ? "#f8d7da"
                            : "#fff3cd",
                      }}
                    >
                      {getStatus(achievement.flag)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    background: "#f7f9fc",
                    fontSize: "1.1em",
                    color: "#333",
                  }}
                >
                  No achievements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AchInsights;
