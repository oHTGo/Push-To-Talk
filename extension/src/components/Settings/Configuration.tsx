import React from 'react';
import classnames from 'classnames';
import styles from './Configuration.module.css';
import Input from './Input';

interface IProps {
  label: string;
  data: string;
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  onClick: () => void;
  isHidden: boolean;
}

const Configuration: React.FC<IProps> = (props: IProps) => {
  const { label, data, onChange, onClick, isHidden } = props;

  return (
    <div className={classnames(styles.container, { [styles.hidden]: isHidden })}>
      <div className={styles.label}>{label}</div>
      <Input data={data} onChange={onChange} onClick={onClick} />
    </div>
  );
};

export default Configuration;
