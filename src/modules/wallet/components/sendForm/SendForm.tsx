import React from 'react';
import classNames from 'classnames';
import { ExpandingView } from '~shared/components/expandingView/ExpandingView';
import { PassText } from '~shared/components/passText/PassText';

export function SendForm({ className }: SendFormProps) {
  return (
    <ExpandingView
      className={classNames(
        className,
        'flex w-full flex-row items-center gap-x-3'
      )}
    >
      <PassText>TransactionRow</PassText>
    </ExpandingView>
  );
}

interface SendFormProps {
  className: string;
}
