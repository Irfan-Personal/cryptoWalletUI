import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import classNames from 'classnames';
import i18next from 'i18next';
import ActivityIcon from '~shared/assets/svgs/activityIcon.svg';
import HomeIcon from '~shared/assets/svgs/homeIcon.svg';
import ProfileIcon from '~shared/assets/svgs/profileIcon.svg';
import HomeNavigation from '~src/layouts/HomeNavigation';
import TransactionNavigation from '~src/layouts/TransactionNavigation';

import ProfileNavigation from './ProfileNavigation';

const Tab = createBottomTabNavigator();

const composeIconClassName = (focused: boolean) =>
  classNames({
    'text-primary': focused,
    'text-unfocusedTabColor': !focused,
  });

const dashboardTabs = [
  {
    name: 'HomeNavigation',
    label: i18next.t('Home'),
    component: HomeNavigation,
    icon: ({ focused }) => (
      <HomeIcon className={composeIconClassName(focused)} />
    ),
  },
  {
    name: 'Activity',
    label: i18next.t('Activity'),
    component: TransactionNavigation,
    icon: ({ focused }) => (
      <ActivityIcon className={composeIconClassName(focused)} />
    ),
  },
  {
    name: 'Profile',
    label: i18next.t('Profile'),
    component: ProfileNavigation,
    icon: ({ focused }) => (
      <ProfileIcon className={composeIconClassName(focused)} />
    ),
  },
] as Array<Tab>;

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#344966' }}>
      {dashboardTabs.map(({ name, label, icon, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{ headerShown: false, tabBarLabel: label, tabBarIcon: icon }}
        />
      ))}
    </Tab.Navigator>
  );
}

interface TabIconType {
  focused: boolean;
  color: string;
  size: number;
}

interface Tab {
  name: string;
  label: string;
  component: React.FC;
  icon: (arg: TabIconType) => React.JSX.Element;
}
