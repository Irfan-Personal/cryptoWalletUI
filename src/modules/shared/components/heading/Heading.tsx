import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import classNames from 'classnames';
import LeftArrow from '~shared/assets/svgs/leftArrow.svg';
import { PassText } from '~shared/components/passText/PassText';

import { PassButton } from '../passButton/PassButton';

export function Heading({
  backButtonText,
  onGoBack,
  isModal,
  onClose,
  hideBackButton,
  title,
  className,
}: HeadingProps) {
  const { goBack } = useNavigation<Navigation>();

  if (isModal) {
    return (
      <View className={classNames('p-3', className)}>
        <View className="flex-row items-center justify-between text-base">
          {!hideBackButton ? (
            <PassButton onPress={onGoBack ? onGoBack : goBack}>
              <LeftArrow />
              <PassText className="text-base">{backButtonText}</PassText>
            </PassButton>
          ) : (
            <View />
          )}
          <PassText className="text-lg font-bold color-black">{title}</PassText>
          <TouchableOpacity
            className="h-7 w-7 items-center justify-center rounded-full bg-unfocusedTabColor"
            onPress={onClose}
          >
            <PassText className="text-base text-white">✕</PassText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      className={classNames('flex flex-row items-center pl-6 pr-6', className)}
    >
      <TouchableOpacity
        onPress={onGoBack ? onGoBack : goBack}
        className="flex-1 flex-row items-center gap-x-[6px] text-base"
      >
        <LeftArrow />
        <PassText className="text-base">{backButtonText}</PassText>
      </TouchableOpacity>
      <PassText className="flex-3 text-center text-lg font-bold color-black">
        {title}
      </PassText>
      <View className="flex-1" />
    </View>
  );
}

export interface HeadingProps {
  backButtonText?: string;
  title?: string;
  onGoBack?: () => void;
  onClose?: () => void;
  isModal?: boolean;
  hideBackButton?: boolean;
  className?: string;
}
