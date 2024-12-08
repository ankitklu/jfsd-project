import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PostAttendance = () => {
  const { state } = useLocation();
  const { eventId } = state;
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEventUpdated, setIsEventUpdated] = useState(false);
  const [message, setMessage] = useState(""); // For popup message
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`attendanceData-${eventId}`));

    if (storedData) {
      setAttendanceData(storedData);
      setLoading(false);
    } else {
      fetchAttendanceData();
    }
  }, [eventId]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/participate/event/${eventId}`);
      setAttendanceData(response.data);
      localStorage.setItem(`attendanceData-${eventId}`, JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (studentId, flag) => {
    try {
      // Update attendance status
      await axios.post(`http://localhost:8080/api/participate/update-status`, {
        studentId,
        eventId,
        flag,
      });
  
      // Update credits based on flag
      if (flag === 1) {
        await axios.post(`http://localhost:8080/api/present`, { studentId });
      } else if (flag === -1) {
        await axios.post(`http://localhost:8080/api/absent`, { studentId });
      }
  
      // Update local state
      const updatedData = attendanceData.map((attendance) =>
        attendance.studentId === studentId
          ? { ...attendance, flag }
          : attendance
      );
  
      setAttendanceData(updatedData);
      localStorage.setItem(`attendanceData-${eventId}`, JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error updating attendance or credits:", error);
    }
  };
  

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/api/events/update-happened`, { eventId });
      setIsEventUpdated(true);

      setMessage("Attendance Posted!"); // Show popup message
      setTimeout(() => {
        navigate("/adminevent"); // Redirect to admin event page
      }, 2000); // 2-second delay
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem(`attendanceData-${eventId}`);
    navigate(-1);
  };

  if (loading) return <p>Loading attendance data...</p>;

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 via-white to-blue-200 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 drop-shadow-lg">
          📝 Post Attendance for Event ID: {eventId}
        </h1>
        <button
          onClick={handleGoBack}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-xl"
        >
          Go Back
        </button>
      </div>

      {/* Attendance Table */}
      <section className="mb-10">
        <table className="table-auto w-full bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Student ID</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance) => (
              <tr
                key={attendance.studentId + attendance.eventId}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4">{attendance.studentId}</td>
                <td className="px-6 py-4 flex space-x-4">
                  {attendance.flag !== 1 && (
                    <button
                      onClick={() => updateAttendance(attendance.studentId, 1)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Mark Attended
                    </button>
                  )}
                  {attendance.flag !== -1 && (
                    <button
                      onClick={() => updateAttendance(attendance.studentId, -1)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Mark Absent
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className={`px-6 py-2 rounded-lg hover:shadow-xl ${
            isEventUpdated
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          }`}
          disabled={isEventUpdated}
        >
          {isEventUpdated ? "Event Status Updated" : "Mark Event as Happened"}
        </button>
      </div>

      {/* Popup Message */}
      {message && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default PostAttendance;
