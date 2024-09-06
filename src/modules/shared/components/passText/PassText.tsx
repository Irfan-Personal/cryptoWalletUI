import React from 'react';
import { Text, TextProps } from 'react-native';
import classNames from 'classnames';

const PassText = ({ className, children }: ThemedTextProps) => {
  return (
    <Text className={classNames(className, 'text-headingText')}>
      {children}
    </Text>
  );
};

interface ThemedTextProps extends TextProps {
  className?: string;
}

export { PassText };
