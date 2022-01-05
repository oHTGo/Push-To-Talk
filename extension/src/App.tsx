import React from 'react';
import styles from './App.module.css';

import AppStartup from './components/AppStartup/AppStartup';
import Settings from './components/Settings/Settings';

const App = function () {
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
