import React from 'react';
import { Image, View } from 'react-native';
import classNames from 'classnames';
import { PassText } from '~shared/components/passText/PassText';
import { BlockchainNetwork } from '~shared/connectivity/network/network.d';
import { Token } from '~token/connectivity/token/token';

export function TokenIcon({ className, networks = [], token }: TokenIconProps) {
  const { iconUrl, name } = token;

  return (
    <View className={classNames(className, 'h-14 w-14')}>
      <View className="h-full w-full items-center justify-center rounded-full bg-borderColor">
        {iconUrl ? (
          <Image
            className="h-full w-full rounded-full"
            source={{ uri: iconUrl }}
          />
        ) : (
          <PassText className="f text-2xl font-bold">{name?.[0]}</PassText>
        )}
      </View>
      {networks[0] && (
        <View className="absolute bottom-0 right-0 h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary">
          {networks[0].networkIconUrl ? (
            <Image
              className="h-full w-full rounded-full"
              source={{
                uri: networks[0].networkIconUrl,
              }}
            />
          ) : (
            <PassText className="text-[6px] font-extrabold text-white">
              {networks[0]?.name?.[0]}
            </PassText>
          )}
        </View>
      )}
      {networks.length > 1 && (
        <View className="absolute bottom-0 right-[-10px] h-5 w-5 items-center justify-center rounded-full bg-borderColor">
          <PassText className="text-[10px] font-normal text-black">+1</PassText>
        </View>
      )}
    </View>
  );
}

interface TokenIconProps {
  className?: string;
  networks: Array<BlockchainNetwork>;
  token: Token;
}
