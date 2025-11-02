import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {

    const token = localStorage.getItem('token');


    if (!token) {
        alert("Invalid session. Please, login again.")
        return <Navigate to="/login" replace />
    }

    return children;
}