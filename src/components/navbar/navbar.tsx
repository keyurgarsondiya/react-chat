import React from 'react';

export const Navbar = (): React.ReactElement => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      {/* App Name */}
      <div className="text-white text-2xl font-bold">React Chat</div>
    </nav>
  );
};
