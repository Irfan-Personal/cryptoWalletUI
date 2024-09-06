import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import classNames from 'classnames';
import GoogleIcon from '~shared/assets/svgs/googleIcon.svg';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';

export function GoogleSignInButton({
  isLoading,
  isDisabled,
  ...rest
}: GoogleSignInButtonProps) {
  const isDisabledOrLoading = isLoading || isDisabled;

  return (
    <PassButton
      disabled={isDisabledOrLoading}
      variant="outlined"
      className={classNames('w-full gap-x-3', {
        ['opacity-10']: isDisabledOrLoading,
      })}
      {...rest}
    >
      <GoogleIcon />
      <PassText className="text-base font-bold text-primary">
        Continue with Google
      </PassText>
    </PassButton>
  );
}

export interface GoogleSignInButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
  isDisabled?: boolean;
}
