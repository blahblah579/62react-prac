// src/components/NoAuthRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * If there's a logged-in user (demo or real), redirect
 * back to their dashboard. Otherwise, render the child routes.
 */
export default function NoAuthRoute({ user }) {
  if (user === "demo") {
    return <Navigate to="/demoHomePage" replace />; // :contentReference[oaicite:0]{index=0}
  }
  if (user) {
    return <Navigate to="/userHomePage" replace />; // :contentReference[oaicite:1]{index=1}
  }
  return <Outlet />;
}
