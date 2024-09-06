import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import classNames from 'classnames';

export const buttonVariantMap = {
  outlined: 'border-primary border border-solid',
  filled: 'bg-primary',
  default: '',
};

export function PassButton({
  children,
  variant = 'default',
  className,
  isLoading,
  ...rest
}: PassButtonProps) {
  const isDisabledOrLoading = isLoading || rest.disabled;

  return (
    <TouchableOpacity
      className={classNames(
        'flex flex-row justify-center rounded-[10px] p-3',
        buttonVariantMap[variant],
        { ['!bg-disabledButton']: rest.disabled },
        className
      )}
      {...rest}
      disabled={isDisabledOrLoading}
    >
      {isLoading && <ActivityIndicator className="mr-3" />}
      {children}
    </TouchableOpacity>
  );
}

export interface PassButtonProps extends TouchableOpacityProps {
  variant?: 'outlined' | 'filled' | 'default';
  isLoading?: boolean;
  isDisabled?: boolean;
}
