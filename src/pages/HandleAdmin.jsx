import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaCheck, FaTimes, FaPlus } from "react-icons/fa";

const HandleAdmin = () => {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/all-admins")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.adm - a.adm);
        setAdminData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  }, []);

  const updateAdminStatus = (email, newStatus) => {
    axios
      .post("http://localhost:8080/api/admin/update-status", { email, newStatus })
      .then((response) => {
        alert(response.data || "Admin status updated successfully.");
        setAdminData((prev) =>
          prev.map((admin) => (admin.email === email ? { ...admin, adm: newStatus } : admin))
        );
      })
      .catch((error) => {
        console.error("Error updating admin status:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-6 flex flex-col items-center">
      <div className="absolute top-[-20px] left-2 w-40 h-18">
                <img src="/images/sa.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <Link to="/masterdashboard" className="absolute top-6 right-6">
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition shadow-lg">
                    DashBoard
                </button>
            </Link>

      <div className="flex justify-center items-center mb-8">
        <h1 className="text-4xl font-bold text-white flex items-center space-x-4">
          <FaEdit className="text-yellow-500 animate-bounce" />
          <span>Edit Admin Status</span>
          <FaEdit className="text-yellow-500 animate-bounce" />
        </h1>
      </div>

      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-6xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-500/80 text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Student ID</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((admin) => (
              <tr
                key={admin.email}
                className="border-b hover:bg-indigo-100/50 transition duration-300"
              >
                <td className="px-6 py-4">{admin.fullName}</td>
                <td className="px-6 py-4">{admin.studentId}</td>
                <td className="px-6 py-4">{admin.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      admin.adm === 2
                        ? "bg-yellow-300 text-yellow-900"
                        : admin.adm === 1
                        ? "bg-green-300 text-green-900"
                        : "bg-gray-300 text-gray-900"
                    }`}
                  >
                    {admin.adm === 2 ? "Requested" : admin.adm === 1 ? "Admin" : "Not an Admin"}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-4">
                  {admin.adm === 2 ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow"
                      onClick={() => updateAdminStatus(admin.email, 1)}
                    >
                      <FaCheck />
                    </button>
                  ) : admin.adm === 1 ? (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow"
                      onClick={() => updateAdminStatus(admin.email, 0)}
                    >
                      <FaTimes />
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 shadow flex items-center justify-center"
                      onClick={() => updateAdminStatus(admin.email, 1)}
                    >
                      <FaPlus className="text-xl" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HandleAdmin;
