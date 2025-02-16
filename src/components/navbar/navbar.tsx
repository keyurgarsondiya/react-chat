import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.ts';

export const Navbar = (): React.ReactElement => {
  // const [user] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account ',
    });
    signInWithPopup(auth, provider).then((res) => {
      console.log(res);
    });
    // setUser(true);
  };

  const signOut = () => {
    auth.signOut();
    // setUser(false);
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      {/* App Name */}
      <div className="text-white text-2xl font-bold">React Chat</div>
      {user ? (
        <div
          onClick={signOut}
          className="w-[202px] flex justify-center items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          Sign Out
        </div>
      ) : (
        <div
          onClick={googleSignIn}
          className="w-[202px] flex justify-center items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </div>
      )}
    </nav>
  );
};
