import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../store/auth';
import { Loading } from '../loading';
import { ServiceStatus } from '../../constants';

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const {
    state: { isAuthenticated, serviceStatus, isInitialized },
  } = useAuth();
  const location = useLocation();

  if (serviceStatus === ServiceStatus.Loading || !isInitialized) {
    return <Loading />;
  }

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ from: location }} />
      )}
    </>
  );
};
