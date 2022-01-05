import React, { useState, useEffect } from 'react';
import Configuration from './Configuration';
import { getStorage, setStorage } from '../../chromeServices/storage';

interface IProps {
  isHidden: boolean;
}

const LocalSettings: React.FC<IProps> = (props: IProps) => {
  const { isHidden } = props;
  const [shortcut, setShortcut] = useState<string>('');

  useEffect(() => {
    (async () => {
      setShortcut((await getStorage('Shortcut')) ?? '');
    })();
  }, []);

  const onClick = () => {
    setStorage('Shortcut', shortcut);
  };

  return (
    <Configuration
      label="Shortcut"
      data={shortcut}
      onChange={setShortcut}
      onClick={onClick}
      isHidden={isHidden}
    />
  );
};

export default LocalSettings;
