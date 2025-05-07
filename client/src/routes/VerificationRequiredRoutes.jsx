import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// This component protects routes that require email verification
const VerificationRequiredRoutes = ({ isEmailVerified }) => {
  return !isEmailVerified ? (
    <Navigate to="/verify-email" replace />
  ) : (
    <Outlet />
  );
};

export default VerificationRequiredRoutes;