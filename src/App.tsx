import React from 'react';
import { Routes, Route } from 'react-router';
import { Home, Login, Logout, Profile, Settings, SignUp } from './pages';
import { AuthProvider } from './store/auth';
import { ProtectedRoute } from './components';

function App(): React.ReactElement {
  // Check GitHub JIRA Integration
  return (
    <AuthProvider>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/sign-up'} element={<SignUp />} />
        <Route index path={'/logout'} element={<Logout />} />
        <Route index path={'/'} element={<Home />} />

        <Route
          index
          path={'/home'}
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
      </Routes>
    </AuthProvider>
  );
}

export default App;
