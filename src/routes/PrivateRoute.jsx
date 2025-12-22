import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import  useAuth  from '../hook/UseAuth';
import TextOrCardLoader from '../components/loader/TextOrcardLoader'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <TextOrCardLoader></TextOrCardLoader>; // Or a spinner component
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;