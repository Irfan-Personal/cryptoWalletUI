import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuItemRow } from '~account/components/menuItemRow/MenuItemRow';
import { ProfileDetails } from '~account/components/profileDetails/ProfileDetails';
import { getMenuItems } from '~account/utils/menu';

type Props = {
  address: string;
};

export function ProfileScreen({ address }: Props) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const menuItems = getMenuItems(navigation, t);

  return (
    <View className="p-5">
      <ProfileDetails address={address} />
      <FlatList
        className="py-5"
        data={menuItems}
        renderItem={({ item }) => (
          <MenuItemRow titleClassName="text-sm" {...item} />
        )}
      />
    </View>
  );
}
