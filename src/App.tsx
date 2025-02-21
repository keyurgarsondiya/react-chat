import React from 'react';
import { Routes, Route } from 'react-router';
import { Home, Login, Profile, Settings, SignUp } from './pages';

function App(): React.ReactElement {
  // Check GitHub JIRA Integration
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/sign-up'} element={<SignUp />} />
      <Route path={'/settings'} element={<Settings />} />
      <Route path={'/profile'} element={<Profile />} />
    </Routes>
  );
}

export default App;
