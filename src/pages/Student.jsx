  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faEye, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

  const Student = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetchStudents();
    }, []);

    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const handleViewVisualize = (studentId, fullName , credits) => {
      navigate(`/visualize`, {
        state: { studentId , fullName, credits },
      });
    };
    

    return (
      <div className="relative min-h-screen text-white">
        {/* Fixed Gradient Background */}
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 -z-10"></div>
        <div className="absolute top-[-10px] left-8 w-32 h-18">
          <img
            src="/images/sa.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="fixed top-[-350px] left-8 w-45 h-18 opacity-30">
          <img
            src="/images/sa.png"
            alt="Logo"
            className="w-full h-full object-contain"
            style={{ opacity: 0.8 }}
          />
        </div>

        <div className="container mx-auto p-6 relative">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="flex justify-center items-center translate-x-[500px] text-4xl font-bold drop-shadow-lg">
              🎓 Student Management
            </h1>
            <button
              onClick={() => navigate("/admindashboard")}
              className="flex items-center px-6 py-3 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Dashboard
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="w-full text-center bg-white text-gray-800">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="px-4 py-3">Student ID</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">📧  Email</th>
                  <th className="px-4 py-3">🪙  Credits</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student.studentId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                    } hover:bg-indigo-100 transition`}
                  >
                    <td className="px-4 py-3">{student.studentId}</td>
                    <td className="px-4 py-3">{student.fullName}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      {student.credits}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleViewVisualize(student.studentId , student.fullName , student.credits)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FontAwesomeIcon icon={faEye} size="lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  export default Student;
