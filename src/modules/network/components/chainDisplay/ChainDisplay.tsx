import React from 'react';
import { Image, TextProps, View } from 'react-native';
import classNames from 'classnames';
import { PassText } from '~shared/components/passText/PassText';
import { BlockchainNetwork } from '~shared/connectivity/network/network.d';

export function ChainDisplay({
  chain,
  className,
  iconOnly,
}: ChainDisplayProps) {
  const { name, networkIconUrl } = chain;

  return (
    <View className="flex-row items-center gap-x-2">
      <View
        className={classNames(
          'h-6 w-6 items-center justify-center rounded-full',
          className
        )}
      >
        {networkIconUrl ? (
          <Image
            className="h-full w-full rounded-full"
            source={{
              uri: networkIconUrl,
            }}
          />
        ) : (
          <PassText className="text-[6px] font-extrabold text-white">
            {name[0]}
          </PassText>
        )}
      </View>
      {!iconOnly && <PassText>{name}</PassText>}
    </View>
  );
}

interface ChainDisplayProps extends TextProps {
  chain: BlockchainNetwork;
  className?: string;
  iconOnly?: boolean;
}
