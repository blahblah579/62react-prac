// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext";

// export default function ProtectedRoute() {
//   const { currentUser } = useAuth();
//   return currentUser ? <Outlet /> : <Navigate to="/auth" replace />;
// }

// src/ProtectedRoute.jsx
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// export default function ProtectedRoute({ user, redirectPath = "/" }) {
//   if (!user || user === "demo") {
//     // not allowed
//     return <Navigate to={redirectPath} replace />;
//   }
//   // **Render nested child routes** via Outlet
//   return <Outlet />;
// }

import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user }) {
  return user !== null && user !== "demo" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
