import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteTwo({ role, children }) {
  if (role === "student") {
    return <Navigate to="/profile" replace />;
  } else if (role === "admin") {
    return <Navigate to="/profile" replace />;
  } else if (role === "employee") {
    return <Navigate to="/profile" replace />;
  } else {
    return children;
  }
}
export default ProtectedRouteTwo;
