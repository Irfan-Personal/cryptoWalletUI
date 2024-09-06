import * as React from 'react';
import { Alert, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import classNames from 'classnames';
import CopyIcon from '~shared/assets/svgs/copy.svg';

import { PassButton, PassButtonProps } from '../passButton/PassButton';

interface CopyToClipboardProps {
  textToCopy: string;
  children: React.ReactNode;
  showIcon?: boolean;
  isButton?: boolean;
}

const CopyToClipboard: React.FC<
  CopyToClipboardProps & (TouchableOpacityProps | PassButtonProps)
> = ({
  className,
  children,
  showIcon = true,
  textToCopy,
  isButton,
  ...props
}) => {
  const copyToClipboard = () => {
    Clipboard.setString(textToCopy);
    Alert.alert('Copied', 'Copied to clipboard');
  };

  if (!isButton) {
    return (
      <TouchableOpacity
        {...props}
        onPress={copyToClipboard}
        className={classNames('flex flex-row items-center', className)}
      >
        {children}
        {showIcon && <CopyIcon className="ml-2" />}
      </TouchableOpacity>
    );
  }

  return (
    <PassButton onPress={copyToClipboard} className={className} {...props}>
      {showIcon && (
        <CopyIcon width={22} height={20} className=" bg-black text-white" />
      )}
      {children}
    </PassButton>
  );
};

export default CopyToClipboard;
