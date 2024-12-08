import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing framer-motion
import { FaUserGraduate,FaCog , FaUserShield, FaChartBar, FaCalendarAlt, FaCogs, FaTasks, FaDatabase } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Animation Variants
  const topAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const bottomAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-[-20px] left-2 w-40 h-18">
        <img src="/images/sa.png" alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Logout Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition shadow-lg"
      >
        Logout
      </button>

      {/* Heading with Animated Icons */}
      <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-4 drop-shadow-lg">
  <motion.span
    initial={{ y: -4 }}
    animate={{ y: 4 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <FaUserShield className="text-yellow-300" />
  </motion.span>
  Admin Dashboard
  <motion.span
    initial={{ y: 4 }}
    animate={{ y: -4 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <FaCog className="text-white" />
  </motion.span>
</h1>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* First Row of Cards - From Top */}
        <motion.div
          variants={topAnimation}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0 }}
          className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
          onClick={() => navigate("/student")}
        >
          <FaUserGraduate className="text-4xl mb-4 text-blue-400 hover:scale-110 transition transform" />
          <h2 className="text-2xl font-semibold">Visualize Student</h2>
          <p className="text-center">View visualizions of studnet participation.</p>
        </motion.div>

        <motion.div
          variants={topAnimation}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
          onClick={() => navigate("/gradeachievements")}
        >
          <FaChartBar className="text-4xl mb-4 text-green-400 hover:scale-110 transition transform" />
          <h2 className="text-2xl font-semibold">Grade Achievements</h2>
          <p className="text-center">Track grade achievements and milestones.</p>
        </motion.div>

        <motion.div
          variants={topAnimation}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
          onClick={() => navigate("/addevents")}
        >
          <FaCalendarAlt className="text-4xl mb-4 text-yellow-400 hover:scale-110 transition transform" />
          <h2 className="text-2xl font-semibold">Add Events</h2>
          <p className="text-center">Manage school events and schedules.</p>
        </motion.div>

        {/* Second Row of Cards - From Bottom */}
        <motion.div
          variants={bottomAnimation}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
          onClick={() => navigate("/adminevent")}
        >
          <FaTasks className="text-4xl mb-4 text-gray-400 hover:rotate-45 transition transform" />
          <h2 className="text-2xl font-semibold">Event Management</h2>
          <p className="text-center">Mark Student availability.</p>
        </motion.div>

        <motion.div
          variants={bottomAnimation}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
          onClick={() => navigate("/eventuser")}
        >
          <FaCogs className="text-4xl mb-4 text-purple-400 hover:rotate-45 transition transform" />
          <h2 className="text-2xl font-semibold">Student Event Insights</h2>
          <p className="text-center">View and analyze student Event performance data.</p>
        </motion.div>

        <motion.div
          variants={bottomAnimation}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
          onClick={() => navigate("/achuser")}
        >
          <FaDatabase className="text-4xl mb-4 text-red-400 hover:rotate-45 transition transform" />
          <h2 className="text-2xl font-semibold">Student Achievement Insights</h2>
          <p className="text-center">View and analyze student Achievement Event performance data.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
