import React, { ReactNode } from 'react';
import { View } from 'react-native';
import classNames from 'classnames';

import { PassText } from '../passText/PassText';

type Props = {
  title: string;
  value: string | number;
  valueClassName?: string;
  className?: string;
  valueRenderer?: (value: string | number) => ReactNode;
};

const KeyValueItemRow = ({
  title,
  value,
  className,
  valueClassName,
  valueRenderer,
}: Props) => {
  return (
    <View className={classNames('mb-4 flex-row justify-between', className)}>
      <PassText className="text-md color-textUnfocused">{title}:</PassText>
      {valueRenderer ? (
        valueRenderer(value)
      ) : (
        <PassText className={`text-md color-headingText ${valueClassName}`}>
          {value}
        </PassText>
      )}
    </View>
  );
};

export default React.memo(KeyValueItemRow);
