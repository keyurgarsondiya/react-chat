import React from 'react';
import { Navbar } from './components';
import { auth } from './firebase.ts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ChatRoom, Welcome } from './pages';

function App(): React.ReactElement {
  const [user] = useAuthState(auth);
  return (
    <div className={'w-full h-screen font-display bg-gray-200'}>
      <Navbar />
      {!user ? <Welcome /> : <ChatRoom />}
    </div>
  );
}

export default App;
