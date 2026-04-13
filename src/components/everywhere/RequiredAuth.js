import React, { useContext } from 'react';
import { AuthContext } from '../backened/context/Auth';
import { Navigate } from 'react-router-dom';

const RequiredAuth = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RequiredAuth;