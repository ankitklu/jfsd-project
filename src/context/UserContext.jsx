import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the user data
const UserContext = createContext();

// Provider component to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever the user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Logout handler to clear user and storage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);
