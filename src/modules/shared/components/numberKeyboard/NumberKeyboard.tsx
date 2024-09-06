import React from 'react';
import { View } from 'react-native';
import classNames from 'classnames';
import DeleteIcon from '~shared/assets/svgs/delete-icon.svg';

import { PassButton } from '../passButton/PassButton';
import { PassText } from '../passText/PassText';

type KeyData = (typeof keys)[0][0];

const keys = [
  [
    { value: 1, displayText: '1' },
    { value: 2, displayText: '2' },
    { value: 3, displayText: '3' },
  ],
  [
    { value: 4, displayText: '4' },
    { value: 5, displayText: '5' },
    { value: 6, displayText: '6' },
  ],
  [
    { value: 7, displayText: '7' },
    { value: 8, displayText: '8' },
    { value: 9, displayText: '9' },
  ],
  [
    { value: '.', displayText: '.' },
    { value: 0, displayText: '0' },
    { value: '08', displayText: <DeleteIcon className="text-black" /> },
  ],
];

export function NumberKeyboard({
  className,
  onChange,
  value = '0',
}: NumberKeyboardProps) {
  const handleOnPressKey = (keyValue: KeyData) => {
    let newValue = value;
    if (newValue.includes('.') && keyValue.value === '.') return;

    if (keyValue.value === '08' && value?.length) {
      newValue = newValue.replace(/[\d.]$/g, '');

      if (newValue.length === 0) newValue = '0';
    } else if (keyValue.value !== '08') {
      newValue =
        newValue === '0' && keyValue.value !== '.'
          ? keyValue.value.toString()
          : `${newValue}${keyValue.value}`;
    }

    onChange?.({ character: keyValue, value: newValue });
  };

  return (
    <View className={classNames('w-full gap-y-4', className)}>
      {keys.map((rowValue, index) => (
        <View key={index} className="w-full flex-row justify-between gap-x-1">
          {rowValue.map((key, keyIndex) => (
            <PassButton
              className="flex-1"
              key={keyIndex}
              onPress={() => handleOnPressKey(key)}
            >
              <View className="w-full items-center justify-center">
                {typeof key.displayText === 'string' ? (
                  <PassText className="text-virtualKeyboard">
                    {key.displayText}
                  </PassText>
                ) : (
                  key.displayText
                )}
              </View>
            </PassButton>
          ))}
        </View>
      ))}
    </View>
  );
}

interface NumberKeyboardProps {
  className?: string;
  value?: string;
  onChange?: (arg: { character: KeyData; value: string }) => void;
}
