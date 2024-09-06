import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isSupported } from '@turnkey/react-native-passkey-stamper';
import classNames from 'classnames';
import { requestRegisterPasskey } from '~authentication/connectivity/registerPasskey/requestRegisterPasskey';
import { createPassKey } from '~authentication/libs/passkey/passkey';
import Icon1 from '~shared/assets/svgs/1.svg';
import Icon2 from '~shared/assets/svgs/2.svg';
import Icon3 from '~shared/assets/svgs/3.svg';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';
import { RootScreens } from '~src/layouts/RootNavigation';
import { PageWrapper } from '~src/modules/shared/components/pageWrapper/PageWrapper';
import { useFirebaseUserData } from '~src/modules/shared/utils/firebase/useFirebaseUserData';

export function EnablePasskeyPage() {
  const { t } = useTranslation();
  const { user } = useFirebaseUserData();
  const navigation = useNavigation<Navigation>();

  async function handleCreatePasskey() {
    if (!isSupported()) {
      return Alert.alert(
        'Passkey is not supported',
        'Passkeys are not supported on this device'
      );
    }

    if (user) {
      try {
        const { attestation, challenge } = await createPassKey({
          userId: user.uid,
          displayName:
            user.email ||
            user.displayName ||
            t('authentication.enablePasskey.passkeyName'),
          name:
            user.email ||
            user.displayName ||
            t('authentication.enablePasskey.passkeyName'),
        });

        await requestRegisterPasskey({
          attestation,
          challenge,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: RootScreens.TabNavigation }],
        });
      } catch (error) {
        const errorMessage = error?.data?.message;
        errorMessage && alert(errorMessage);
      }
    }
  }

  const steps = [
    { text: 'authentication.enablePasskey.stepOne', Icon: Icon1 },
    { text: 'authentication.enablePasskey.stepTwo', Icon: Icon2 },
    { text: 'authentication.enablePasskey.stepThree', Icon: Icon3 },
  ];

  return (
    <PageWrapper className="px-4">
      <PassText
        className={classNames(
          'mt-2 text-center text-2xl font-bold text-headingText'
        )}
      >
        {t('authentication.enablePasskey.title')}
      </PassText>
      {steps.map(({ text, Icon }) => {
        return (
          <View key={text} className="mt-10 flex flex-row">
            <Icon />
            <PassText className="ml-4 flex-1 text-lg">{t(text)}</PassText>
          </View>
        );
      })}
      <PassButton
        variant="outlined"
        className={'mt-auto w-full'}
        onPress={handleCreatePasskey}
      >
        <PassText className="text-base font-bold text-primary">
          {t('authentication.enablePasskey.buttonEnable')}
        </PassText>
      </PassButton>
    </PageWrapper>
  );
}
