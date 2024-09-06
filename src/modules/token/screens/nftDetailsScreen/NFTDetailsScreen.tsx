import React from 'react';
import { PassText } from '~shared/components/passText/PassText';
import { ExpandingSafeAreaView } from '~src/modules/shared/components/expandingSafeAreaView/ExpandingSafeAreaView';

export function NFTDetailsScreen() {
  return (
    <ExpandingSafeAreaView className="bg-white">
      <PassText>TokenDetailsScreen</PassText>
    </ExpandingSafeAreaView>
  );
}
