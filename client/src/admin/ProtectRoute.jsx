import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectRoute = ({ isAuthenticated, admin, loading, children }) => {
  const location = useLocation();

  if (loading) return null;


  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && location.pathname.includes("/login")) {
    if ( admin?.role === "admin" || admin?.role === "super-admin") {
      return <Navigate to="/admin" />;
    } /* else {
      return <Navigate to="/" />;
    } */
  }

  if (isAuthenticated && admin?.role !== "admin" && admin?.role !== "super-admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  return <>{children}</>;
};



export default ProtectRoute