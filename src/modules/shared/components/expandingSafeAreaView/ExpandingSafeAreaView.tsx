import React from 'react';
import { SafeAreaView } from 'react-native';
import classNames from 'classnames';

const ExpandingSafeAreaView = ({
  className,
  children,
}: ExpandingSafeAreaViewProps) => {
  return (
    <SafeAreaView className={classNames('flex-1', className)}>
      {children}
    </SafeAreaView>
  );
};

interface ExpandingSafeAreaViewProps {
  className?: string;
  children?: React.ReactNode;
}

export { ExpandingSafeAreaView };
