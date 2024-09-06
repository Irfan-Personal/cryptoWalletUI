import React from 'react';
import { ActivityIndicator } from 'react-native';

import DefaultErrorComponent from '../errorComponent/ErrorComponent';

interface RenderProps<T> {
  loading: boolean;
  isDataEmpty?: boolean;
  hasError: boolean;
  errorMessage?: string;
  fallback?: React.ComponentType;
  data?: T;
  RenderComponent: React.ComponentType<T>;
  NoDataRenderComponent?: React.ComponentType;
  CustomErrorComponent?: React.ComponentType<{
    onRetry: () => void;
    errorMessage?: string;
  }>;
  onRetry: () => void;
}

export const DataRenderer = <T,>({
  fallback: Fallback = ActivityIndicator,
  loading,
  hasError,
  isDataEmpty = false,
  errorMessage,
  data,
  RenderComponent,
  NoDataRenderComponent,
  CustomErrorComponent = DefaultErrorComponent,
  onRetry,
}: RenderProps<T>) => {
  const ErrorRenderComponent = CustomErrorComponent;

  if (loading) {
    return <Fallback />;
  }

  if (data && !isDataEmpty && !loading) {
    return <RenderComponent {...data} />;
  }

  if (hasError) {
    return (
      <ErrorRenderComponent errorMessage={errorMessage} onRetry={onRetry} />
    );
  }

  if (isDataEmpty && NoDataRenderComponent && !loading) {
    return <NoDataRenderComponent />;
  }

  return null;
};
