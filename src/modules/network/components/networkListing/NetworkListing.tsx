import React from 'react';
import { View } from 'react-native';
import classNames from 'classnames';
import { PassText } from '~shared/components/passText/PassText';

export function NetworkListing({ className }: NetworkListingProps) {
  return (
    <View className={classNames('flex', className)}>
      <PassText className="text-[6px] font-extrabold text-white">
        NetworkListing
      </PassText>
    </View>
  );
}

interface NetworkListingProps {
  className?: string;
}
