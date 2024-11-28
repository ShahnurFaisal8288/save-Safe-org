import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Check if the token exists

    if (!token) {
        return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the child component if authenticated
};

export default PrivateRoute;
