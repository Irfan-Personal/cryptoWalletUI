import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { HomeScreens } from './HomeNavigation';
import { ProfileScreens } from './ProfileNavigation';
import { RecoveryScreens } from './RecoveryNavigation';
import { RootScreens } from './RootNavigation';
import { TransactionNavigationParamList } from './TransactionNavigation';

type MyNavigationParamList = {
  [RootScreens.TabNavigation]: undefined;
  [RootScreens.EmailAuthenticationFlow]: {
    screen: EmailAuthenticationScreens;
  };
  [RootScreens.EnablePasskeyPage]: undefined;
  [RootScreens.ReceiveScreen]: undefined;
  [HomeScreens.TokenDetails]: { token: Token };
  [HomeScreens.Home]: undefined;
  [HomeScreens.Send]: undefined;
  [HomeScreens.Receive]: undefined;
  [HomeScreens.SendSuccess]: undefined;
  [ProfileScreens.ManageRecoveryFlow]: { screen: RecoveryScreens };
};

declare global {
  interface TransactionStack
    extends NavigationProp<TransactionNavigationParamList> {}

  interface Navigation extends NavigationProp<MyNavigationParamList> {}

  interface StackNavigation<T> {
    name: T;
    component: React.FC;
    options?: NativeStackNavigationOptions;
  }
}
