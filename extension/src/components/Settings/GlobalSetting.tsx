import React, { useEffect, useState } from 'react';
import Configuration from './Configuration';
import { getStorage, setStorage } from '../../chromeServices/storage';

interface IProps {
  isHidden: boolean;
}

const GlobalSettings: React.FC<IProps> = (props: IProps) => {
  const { isHidden } = props;
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    (async () => {
      setCode((await getStorage('Code')) ?? '');
    })();
  }, []);

  const onClick = () => {
    setStorage('Code', code);
  };

  return (
    <Configuration
      label="Code"
      data={code}
      onChange={setCode}
      onClick={onClick}
      isHidden={isHidden}
    />
  );
};

export default GlobalSettings;
