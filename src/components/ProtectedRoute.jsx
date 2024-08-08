// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('sumit-token'); // Check for JWT token in localStorage

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Optionally, add further token validation here if needed

  return element;
};

export default ProtectedRoute;
