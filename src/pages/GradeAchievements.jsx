import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";  // For accepted status
import CancelIcon from "@mui/icons-material/Cancel";  // For rejected status
import AccessTimeIcon from "@mui/icons-material/AccessTime";  // For pending status
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";  // Fixed navigation issue
import "./GradeAchievements.css";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "rotate(360deg) scale(1.2)",
  },
}));

const GradeAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [credits, setCredits] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/achievements")
      .then((response) => {
        const sortedAchievements = response.data.sort((a, b) => b.flag - a.flag);
        setAchievements(sortedAchievements);
      })
      .catch((error) => console.error("Error fetching achievements:", error));
  }, []);

  const handleGrade = (achievement) => {
    setSelectedAchievement(achievement);
    setModalOpen(true);
  };

  const handleAccept = () => {
    setModalOpen(false);
    setConfirmModalOpen(true);
  };

  const confirmAccept = () => {
    if (!selectedAchievement || credits === "") {
      console.error("Achievement or credits missing.");
      return;
    }

    const { id, studentId } = selectedAchievement;

    axios
      .post("http://localhost:8080/api/achievements/grade", { id, credits })
      .then(() => {
        setAchievements((prev) =>
          prev.map((ach) =>
            ach.id === id ? { ...ach, flag: 1, credits: parseInt(credits) } : ach
          )
        );

        axios
          .post("http://localhost:8080/api/addCredits", { studentId, credits })
          .then(() => {
            console.log("User credits updated successfully.");
          })
          .catch((error) => console.error("Error updating user credits:", error));

        setSelectedAchievement(null);
        setCredits("");
        setConfirmModalOpen(false);
      })
      .catch((error) => console.error("Error grading achievement:", error));
  };

  const handleReject = () => {
    setModalOpen(false);
    setRejectModalOpen(true);
  };

  const confirmReject = () => {
    if (!selectedAchievement) {
      console.error("Achievement not selected.");
      return;
    }

    const { id } = selectedAchievement;

    axios
      .post("http://localhost:8080/api/achievements/reject", { id })
      .then(() => {
        setAchievements((prev) =>
          prev.map((ach) => (ach.id === id ? { ...ach, flag: -1 } : ach))
        );
        setSelectedAchievement(null);
        setRejectModalOpen(false);
      })
      .catch((error) => console.error("Error rejecting achievement:", error));
  };

  return (
    <div className="app-container">
      {/* Logo Sections */}
      <div className="absolute top-[-10px] left-8 w-32 h-18">
        <img src="/images/sa.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      <div className="fixed top-[-350px] left-8 w-45 h-18 opacity-30">
        <img
          src="/images/sa.png"
          alt="Logo"
          className="w-full h-full object-contain"
          style={{ opacity: 0.8 }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="flex justify-center items-center translate-x-[500px] text-4xl font-bold drop-shadow-lg">
          🏅 Grade Achievments 🏆
          </h1>
          <button
            onClick={() => navigate("/admindashboard")} // Fixed navigation
            className="flex items-center px-6 py-3 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Achievements Table */}
        <Box className="table-container" style={{ width: '90%', marginTop: '50px' }}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell align="center">Sl. No</TableCell>
                <TableCell align="center">Student ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Year</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {achievements.map((achievement, index) => (
                <TableRow key={achievement.id} className="table-row">
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{achievement.studentId}</TableCell>
                  <TableCell align="center">{achievement.title}</TableCell>
                  <TableCell align="center">{achievement.description}</TableCell>
                  <TableCell align="center">{achievement.year}</TableCell>
                  <TableCell align="center">
                    {achievement.flag === 1 ? (
                      <CheckCircleOutlineIcon className="icon-success" />
                    ) : achievement.flag === -1 ? (
                      <CancelIcon className="icon-rejected" style={{ color: 'red' }} />
                    ) : (
                      <AccessTimeIcon className="icon-pending" style={{ color: 'orange' }} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {achievement.flag === 0 && (
                      <StyledIconButton
                        color="primary"
                        onClick={() => handleGrade(achievement)}
                      >
                        <CreateIcon />
                      </StyledIconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Modals for Grading, Confirm Accept, and Reject */}
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <IconButton
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <CloseIcon />
              </IconButton>
              <Typography className="text-2xl font-semibold text-gray-800 mb-4">
                Grade Achievement
              </Typography>
              <div className="space-y-2 mb-4">
                <Typography className="text-gray-700">
                  <span className="font-bold">Title:</span> {selectedAchievement?.title}
                </Typography>
                <Typography className="text-gray-700">
                  <span className="font-bold">Description:</span> {selectedAchievement?.description}
                </Typography>
              </div>
              <TextField
                label="Credits"
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                fullWidth
                className="mb-6"
              />
              <div className="flex justify-between">
                <Button
                  onClick={handleReject}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
                >
                  Reject
                </Button>
                <Button
                  onClick={handleAccept}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Confirm Accept Modal */}
        <Modal open={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <Typography className="text-2xl font-semibold text-gray-800 mb-4">
                Confirm Acceptance
              </Typography>
              <Typography className="text-gray-700 mb-4">
                Are you sure you want to accept the achievement for {selectedAchievement?.title}?
              </Typography>
              <div className="flex justify-between">
                <Button
                  onClick={confirmAccept}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => setConfirmModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Reject Modal */}
        <Modal open={isRejectModalOpen} onClose={() => setRejectModalOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <Typography className="text-2xl font-semibold text-gray-800 mb-4">
                Confirm Rejection
              </Typography>
              <Typography className="text-gray-700 mb-4">
                Are you sure you want to reject the achievement for {selectedAchievement?.title}?
              </Typography>
              <div className="flex justify-between">
                <Button
                  onClick={confirmReject}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => setRejectModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GradeAchievements;
