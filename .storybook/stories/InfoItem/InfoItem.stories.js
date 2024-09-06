import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoItem } from '../../../src/modules/shared/components/infoItem/InfoItem';
import { PassText } from '../../../src/modules/shared/components/passText/PassText';
import InfoIcon from '../../../src/modules/shared/assets/svgs/infoIcon.svg';

export const Default = {
  args: {
    icon: <InfoIcon />,
    children: <PassText>
      You can add <PassText className="font-bold">4</PassText> more phone
      numbers to your
    </PassText>
  },
};

const InfoItemStory = {
  title: 'InfoItem',
  component: InfoItem,
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

export default InfoItemStory;
