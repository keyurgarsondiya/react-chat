import React from 'react';
import { Routes, Route } from 'react-router';
import { Home, Login, Logout, Profile, Settings, SignUp } from './pages';
import { AuthProvider } from './store/auth';
import { ProtectedRoute } from './components';
import { Toaster } from 'react-hot-toast';

function App(): React.ReactElement {
  // TODO: Check GitHub JIRA Integration
  return (
    <AuthProvider>
      <Routes>
        <Route
          index
          path={'/'}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/settings'}
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path={'/login'} element={<Login />} />
        <Route path={'/sign-up'} element={<SignUp />} />
        <Route index path={'/logout'} element={<Logout />} />
      </Routes>

      <Toaster />
    </AuthProvider>
  );
}

export default App;
