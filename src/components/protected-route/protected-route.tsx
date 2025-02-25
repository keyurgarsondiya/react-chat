import React from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../../store/auth';
import { Navigate } from 'react-router';
import { Loading } from '../loading';

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const {
    state: { isAuthenticated, loading },
  } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
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
