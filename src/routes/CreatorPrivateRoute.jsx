import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import  useAuth  from '../hook/UseAuth';
import TextOrCardLoader from '../components/loader/TextOrcardLoader'

const CreatorPrivateRoute = ({ children }) => {
  const { user, loading  } = useAuth();
  const location = useLocation();
  if (loading || !user?.role) {
    return <div><TextOrCardLoader></TextOrCardLoader></div>; // Or a spinner component
  }


  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if(user?.role!=='creator'){
    return <Navigate to="/message" state={{ message: 'creator' }} replace />;
  }
  return children;
};

export default CreatorPrivateRoute;