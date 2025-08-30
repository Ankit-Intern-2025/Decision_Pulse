import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status
  const accessToken = localStorage.getItem("accessToken"); // Check login status

  if (!accessToken) {
    // Redirect to the login page if not logged in
    return <Navigate to="/" />;
  }

  return children; // Render the protected route content if logged in
};

export default ProtectedRoute;
