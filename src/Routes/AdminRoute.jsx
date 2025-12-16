import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Component/LoadingSpenner/LoadingSpenner";
import useRole from "../Hooks/useRole";
import Forbidden from "../Component/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
