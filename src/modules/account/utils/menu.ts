import { NavigationProp } from '@react-navigation/native';
import { TFunction } from 'i18next';
import { useCommonStore } from '~shared/state/common/store';
import { ProfileScreens } from '~src/layouts/ProfileNavigation';
import { RootScreens } from '~src/layouts/RootNavigation';

export const getMenuItems = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  t: TFunction<'translation', undefined>
): MenuItem[] => {
  const signOut = () => {
    const store = useCommonStore.getState();
    store.reset();
    navigation.reset({
      index: 0,
      routes: [{ name: RootScreens.LandingPage }],
    });
  };

  const menuItems: MenuItem[] = [
    {
      title: t('account.profile.menuItems.web3Browser'),
    },
    {
      title: t('account.profile.menuItems.contacts'),
    },
    {
      title: t('account.profile.menuItems.settings'),
    },
    {
      title: t('account.profile.menuItems.walletConnect'),
    },
    {
      title: t('account.profile.menuItems.security'),
      route: ProfileScreens.SecurityScreen,
    },
    {
      title: t('account.profile.menuItems.passpay'),
    },
    {
      title: t('account.profile.menuItems.signOut'),
      onPress: signOut,
    },
  ];

  return menuItems;
};
