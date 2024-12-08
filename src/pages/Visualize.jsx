import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Insights = () => {
  const { state } = useLocation();
  const { studentId, fullName, credits } = state || {};
  const [eventCredits, setEventCredits] = useState(null);
  const [eventCount, setEventCount] = useState(null);
  const [achievementCount, setAchievementCount] = useState(null);
  const [presentCount, setPresentCount] = useState(null);
  const [absentCount, setAbsentCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);
  const [acceptedAchieveCount, setAcceptedAchieveCount] = useState(null);
  const [rejectedAchieveCount, setRejectedAchieveCount] = useState(null);
  const [pendingAchieveCount, setPendingAchieveCount] = useState(null);

  const achCredits = credits && eventCredits !== null ? credits - eventCredits : null;

  useEffect(() => {
    if (studentId) {
      const fetchData = async (url, setState, property) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setState(data[property]);
          } else {
            console.error(`Failed to fetch data from ${url}:`, await response.text());
          }
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        }
      };

      fetchData(`http://localhost:8080/api/achievements/achCre?studentId=${studentId}`, setEventCredits, 'eventCredits');
      fetchData(`http://localhost:8080/api/participate/countEve?studentId=${studentId}`, setEventCount, 'countEve');
      fetchData(`http://localhost:8080/api/achievements/countAche?studentId=${studentId}`, setAchievementCount, 'countAche');
      fetchData(`http://localhost:8080/api/participate/presentCount?studentId=${studentId}`, setPresentCount, 'presentCount');
      fetchData(`http://localhost:8080/api/participate/absentCount?studentId=${studentId}`, setAbsentCount, 'absentCount');
      fetchData(`http://localhost:8080/api/participate/pendingCount?studentId=${studentId}`, setPendingCount, 'pendingCount');
      fetchData(`http://localhost:8080/api/achievements/acceptCount?studentId=${studentId}`, setAcceptedAchieveCount, 'acceptCount');
      fetchData(`http://localhost:8080/api/achievements/rejectCount?studentId=${studentId}`, setRejectedAchieveCount, 'rejectCount');
      fetchData(`http://localhost:8080/api/achievements/pendCount?studentId=${studentId}`, setPendingAchieveCount, 'pendingCount');
    }
  }, [studentId]);

  const createChartData = (labels, data, colors) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  });

  const charts = [
    {
      title: 'Event Credits vs Achievement Credits',
      data: createChartData(
        ['Event Credits', 'Achievement Credits'],
        [eventCredits || 0, achCredits || 0],
        ['#FF6384', '#36A2EB']
      ),
    },
    {
      title: 'Event Count vs Achievement Count',
      data: createChartData(
        ['Event Count', 'Achievement Count'],
        [eventCount || 0, achievementCount || 0],
        ['#4BC0C0', '#9966FF']
      ),
    },
    {
      title: 'Present vs Absent vs Pending Events',
      data: createChartData(
        ['Present Events', 'Absent Events', 'Pending Events'],
        [presentCount || 0, absentCount || 0, pendingCount || 0],
        ['#FFCE56', '#FF6384', '#36A2EB']
      ),
    },
    {
      title: 'Accepted vs Rejected vs Pending',
      data: createChartData(
        ['Accepted Achievements', 'Rejected Achievements', 'Pending Achievements'],
        [acceptedAchieveCount || 0, rejectedAchieveCount || 0, pendingAchieveCount || 0],
        ['#36A2EB', '#FF6384', '#FFCE56']
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #4299e1, #6366f1, #7c3aed)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>
        Data Visualization for {fullName || 'Guest'}
      </h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>Total Credits: 🪙 {credits || 0}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          gap: '15px',
          width: '100%',
          overflowX: 'auto',
          maxWidth: '100%',
        }}
      >
        {charts.map((chart, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255, 255, 255, 0.5)', // 50% transparent background
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              flex: '0 0 300px', // Adjust width for better layout
            }}
          >
            <h3 style={{ fontSize: '1.5em', marginBottom: '15px', color: '#333' }}>
              {chart.title}
            </h3>
            <div style={{ width: '90%', margin: '0 auto' }}>
              <Pie data={chart.data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
