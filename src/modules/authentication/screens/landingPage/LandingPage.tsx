import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { Link } from '@react-navigation/native';
import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo';
import { AppleSignInButton } from '~authentication/components/appleSignInButton/AppleSignInButton';
import { GoogleSignInButton } from '~authentication/components/googleSignInButton/GoogleSignInButton';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';
import { PageWrapper } from '~src/modules/shared/components/pageWrapper/PageWrapper';

import { useLandingPage } from './landingPage.controller';

export function LandingPage() {
  const { t } = useTranslation();
  const {
    initiateEmailAuth,
    initiateGoggleSignIn,
    initiateAppleLogin,
    isAuthenticating,
  } = useLandingPage();

  const handleAppleLogin = async () => {
    try {
      await initiateAppleLogin();
    } catch (error) {
      console.log('Apple login failed error', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await initiateGoggleSignIn();
    } catch (error) {
      console.log('Google login failed error', error);
    }
  };

  return (
    <PageWrapper className="flex-column mx-6 flex h-full items-center justify-end gap-y-[10px]">
      <PassText className="mb-[71px] text-[30px] font-bold text-headingText">
        {t('Welcome to Pass')}
      </PassText>
      {appleAuth.isSupported && (
        <AppleSignInButton
          isLoading={isAuthenticating}
          onPress={handleAppleLogin}
        />
      )}
      <GoogleSignInButton
        isLoading={isAuthenticating}
        onPress={handleGoogleLogin}
      />
      <PassButton onPress={initiateEmailAuth}>
        <PassText className="text-base font-bold text-primary">
          {t('Continue with email')}
        </PassText>
      </PassButton>
      <View className="mb-8 mt-6 w-full">
        <PassText className="text-sm text-primary">
          {t('By continuing you agree to the Pass')}{' '}
          <Link
            className="font-bold text-primary underline "
            to={{ screen: 'LandingPage' } as To}
          >
            {t('Terms of Service and Privacy Policy.')}
          </Link>
        </PassText>
      </View>
    </PageWrapper>
  );
}
