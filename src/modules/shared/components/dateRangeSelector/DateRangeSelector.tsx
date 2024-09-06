import React from 'react';
import { View } from 'react-native';
import classNames from 'classnames';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';

function DateRangeSelector<T>({
  className,
  durations,
  setSelectedDuration,
  selectedDuration,
}: DateRangeSelectorProps<T>) {
  return (
    <View className={classNames('w-full flex-row justify-between', className)}>
      {durations.map((duration) => (
        <PassButton
          key={duration.name}
          variant="outlined"
          onPress={() => setSelectedDuration(duration)}
          className={classNames('mt-10 w-[60px] border-borderColor', {
            ['bg-primary']: duration.value === selectedDuration.value,
          })}
        >
          <PassText
            className={classNames('font-semibold', {
              ['color-white']: duration.value === selectedDuration.value,
            })}
          >
            {duration.name}
          </PassText>
        </PassButton>
      ))}
    </View>
  );
}

interface DateRangeSelectorProps<T> {
  className?: string;
  setSelectedDuration: (duration: Duration<T>) => void;
  durations: Duration<T>[];
  selectedDuration: Duration<T>;
}

interface Duration<T = string> {
  name: string;
  value: T;
}

export { DateRangeSelector };
