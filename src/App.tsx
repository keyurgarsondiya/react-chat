import React from 'react';
import { Routes, Route } from 'react-router';
import { Home, Login, Logout, Profile, Settings, SignUp } from './pages';
import { AuthProvider, ProfileProvider } from './store';
import { ProtectedRoute } from './components';
import { Toaster } from 'react-hot-toast';

function App(): React.ReactElement {
  // TODO: Check GitHub JIRA Integration
  return (
    <AuthProvider>
      <ProfileProvider>
        <Routes>
          <Route path={'/'} element={<ProtectedRoute />}>
            <Route index path={'/'} element={<Home />} />
            <Route path={'/settings'} element={<Settings />} />
            <Route path={'/profile'} element={<Profile />} />
          </Route>
          {/*<Route*/}
          {/*  path={'/settings'}*/}
          {/*  element={*/}
          {/*    <ProtectedRoute>*/}
          {/*      <Settings />*/}
          {/*    </ProtectedRoute>*/}
          {/*  }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*  path={'/profile'}*/}
          {/*  element={*/}
          {/*    <ProtectedRoute>*/}
          {/*      <Profile />*/}
          {/*    </ProtectedRoute>*/}
          {/*  }*/}
          {/*/>*/}

          <Route path={'/login'} element={<Login />} />
          <Route path={'/sign-up'} element={<SignUp />} />
          <Route path={'/logout'} element={<Logout />} />
        </Routes>

        <Toaster />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
