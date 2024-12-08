import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4">
      <img
        src={user.profilePic}
        alt="Profile"
        className="w-16 h-16 rounded-full mx-auto"
      />
      <h2 className="text-lg font-bold text-center">{user.name}</h2>
      <p className="text-center text-gray-600">{user.email}</p>
    </div>
  );
};

export default ProfileCard;
