import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import classNames from 'classnames';
import AppleIcon from '~shared/assets/svgs/appleIcon.svg';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';

export function AppleSignInButton({
  isLoading,
  isDisabled,
  ...rest
}: AppleSignInButtonProps) {
  const isDisabledOrLoading = isLoading || isDisabled;

  return (
    <PassButton
      disabled={isDisabledOrLoading}
      variant="filled"
      className={classNames('w-full items-center gap-x-3', {
        ['opacity-10']: isDisabledOrLoading,
      })}
      {...rest}
    >
      <AppleIcon />
      <PassText className="text-base font-bold text-white ">
        Continue with Apple
      </PassText>
    </PassButton>
  );
}

export interface AppleSignInButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  isDisabled?: boolean;
}
