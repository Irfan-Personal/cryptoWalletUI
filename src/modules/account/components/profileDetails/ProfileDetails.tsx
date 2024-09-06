import React from 'react';
import { View } from 'react-native';
import CopyToClipboard from '~shared/components/copyToClipboard/CopyToClipboard';
import { PassText } from '~shared/components/passText/PassText';
import { shortenText } from '~shared/utils/helpers/address';

type Props = {
  address: string;
};

export function ProfileDetails({ address }: Props) {
  return (
    <View className="flex flex-row items-center">
      <View className="h-16 w-16 rounded-full bg-lightBlue"></View>
      <CopyToClipboard textToCopy={address} className="ml-2">
        <PassText>{shortenText(address)}</PassText>
      </CopyToClipboard>
    </View>
  );
}
