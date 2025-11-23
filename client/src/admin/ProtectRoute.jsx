import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectRoute = ({ isAuthenticated, admin, children }) => {
  const location = useLocation();


  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

 
  if (isAuthenticated && (location.pathname.includes('/login'))) {
    if (admin?.role === 'admin') {
      return <Navigate to="/admin" />
    } else {
      return <Navigate to="/" />
    }
  }

  if (isAuthenticated && admin?.role !== 'admin' && location.pathname.includes('/admin')) {
    return <Navigate to="/unauth-page" />;
  }

  return <>{children}</>;
};


export default ProtectRoute