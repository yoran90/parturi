import React from 'react'
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";


const ProtectUserRoute = ({ isAuthenticated, user, loading, children}) => {

  const location = useLocation();

  if (loading || (isAuthenticated && !user)) {
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

  if (!isAuthenticated && location.pathname !== "/kirjaudu" && location.pathname !== "/register") {
    return <Navigate to="/kirjaudu" />
  }

  if (isAuthenticated && location.pathname.includes("/kirjaudu")) {
    if (user?.role === "user") {
      return <Navigate to="/profile" />
    } else {
      return <Navigate to="/unauth-page" />
    }
  }

  if (isAuthenticated && user && user?.role !== "user") {
    return <Navigate to="/unauth-page" />
  } 

  return <>{children}</>;

}

export default ProtectUserRoute