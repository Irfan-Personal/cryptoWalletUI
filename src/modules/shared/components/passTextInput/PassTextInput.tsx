import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { PassText } from '~shared/components/passText/PassText';

interface TextInputFieldProp {
  label?: string;
}

export default function PassTextInput({
  label,
  ...rest
}: TextInputProps & TextInputFieldProp) {
  return (
    <View>
      <PassText className="text mb-2 text-[14px] font-normal">{label}</PassText>
      <TextInput
        {...rest}
        className="w-full rounded-[10px] border border-solid border-borderColor px-3 py-4 text-headingText"
      />
    </View>
  );
}
