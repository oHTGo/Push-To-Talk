import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './AppStartup.module.css';

const AppStartup: React.FC = () => {
  const [turnOffMicroEnabled, setTurnOffMicroEnabled] = useState<boolean>(true);
  const [turnOffCameraEnabled, setTurnOffCameraEnabled] = useState<boolean>(true);

  const onEnableTurnOffMicro = () => {
    setTurnOffMicroEnabled(true);
  };
  const onDisableTurnOffMicro = () => {
    setTurnOffMicroEnabled(false);
  };
  const onEnableTurnOffCamera = () => {
    setTurnOffCameraEnabled(true);
  };
  const onDisableTurnOffCamera = () => {
    setTurnOffCameraEnabled(false);
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
