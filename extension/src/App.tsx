import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getStorage } from './chromeServices/storage';

const App = function () {
  const [status, setStatus] = useState<string>('');

  const updateStatus = () => {
    setTimeout(async () => {
      const status = await getStorage('serverStatus');
      setStatus(status);

      updateStatus();
    }, 50);
  };
  updateStatus();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        Server status: {status}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
