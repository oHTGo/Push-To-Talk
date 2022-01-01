import React from 'react';
import styles from './Input.module.css';

interface IProps {
  data: string;
  onChange: (data: string) => void; // eslint-disable-line no-unused-vars
  onClick: () => void;
}

const Input: React.FC<IProps> = (props: IProps) => {
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    props.onChange(event.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" onChange={onChange} />
      <input className={styles.button} type="button" value="↳" onClick={props.onClick} />
    </div>
  );
};

export default Input;
