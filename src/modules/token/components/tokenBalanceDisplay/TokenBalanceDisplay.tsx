import React from 'react';
import { ExpandingView } from '~shared/components/expandingView/ExpandingView';
import { PassText } from '~shared/components/passText/PassText';

export function TokenBalanceDisplay() {
  return (
    <ExpandingView className="bg-white">
      <PassText>tokenBalanceDisplay</PassText>
    </ExpandingView>
  );
}
