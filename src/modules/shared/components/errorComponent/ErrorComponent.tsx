import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { PassButton } from '../passButton/PassButton';
import { PassText } from '../passText/PassText';

type AlertProps = {
  errorMessage?: string;
  onRetry: () => void;
};

const ErrorComponent = ({ errorMessage, onRetry }: AlertProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <PassText>
        {errorMessage ? errorMessage : t('shared.genericError')}
      </PassText>
      <PassButton onPress={onRetry}>
        <PassText>{t('shared.retry')}</PassText>
      </PassButton>
    </View>
  );
};

export default ErrorComponent;
