import React, { useEffect, useState, useMemo } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewAch = () => {
  const { user, setUser } = useUserContext();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const navigate = useNavigate();

  const countAchievements = () => {
    let total = achievements.length;
    let accepted = achievements.filter(ach => ach.flag === 1).length;
    let rejected = achievements.filter(ach => ach.flag === -1).length;
    let pending = achievements.filter(ach => ach.flag === 0).length;

    return { total, accepted, rejected, pending };
  };

  const { total, accepted, rejected, pending } = useMemo(() => countAchievements(), [achievements]);

  useEffect(() => {
    const checkUser = () => {
      if (!user) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          navigate('/viewAch');
        }
      }
    };

    checkUser();
  }, [user, setUser, navigate]);

  useEffect(() => {
    if (user && user.studentId) {
      const fetchAchievements = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:8080/api/achievements/${user.studentId}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch achievements');
          }
          const data = await response.json();
          setAchievements(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAchievements();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-600 rounded-full h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Fixed Gradient Background */}
      <div className="absolute top-[-10px] left-8 w-32 h-18">
          <img src="./images/logo.png" alt="." className="w-full h-full object-contain" />
        </div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 -z-10"></div>
      <div className="fixed top-[-350px] left-8 w-45 h-18 opacity-30">
  <img
    src="/images/.png"
    alt="Logo"
    className="w-full h-full object-contain"
    style={{ opacity: 0.8 }}
  />
</div>

      <div className="container mx-auto text-white p-6 relative">
        <div className="flex justify-between items-center mb-6">
        <div className="flex justify-center items-center translate-x-[600px]">
  <h1 className="text-3xl font-bold">{user.fullName}'s Courses</h1>
</div>


          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <div className="p-6 bg-gray-400 rounded-lg shadow-lg text-center">
            <h3 className="font-semibold text-xl text-black">Total Courses</h3>
            <p className="text-3xl font-bold text-black">{total}</p>
          </div>
          <div className="p-6 bg-green-400 rounded-lg shadow-lg text-center">
            <h3 className="font-semibold text-xl text-black">Accepted</h3>
            <p className="text-3xl font-bold text-black">{accepted}</p>
          </div>
          <div className="p-6 bg-red-400 rounded-lg shadow-lg text-center">
            <h3 className="font-semibold text-xl text-black">Rejected</h3>
            <p className="text-3xl font-bold text-black">{rejected}</p>
          </div>
          <div className="p-6 bg-blue-400 rounded-lg shadow-lg text-center">
            <h3 className="font-semibold text-xl text-black">Pending</h3>
            <p className="text-3xl font-bold text-black">{pending}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-6 rounded-lg shadow-lg transition-all transform ${
                achievement.flag === 1
                  ? 'bg-green-400'
                  : achievement.flag === -1
                  ? 'bg-red-400'
                  : 'bg-blue-400'
              }`}
              onMouseEnter={() => setHoveredAchievement(achievement.id)}
              onMouseLeave={() => setHoveredAchievement(null)}
            >
              <h2 className="text-xl font-bold text-black text-center">
                {achievement.title}
              </h2>
              <p className="text-black text-center">
                <strong>Description:</strong> {achievement.description || 'No description available'}
              </p>
              <p className="text-black text-center">
                <strong>Duration:</strong> {achievement.year || 'N/A'} months
              </p>
              {achievement.company && (
                <p className="text-black text-center">
                  <strong>Company:</strong> {achievement.company}
                </p>
              )}
              {achievement.priceMoney && (
                <p className="text-black text-center">
                  <strong>Prize Money:</strong> ${achievement.priceMoney}
                </p>
              )}
              <p className="text-black text-center">
                <strong>Status:</strong>{' '}
                {achievement.flag === 1
                  ? 'Accepted'
                  : achievement.flag === -1
                  ? 'Rejected'
                  : 'Pending'}
              </p>

              <div
                className={`absolute inset-0 flex justify-center items-center text-white text-xl font-bold bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                  hoveredAchievement === achievement.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {achievement.flag === 1 && hoveredAchievement === achievement.id && (
                  <p>Accepted</p>
                )}
                {achievement.flag === -1 && hoveredAchievement === achievement.id && (
                  <p>Rejected due to insufficient proof</p>
                )}
                {achievement.flag === 0 && hoveredAchievement === achievement.id && (
                  <p>Submitted for grading</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAch;
