import React from 'react';
import { Navbar } from './components';

function App(): React.ReactElement {
  return (
    <div className={'w-full h-screen font-display bg-gray-200'}>
      <Navbar />
    </div>
  );
}

export default App;
