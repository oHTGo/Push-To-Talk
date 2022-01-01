import React, { useState } from 'react';
import Configuration from './Configuration';

interface IProps {
  isHidden: boolean;
}

const GlobalSettings: React.FC<IProps> = (props: IProps) => {
  const { isHidden } = props;
  const [token, setToken] = useState<string>('');
  const onClick = () => {
    console.log('Global Settings clicked: ' + token);
  };

  return (
    <Configuration
      label="Code"
      data={token}
      onChange={setToken}
      onClick={onClick}
      isHidden={isHidden}
    />
  );
};

export default GlobalSettings;
