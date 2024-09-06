import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import classNames from 'classnames';
import {
  Heading,
  HeadingProps,
} from '~src/modules/shared/components/heading/Heading';

export function PageWrapper({
  hasHeader,
  className,
  children,
  headingProps,
}: SafeAreaViewProps & PageWrapperProps) {
  return (
    <SafeAreaView className="flex h-full w-full flex-col bg-white">
      {hasHeader && <Heading backButtonText="Back" {...headingProps} />}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName={classNames(
          'flex flex-1 flex-grow',
          className
        )}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

interface PageWrapperProps {
  className?: string;
  hasHeader?: boolean;
  headingProps?: HeadingProps;
}
