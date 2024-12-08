import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Button,
  CardMedia,
  Typography,
  Grid,
  Box,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../context/UserContext"; // Adjust the import path as needed

const ParticipateInEvents = () => {
  const navigate = useNavigate();
  const { user } = useUserContext(); // Access the logged-in user data from context
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false); // State to manage already registered popup

  useEffect(() => {
    // Fetch events from the backend
    axios
      .get("http://localhost:8080/api/events/all?accepted=true")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleMoreDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    if (selectedEvent && user) {
      const registrationData = {
        studentId: user.studentId,
        studentMail: user.email,
        eventId: selectedEvent.id,
        credits: selectedEvent.credits,
        title: selectedEvent.title,
        venue: selectedEvent.venue,
        eventDateTime: selectedEvent.eventDateTime,
        poster: selectedEvent.poster,
        description: selectedEvent.description,
        

        flag: 0,
      };

      // Check if the user is already registered
      axios
        .get(`http://localhost:8080/api/participate/student/${user.studentId}/event/${selectedEvent.id}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            // Show already registered modal
            setIsAlreadyRegistered(true);
          } else {
            // Proceed with registration
            submitRegistration(registrationData);
          }
        })
        .catch((error) => {
          console.error("Error checking existing registration:", error);
          alert("Failed to check registration. Please try again.");
        });
    } else {
      alert("Please select an event and make sure you are logged in.");
    }
  };

  const submitRegistration = (registrationData) => {
    axios
      .post("http://localhost:8080/api/participate", registrationData)
      .then(() => {
        handleMoreDetails(false);
        setIsAlreadyRegistered(false);
      })
      .catch((error) => {
        console.error("Error registering for the event:", error);
        alert("Failed to register for the event. Please try again.");
      });
  };

  const handleCloseAlreadyRegistered = () => {
    setIsAlreadyRegistered(false);
    handleMoreDetails(false);

  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 min-h-screen flex flex-col">
 {/* Logo */}
 <div className="absolute top-[-20px] left-2 w-40 h-18">
        <img src="/images/s.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 right-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition shadow-lg"
      >
        Dashboard
      </button>
    <Box sx={{ minHeight: "100vh", backgroundColor:"linear-gradient(to bottom right, #60a5fa, #6366f1, #8b5cf6)", padding: "  60px" }}>
    <Box
  sx={{
    minHeight: "0vh",
    background: "transparent",
    padding: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  }}
>
<div 
  className="animated-container"
style={{ 
    color: "black", 
    fontSize: "28px", 
    fontWeight: "bold", 
    letterSpacing: "2px", 
    lineHeight: "1.5", 
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
    position: "relative" 
  }}>
  <span 
    className="movable-icon" 
    style={{ left: "-40px", position: "absolute" }}
  >
    🎉
  </span>
  Claim Your Place in the Excitement, Do Register!
  <span 
    className="movable-icon" 
    style={{ right: "-40px", position: "absolute" }}
  >
    🚀
  </span>
</div>
</Box>
     
      {/* Event Cards */}
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {events.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="textSecondary">
              No events available
            </Typography>
          </Grid>
        ) : (
          events.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "10px",
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                ":hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              {/* Event Image with Click Handler */}
              <CardMedia
                component="img"
                image={event.poster}
                alt={event.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  maxWidth: "1080px",
                  maxHeight: "1350px",
                  filter: "brightness(100%)",
                  transition: "filter 0.3s",
                  cursor: "pointer",
                  ":hover": { filter: "blur(5px) brightness(70%)" },
                }}
                onClick={() => handleMoreDetails(event)} // Open popup on image click
              />
              {/* Hover Details */}
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  ":hover": { opacity: 1 },
                }}
                onClick={() => handleMoreDetails(event)} // Open popup on hover area click
              >
                <Typography variant="h6" fontWeight="bold">
                  {event.title}
                </Typography>
                <Typography variant="body2">
                  {new Date(event.eventDateTime).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">{event.venue}</Typography>
                <Typography
  variant="h6"
  fontWeight="bold"
  sx={{
    color: "rgba(255, 255,255, 0.2)", // Red color with 80% opacity
  }}
>
TAP TO REGISTER
</Typography>

              </Box>
            </Box>
          </Grid>
          
          ))
        )}
      </Grid>
      
      {/* Popup Modal */}
      <Modal
  open={Boolean(selectedEvent)}
  onClose={handleCloseDetails}
  aria-labelledby="event-details-title"
  aria-describedby="event-details-description"
>
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 transition-transform transform scale-95 hover:scale-100">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        onClick={handleCloseDetails}
      >
        <CloseIcon fontSize="large" />
      </button>

      {/* Event Title and Details */}
      <div className="flex flex-col items-center mb-4">
        <h2
          id="event-details-title"
          className="text-3xl font-extrabold text-blue-600"
        >
          {selectedEvent?.title}
        </h2>
        <p className="text-gray-600 text-lg italic">{selectedEvent?.venue}</p>
        <p className="text-gray-600 text-sm">
          {new Date(selectedEvent?.eventDateTime).toLocaleString()}
        </p>
      </div>

      {/* Event Description */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Side: Description */}
        <div className="flex-1 text-gray-700">
          <h3 className="text-xl font-semibold mb-2">Event Description</h3>
          <p className="text-sm leading-relaxed">{selectedEvent?.description}</p>
        </div>

        {/* Right Side: Rules with Icons */}
        <div className="flex-1 text-gray-700">
          <h3 className="text-xl font-semibold mb-4">Important Rules</h3>
          <ul className="space-y-3">
  <li className="flex items-center">
    <span className="text-green-500">
      <svg
        className="w-6 h-6 mr-2 transform rotate-90 scale-x-[-1]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10l8 8 8-8H2z" fillRule="evenodd" />
      </svg>
    </span>
    <p>1. If absent, you will be marked negative credits.</p>
  </li>
  <li className="flex items-center">
    <span className="text-blue-500">
      <svg
        className="w-6 h-6 mr-2 transform rotate-90 scale-x-[-1]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10l8 8 8-8H2z" fillRule="evenodd" />
      </svg>
    </span>
    <p>2. Dress code is mandatory.</p>
  </li>
  <li className="flex items-center">
    <span className="text-red-500">
      <svg
        className="w-6 h-6 mr-2 transform rotate-90 scale-x-[-1]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10l8 8 8-8H2z" fillRule="evenodd" />
      </svg>
    </span>
    <p>3. No mobiles allowed during the event.</p>
  </li>
  <li className="flex items-center">
    <span className="text-yellow-500">
      <svg
        className="w-6 h-6 mr-2 transform rotate-90 scale-x-[-1]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10l8 8 8-8H2z" fillRule="evenodd" />
      </svg>
    </span>
    <p>4. Be present at the venue at least 5 minutes before.</p>
  </li>
  <li className="flex items-center">
    <span className="text-purple-500">
      <svg
        className="w-6 h-6 mr-2 transform rotate-90 scale-x-[-1]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10l8 8 8-8H2z" fillRule="evenodd" />
      </svg>
    </span>
    <p>5. Utilize the event and enjoy to the fullest!</p>
  </li>
</ul>

        </div>
      </div>

      {/* Registration Button */}
      <button
        onClick={handleRegister}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Register for Event
      </button>
    </div>
  </div>
</Modal>
<Modal
        open={isAlreadyRegistered}
        onClose={handleCloseAlreadyRegistered}
        aria-labelledby="already-registered-title"
        aria-describedby="already-registered-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="already-registered-title" variant="h6" fontWeight="bold" align="center">
            Already Registered
          </Typography>
          <Typography id="already-registered-description" variant="body1" align="center" sx={{ mt: 2 }}>
            You have already registered for the event titled "<strong>{selectedEvent?.title}</strong>".
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleCloseAlreadyRegistered}>
              Back to Events
            </Button>
          </Box>
        </Box>
      </Modal>

    </Box>
    </div>
  );
};

export default ParticipateInEvents;
