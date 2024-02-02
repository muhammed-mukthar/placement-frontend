import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  if (role === "student") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
