import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Component/LoadingSpenner/LoadingSpenner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
