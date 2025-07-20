import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import NotificationList from "./NotificationList";
import "./Dashboard.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => navigate("/"));
  };

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <div className="header-bar">
        <h2 className="dashboard-title">Task Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-container">
        {/* Notifications Panel */}
        <NotificationList />

        {/* Task Management Section */}
        <div className="main-dashboard">
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
