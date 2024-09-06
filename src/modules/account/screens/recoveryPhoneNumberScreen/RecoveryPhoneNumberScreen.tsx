import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuItemRow } from '~account/components/menuItemRow/MenuItemRow';
import { useRecoveryPhoneNumbers } from '~account/connectivity/userProfile/useRecoveryPhoneNumbers';
import EditIcon from '~shared/assets/svgs/editIcon.svg';
import DeleteIcon from '~shared/assets/svgs/wasteBinIcon.svg';
import { DataRenderer } from '~shared/components/dataRenderer/DataRenderer';
import { Heading } from '~shared/components/heading/Heading';
import { List } from '~shared/components/list/List';
import { PassButton } from '~shared/components/passButton/PassButton';
import { PassText } from '~shared/components/passText/PassText';

interface RecoveryPhoneNumberActionsProps {
  onDelete: () => void;
  onEdit: () => void;
}

function RecoveryPhoneNumberActions({
  onDelete,
  onEdit,
}: RecoveryPhoneNumberActionsProps) {
  return (
    <View className="w-fit flex-row px-2">
      <PassButton onPress={onEdit}>
        <EditIcon />
      </PassButton>
      <PassButton onPress={onDelete}>
        <DeleteIcon />
      </PassButton>
    </View>
  );
}

export function RecoveryPhoneNumberScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Navigation>();
  const { phoneNumbers, isLoading, isError, refetch } =
    useRecoveryPhoneNumbers();

  const handleEdit = (item: string) => {
    //@todo: replace this implementation with the right logic
    console.log('on edit', item);
  };
  const handleDelete = (item: string) => {
    //@todo: replace this implementation with the right logic
    console.log('on delete', item);
  };

  const PhoneNumberList = () => {
    return (
      <List
        className="flex-1 p-4"
        data={phoneNumbers}
        renderItem={({ item }) => (
          <MenuItemRow
            hideCaret
            title={item}
            titleClassName="!text-base"
            rightComponent={
              <RecoveryPhoneNumberActions
                onDelete={() => handleDelete(item)}
                onEdit={() => handleEdit(item)}
              />
            }
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView className="flex h-full flex-col bg-white p-5">
      <Heading
        isModal
        hideBackButton
        className="mt-3"
        onClose={navigation.goBack}
        title={t('account.recoveryPhoneNumberScreen.enableRecovery')}
      />
      <DataRenderer
        data={{ phoneNumbers }}
        isDataEmpty={!phoneNumbers?.length}
        RenderComponent={PhoneNumberList}
        loading={isLoading}
        hasError={isError}
        onRetry={refetch}
      />
      <View className="px-6 pb-2">
        <PassButton
          variant="outlined"
          className="w-max-[345px] !border-borderColor"
        >
          <PassText className="text-base font-bold text-primary">
            {t('account.recoveryPhoneNumberScreen.addAnotherPhoneNumber')}
          </PassText>
        </PassButton>
      </View>
    </SafeAreaView>
  );
}
