import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectRoute = ({ isAuthenticated, admin, loading, children }) => {
  const location = useLocation();

   if (loading || (isAuthenticated && !admin)) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="loader"></div>
        <style>{`
          .loader {
            border: 4px solid #ddd;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }


  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && location.pathname.includes("/login")) {
    if ( admin?.role === "admin" || admin?.role === "super-admin") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }


  if (isAuthenticated && admin && admin?.role !== "admin" && admin?.role !== "super-admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  return <>{children}</>;
};



export default ProtectRoute