import React from 'react';
import { View } from 'react-native';
import classNames from 'classnames';

const ExpandingView = ({ className, children }: ExpandingViewProps) => {
  return <View className={classNames('flex-1', className)}>{children}</View>;
};

interface ExpandingViewProps {
  className?: string;
  children?: React.ReactNode;
}

export { ExpandingView };
