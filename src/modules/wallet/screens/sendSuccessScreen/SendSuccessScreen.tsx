import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PageWrapper } from '~shared/components/pageWrapper/PageWrapper';
import { StatusFeedback } from '~shared/components/statusFeedback/StatusFeedback';
import { HomeScreens } from '~src/layouts/HomeNavigation';

export function SendSuccessScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <PageWrapper className="bg-white">
      <View className="p-4">
        <StatusFeedback
          status="success"
          title="Success!"
          subTitle="You sent $5.00 of ETH to 0xD0...d335"
          actionButton={{
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: HomeScreens.Home }],
              });
            },
          }}
        />
      </View>
    </PageWrapper>
  );
}
