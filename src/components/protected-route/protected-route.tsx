import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { ActionType, useAuth } from '../../store/auth';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const {
    state: { isAuthenticated, loading },
    dispatch,
  } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>{'Loading...'}</div>;
  }

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   dispatch({
    //     type: ActionType.LoginRequestSuccess,
    //     payload: {
    //       token,
    //     },
    //   });
    // }
  }, []);

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
