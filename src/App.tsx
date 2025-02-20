import React from 'react';

function App(): React.ReactElement {
  // Check GitHub JIRA Integration
  return (
    <div className={'flex flex-col text-red-500'}>
      <div>{'Hello World!'}</div>
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
    </div>
  );
}

export default App;
