import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token"); // JWT or auth token
  const role = localStorage.getItem("role");

  // If token missing or invalid, clear localStorage and redirect
  if (!token) {
    localStorage.clear(); // remove userName, role, token
    return <Navigate to="/signin" replace />;
  }

  // Optional: check role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
