import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';
import PassTextInput from '~shared/components/passTextInput/PassTextInput';
import { PageWrapper } from '~src/modules/shared/components/pageWrapper/PageWrapper';

import { useEmailAuthentication } from './EmailAuthentication.controller';

export function EmailAuthenticationPage() {
  const { t } = useTranslation();
  const { form, onGenerateMagicLink } = useEmailAuthentication();

  const { handleSubmit, formState, control } = form;
  const { errors } = formState;

  return (
    <PageWrapper hasHeader>
      <View className="mx-6 h-full py-6">
        <View className="flex flex-grow flex-col">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <PassTextInput
                autoCorrect
                autoComplete="email"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter email address"
                label={t('Email')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {!!errors.email && (
            <PassText className="text-xs color-error">
              {errors.email.message}
            </PassText>
          )}
        </View>
        <PassButton
          onPress={handleSubmit(onGenerateMagicLink)}
          disabled={!!formState.errors.email}
          variant="filled"
        >
          <PassText className="p-1 font-bold text-white">
            {t('Continue')}
          </PassText>
        </PassButton>
      </View>
    </PageWrapper>
  );
}
