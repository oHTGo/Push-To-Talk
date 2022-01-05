import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './AppStartup.module.css';
import { getStorage, setStorage } from '../../chromeServices/storage';

const AppStartup: React.FC = () => {
  const [turnOffMicroEnabled, setTurnOffMicroEnabled] = useState<boolean>(false);
  const [turnOffCameraEnabled, setTurnOffCameraEnabled] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setTurnOffMicroEnabled((await getStorage('TurnOffMicroEnabled')) === 'true');
      setTurnOffCameraEnabled((await getStorage('TurnOffCameraEnabled')) === 'true');
    })();
  }, []);

  const onEnableTurnOffMicro = () => {
    setTurnOffMicroEnabled(true);
    setStorage('TurnOffMicroEnabled', 'true');
  };
  const onDisableTurnOffMicro = () => {
    setTurnOffMicroEnabled(false);
    setStorage('TurnOffMicroEnabled', 'false');
  };
  const onEnableTurnOffCamera = () => {
    setTurnOffCameraEnabled(true);
    setStorage('TurnOffCameraEnabled', 'true');
  };
  const onDisableTurnOffCamera = () => {
    setTurnOffCameraEnabled(false);
    setStorage('TurnOffCameraEnabled', 'false');
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.label}>Turn off micro</div>
        <div className={styles.switch}>
          <button
            className={classNames(styles.button, { [styles.active]: turnOffMicroEnabled })}
            onClick={onEnableTurnOffMicro}
          >
            Allow
          </button>
          <button
            className={classNames(styles.button, { [styles.active]: !turnOffMicroEnabled })}
            onClick={onDisableTurnOffMicro}
          >
            Reject
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.label}>Turn off camera</div>
        <div className={styles.switch}>
          <button
            className={classNames(styles.button, { [styles.active]: turnOffCameraEnabled })}
            onClick={onEnableTurnOffCamera}
          >
            Allow
          </button>
          <button
            className={classNames(styles.button, { [styles.active]: !turnOffCameraEnabled })}
            onClick={onDisableTurnOffCamera}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppStartup;
