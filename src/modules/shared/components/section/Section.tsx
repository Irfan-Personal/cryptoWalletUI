import React from 'react';
import { View } from 'react-native';
import classNames from 'classnames';

const Section = ({ className, children }: SectionProps) => {
  return (
    <View className={classNames('bg-dark dark:bg-white', className)}>
      {children}
    </View>
  );
};

interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export { Section };
