import React from 'react';
import styles from './App.module.css';

import AppStartup from './components/AppStartup/AppStartup';
import Settings from './components/Settings/Settings';
// import { getStorage } from './chromeServices/storage';

const App = function () {
  // const [status, setStatus] = useState<string>('');

  // const updateStatus = () => {
  //   setTimeout(async () => {
  //     // const status = await getStorage('serverStatus');
  //     setStatus(status);

  //     updateStatus();
  //   }, 50);
  // };
  // updateStatus();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className="content">Extension</div>
      </header>
      <AppStartup />
      <Settings />
    </div>
  );
};

export default App;
