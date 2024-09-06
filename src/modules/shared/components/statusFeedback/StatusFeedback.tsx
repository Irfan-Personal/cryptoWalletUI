import React from 'react';
import { View } from 'react-native';
import CheckMarkIcon from '~shared/assets/svgs/checkmark.svg';
import { PassText } from '~shared/components/passText/PassText';

import { PassButton } from '../passButton/PassButton';

export function StatusFeedback({
  illustration,
  title,
  subTitle,
  actionButton,
  status,
}: StatusFeedbackProps) {
  const IllustrationToRender = () => {
    if (illustration) return illustration;

    if (status === 'success') {
      return (
        <View className="mt-[30%] h-[60px] w-[60px] items-center justify-center rounded-full bg-successIllustration">
          <CheckMarkIcon className="color-white" />
        </View>
      );
    }

    return null;
  };

  return (
    <View className="w-full items-center justify-center">
      <IllustrationToRender />
      <PassText className="mb-3 mt-5 text-[32px] font-bold">{title}</PassText>
      <PassText className="mb-8 text-lg">{subTitle}</PassText>
      {actionButton && (
        <PassButton
          variant="filled"
          className="w-full p-4"
          onPress={actionButton?.onPress}
        >
          <PassText className="font-bold color-white">
            {actionButton?.text || 'Done'}
          </PassText>
        </PassButton>
      )}
    </View>
  );
}

interface StatusFeedbackProps {
  illustration?: React.JSX.Element;
  title?: string;
  subTitle?: string | React.JSX.Element;
  status?: 'success' | 'failed';
  actionButton?: {
    text?: string;
    onPress?: () => void;
  };
}
