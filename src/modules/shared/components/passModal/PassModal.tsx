import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import classNames from 'classnames';

import { Heading } from '../heading/Heading';
import { PageWrapper } from '../pageWrapper/PageWrapper';

const PassModal = ({
  isVisible,
  onClose,
  children,
  headerText,
  className,
  noWrapper,
}: ModalProps) => {
  const Component = () => (
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="flex-1 justify-end bg-backLayColor pt-32">
        <View
          className={classNames(
            'h-contain w-full rounded-t-2xl bg-white pt-6 shadow-lg',
            className
          )}
        >
          <Heading
            isModal
            hideBackButton
            title={headerText}
            onClose={onClose}
            className="mt-2"
          />
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      {noWrapper ? (
        <Component />
      ) : (
        <PageWrapper>
          <Component />
        </PageWrapper>
      )}
    </Modal>
  );
};

interface ModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  headerText?: string;
  children?: React.ReactNode;
  className?: string;
  noWrapper?: boolean;
}

export { PassModal };
