import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { openInbox } from 'react-native-email-link';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';
import { useCommonStore } from '~shared/state/common/store';
import { RootScreens } from '~src/layouts/RootNavigation';

import { useLandingPage } from '../landingPage/landingPage.controller';

export function EmailConfirmation({ route }) {
  const { t } = useTranslation();
  const navigation = useNavigation<Navigation>();
  const { completeEmailSignin } = useLandingPage();
  const link = route.params?.link;

  const handleInitialURL = async (url: string) => {
    try {
      if (auth().isSignInWithEmailLink(url)) {
        const store = useCommonStore.getState();
        if (store.email) {
          await completeEmailSignin(store.email, url);
          navigation.navigate(RootScreens.EnablePasskeyPage);
        }
      }
    } catch (error) {
      // TODO: Handle error gracefully here
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleInitialURL(link);
  }, [link]);

  const openMailApp = () => {
    openInbox();
  };

  return (
    <View className="px-[24px]">
      <View className="flex h-full flex-col items-center justify-center">
        <PassText className="text-lg font-bold">
          {t('Check your Mail')}
        </PassText>
        <PassText className="mt-5 w-[80%] text-center text-sm font-normal">
          {t(
            'We sent an activation link to the mail you provided. Please be sure to check your spam folder as well.'
          )}
        </PassText>
        <PassButton variant="outlined" className="mt-6" onPress={openMailApp}>
          <PassText className="font-bold">{t('Take me to my mail')}</PassText>
        </PassButton>
      </View>
    </View>
  );
}
