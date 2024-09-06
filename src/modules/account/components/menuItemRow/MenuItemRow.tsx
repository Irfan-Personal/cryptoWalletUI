import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import classNames from 'classnames';
import RightArrow from '~shared/assets/svgs/rightArrow.svg';
import { PassText } from '~shared/components/passText/PassText';

export function MenuItemRow({
  route,
  title,
  onPress,
  hideCaret = false,
  rightComponent: RightComponent,
  titleClassName,
}: MenuItem & {
  rightComponent?: React.ReactNode;
}) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (route) {
      return navigation.navigate(route);
    }
    onPress?.();
  };

  return (
    <TouchableOpacity
      className="my-2 flex w-full flex-row items-center gap-x-3"
      onPress={handlePress}
    >
      <View className="h-10 w-10 rounded-full bg-lightBlue" />
      <View className="flex flex-1 flex-row items-center justify-between border-b border-borderColor py-5">
        <PassText
          className={classNames('text-lg font-semibold', titleClassName)}
        >
          {title}
        </PassText>
        <View className="flex-row items-center gap-3">
          {RightComponent}
          {!hideCaret && <RightArrow />}
        </View>
      </View>
    </TouchableOpacity>
  );
}
