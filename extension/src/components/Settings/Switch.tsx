import React from 'react';
import classnames from 'classnames';
import styles from './Switch.module.css';

interface IProps {
  checked: boolean;
  setChecked: (checked: boolean) => void; // eslint-disable-line no-unused-vars
}

const Switch: React.FC<IProps> = (props: IProps) => {
  const { checked, setChecked } = props;

  const onChange = () => {
    setChecked(!checked);
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={classnames(styles.checkbox)}
        onChange={onChange}
        checked={checked}
      />
      <div className={styles.status}>
        <div
          className={classnames(styles.global, styles.label, {
            [styles['global-disabled']]: checked,
          })}
          onClick={onChange}
        >
          Global
        </div>
        <div
          className={classnames(styles.local, styles.label, {
            [styles['local-disabled']]: !checked,
          })}
          onClick={onChange}
        >
          Local
        </div>
      </div>
    </div>
  );
};

export default Switch;
