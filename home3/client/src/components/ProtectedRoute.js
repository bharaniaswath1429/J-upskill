import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" />; 
  }

  return <Component />;
};

export default ProtectedRoute;