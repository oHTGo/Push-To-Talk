import React from 'react';
import styles from './Help.module.css';

const Help: React.FC = () => {
  return (
    <div className={styles.container}>
      Get started <button className={styles.button}>+</button>
    </div>
  );
};

export default Help;
