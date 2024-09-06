import React, { ReactNode } from 'react';
import { Text, View, ViewProps } from 'react-native';
import classNames from 'classnames';

interface InfoItemProps extends ViewProps {
  icon: ReactNode;
  children: ReactNode;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <View
      className={classNames(
        'border-1 bg-cardSurface border-cardBorder flex-row items-center gap-2 rounded-md border-2 p-2',
        className
      )}
      {...props}
    >
      <View>{icon}</View>
      <Text className="flex-1 text-base text-gray-700">{children}</Text>
    </View>
  );
};
