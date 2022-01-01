import React, { useState } from 'react';
import styles from './Settings.module.css';
import Help from './Help';
import Switch from './Switch';
import LocalSettings from './LocalSetting';
import GlobalSettings from './GlobalSetting';

const Settings: React.FC = () => {
  const [isLocalSettings, setIsLocalSettings] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.label}>Push to talk</div>
        <div className={styles.main}>
          <div className={styles.item}>
            <Help />
          </div>
          <div className={styles.item}>
            <Switch checked={isLocalSettings} setChecked={setIsLocalSettings} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <LocalSettings isHidden={!isLocalSettings} />
        <GlobalSettings isHidden={isLocalSettings} />
      </div>
    </div>
  );
};

export default Settings;
