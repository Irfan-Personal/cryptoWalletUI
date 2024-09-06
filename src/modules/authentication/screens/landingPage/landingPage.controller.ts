import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile } from '~account/connectivity/userProfile/useUserProfile';
import { requestAccessRefreshToken } from '~authentication/connectivity/accessRefreshToken/requestAccessRefreshToken';
import { EmailAuthenticationScreens } from '~src/layouts/EmailAuthenticationFlow';
import { RootScreens } from '~src/layouts/RootNavigation';
import { useCommonStore } from '~src/modules/shared/state/common/store';
import {
  appleSignIn,
  emailSignIn,
  googleSignIn,
} from '~src/modules/shared/utils/firebase/auth';

export function useLandingPage() {
  const navigation = useNavigation<Navigation>();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const userProfileQuery = useUserProfile({
    isEnabled: false,
  });

  const navigateNextScreen = async () => {
    try {
      const userProfileResponse = await userProfileQuery.refetch();
      const userProfile = userProfileResponse.data?.data;
      if (!userProfile || !userProfile?.isPasskeyRegistered) {
        navigation.navigate(RootScreens.EnablePasskeyPage);
      } else {
        navigation.navigate(RootScreens.TabNavigation);
      }
    } catch (error) {
      console.error('Some error occured');
    }
  };

  const initiateEmailAuth = () => {
    navigation.navigate(RootScreens.EmailAuthenticationFlow, {
      screen: EmailAuthenticationScreens.EmailAuthenticationPage,
    });
  };

  const initiateAppleLogin = async () => {
    try {
      setIsAuthenticating(true);
      const { idToken } = await appleSignIn();
      const { data } = await requestAccessRefreshToken(idToken);
      const store = useCommonStore.getState();
      store.setAuthTokens(data);
      navigateNextScreen();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const initiateGoggleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      const { idToken } = await googleSignIn();

      const { data } = await requestAccessRefreshToken(idToken);
      const store = useCommonStore.getState();
      store.setAuthTokens(data);
      navigateNextScreen();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const completeEmailSignin = async (email: string, link: string) => {
    try {
      const { idToken } = await emailSignIn(email, link);
      const { data } = await requestAccessRefreshToken(idToken);
      const store = useCommonStore.getState();
      store.setAuthTokens(data);
    } catch (error) {
      console.error('Error signing in with email link', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    initiateEmailAuth,
    initiateGoggleSignIn,
    initiateAppleLogin,
    isAuthenticating,
    completeEmailSignin,
  };
}
