import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../store/auth';
import { ServiceStatus } from '../../constants';
import { checkAuthAction } from '../../store/auth/actions';
import { Loading } from '../loading';

export const ProtectedRoute = (): React.ReactElement => {
  const {
    state: { isAuthenticated, serviceStatus, isAuthInitialized },
    dispatch,
  } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkAuthAbortController = new AbortController();

    (async () => {
      await checkAuthAction(dispatch, {
        signal: checkAuthAbortController.signal,
      });
    })();

    return () => {
      checkAuthAbortController.abort();
    };
  }, []);

  useEffect(() => {
    console.log('isAuthInitialized: ', isAuthInitialized);
  }, [isAuthInitialized]);

  if (!isAuthInitialized || serviceStatus === ServiceStatus.Loading) {
    return (
      <div
        className={
          'min-h-screen w-full flex flex-col justify-center items-center '
        }
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace state={{ from: location }} />
      )}
    </>
  );
};
