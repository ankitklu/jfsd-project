import React from 'react';

const ActivityCard = ({ activity }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold">{activity.name}</h2>
      <p className="text-gray-600">{activity.description}</p>
      <p className="text-sm text-gray-400">Date: {activity.date}</p>
    </div>
  );
};

export default ActivityCard;
