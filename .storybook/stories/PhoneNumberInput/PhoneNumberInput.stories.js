import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PhoneNumberInput } from '../../../src/modules/shared/components/phoneNumberInput/PhoneNumberInput';

export const Empty = {
  args: {},
};

export const CodeFilled = {
  args: {
    code: '+89',
  },
};

export const phoneNumberFilled = {
  args: {
    phoneNumber: '001000002',
  },
};

export const fullPhoneNumberFilled = {
  args: {
    code: '+89',
    phoneNumber: '001000002',
  },
};

const PhoneNumberInputMeta = {
  title: 'PhoneNumberInput',
  component: PhoneNumberInput,
  argTypes: {
    code: '+89',
    phoneNumber: '001000002',
  },
  decorators: [
    (Story) => (
      <View style={decoratorStyleSheet.wrapper}>
        <Story />
      </View>
    ),
  ],
};

const decoratorStyleSheet = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default PhoneNumberInputMeta;
