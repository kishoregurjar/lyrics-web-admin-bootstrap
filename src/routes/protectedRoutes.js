// src/components/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken, isTokenValid } from "../utils/authHelpers";
import { ROUTE_CONSTANT } from "./constant";



const ProtectedRoute = ({ element: Component }) => {
    const authToken = getAuthToken();
    const isAuthenticated = authToken && isTokenValid(authToken);

    return isAuthenticated ? (
        <Component />
    ) : (
        <Navigate to={ROUTE_CONSTANT.AUTH.LOGIN} replace />
    );
};

export default ProtectedRoute;
