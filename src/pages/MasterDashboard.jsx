import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaCog, FaChartLine, FaUserShield } from "react-icons/fa";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-[-20px] left-2 w-40 h-18">
                <img src="/images/sa.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <Link to="/" className="absolute top-6 right-6">
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition shadow-lg">
                    LogOut
                </button>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Master Dashboard</h1>
            <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
                {/* Card 1 */}
                <div
                    className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
                    onClick={() => navigate("/handleadmin")}
                >
                    <FaUserGraduate className="text-4xl mb-4 text-blue-400 hover:scale-110 transition transform" />
                    <h2 className="text-2xl font-semibold">Student List</h2>
                    <p className="text-center">Manage and handle admin requests and roles</p>
                </div>

                {/* Card 2 */}
                <div
                    className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
                    onClick={() => navigate("/eventmanagement")}
                >
                    <FaCog className="text-4xl mb-4 text-gray-400 hover:rotate-45 transition transform" />
                    <h2 className="text-2xl font-semibold">Event Management</h2>
                    <p className="text-center">Placeholder for future feature</p>
                </div>

                {/* Card 3 */}
                <div
                    className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
                    onClick={() => navigate("/dummy")}
                >
                    <FaChartLine className="text-4xl mb-4 text-gray-400 hover:scale-110 transition transform" />
                    <h2 className="text-2xl font-semibold">Dummy Card 2</h2>
                    <p className="text-center">Placeholder for future feature</p>
                </div>

                {/* Card 4 */}
                <div
                    className="bg-white/30 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
                    onClick={() => navigate("/dummy")}
                >
                    <FaUserShield className="text-4xl mb-4 text-gray-400 hover:rotate-45 transition transform" />
                    <h2 className="text-2xl font-semibold">Dummy Card 3</h2>
                    <p className="text-center">Placeholder for future feature</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
