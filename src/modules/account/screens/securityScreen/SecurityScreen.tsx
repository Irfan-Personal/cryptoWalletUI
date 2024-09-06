import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuItemRow } from '~account/components/menuItemRow/MenuItemRow';
import CheckIcon from '~shared/assets/svgs/checkmarkFilled.svg';
import ShieldFilledIcon from '~shared/assets/svgs/shieldFilled.svg';
import WarningIcon from '~shared/assets/svgs/warningIcon.svg';
import { PageWrapper } from '~shared/components/pageWrapper/PageWrapper';
import { useBiometrics } from '~shared/hooks/useBiometrics';
import { ProfileScreens } from '~src/layouts/ProfileNavigation';
import { RecoveryScreens } from '~src/layouts/RecoveryNavigation';

export function SecurityScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Navigation>();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  // TODO: Replace below constant with a check of recovery status
  const isRecoveryEnabled = true;
  const { biometricType, isBiometricsSupported } = useBiometrics();

  const handleEnableRecovery = () => {
    navigation.navigate(ProfileScreens.ManageRecoveryFlow, {
      screen: RecoveryScreens.EnableRecoveryScreen,
    });
  };

  return (
    <PageWrapper
      hasHeader
      className="bg-white"
      headingProps={{
        title: t('account.security.title'),
        className: 'bg-white',
      }}
    >
      <View className="flex-1 px-5 py-4">
        <MenuItemRow
          titleClassName="text-sm"
          title={t('account.security.menuItems.enableRecovery')}
          onPress={handleEnableRecovery}
          rightComponent={
            isRecoveryEnabled ? <ShieldFilledIcon /> : <WarningIcon />
          }
        />
        <MenuItemRow
          hideCaret
          titleClassName="text-sm"
          title={t('account.security.menuItems.signWithPasskey')}
          rightComponent={<CheckIcon />}
        />
        {isBiometricsSupported && (
          <MenuItemRow
            titleClassName="text-sm"
            title={t('account.security.menuItems.unlockWithBiometrics', {
              biometricType,
            })}
            rightComponent={
              <Switch value={isSwitchOn} onValueChange={setIsSwitchOn} />
            }
          />
        )}
      </View>
    </PageWrapper>
  );
}
