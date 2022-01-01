import React, { useState } from 'react';
import Configuration from './Configuration';

interface IProps {
  isHidden: boolean;
}

const LocalSettings: React.FC<IProps> = (props: IProps) => {
  const { isHidden } = props;
  const [shortcut, setShortcut] = useState<string>('');
  const onClick = () => {
    console.log('Local Settings clicked: ' + shortcut);
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
