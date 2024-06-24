import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateTokenRoute";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project/index";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/projects" element={<PrivateRoute element={Project} />} />
    </Routes>
  );
};
