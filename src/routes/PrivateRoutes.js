import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredPermission }) => {
  const token = localStorage.getItem("token"); // Check token for authentication
  const permissions = JSON.parse(localStorage.getItem("permissions")) || []; // Retrieve permissions from localStorage

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  if (!permissions.includes(requiredPermission)) {
    // Show not authorized message
    return (
      <div style={{ padding: "20px", textAlign: "center", fontSize: "30px", color: "red",marginTop:"300px" }}>
        Not Authorized to Access This Page
      </div>
    );
  }

  // Render the child component if authenticated and authorized
  return children;
};

export default PrivateRoute;
