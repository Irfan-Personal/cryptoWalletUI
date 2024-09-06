import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

const PassStatusBar = ({ className }: ThemedStatusBarProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <StatusBar
      className={className}
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    />
  );
};

interface ThemedStatusBarProps {
  className?: string;
}

export { PassStatusBar };
