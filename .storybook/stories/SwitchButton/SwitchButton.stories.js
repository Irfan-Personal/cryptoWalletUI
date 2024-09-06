import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PassSwitch } from '../../../src/modules/shared/components/passSwitch/PassSwitch';

export const SwitchButtonOn = {
  args: {
    isEnabled: true,
  },
};

export const SwitchButtonOff = {
  args: {
    isEnabled: false,
  },
};

const SwitchButtonMeta = {
  title: 'SwitchButton',
  component: PassSwitch,
  argTypes: {
    onValueChange: { action: 'toggle the button' },
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
  wrapper: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});

export default SwitchButtonMeta;
