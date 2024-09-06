import React from 'react';
import { ScrollView, View } from 'react-native';
import { PassStatusBar } from '~shared/components/passStatusBar/PassStatusBar';
import { PassText } from '~shared/components/passText/PassText';
import { ExpandingSafeAreaView } from '~src/modules/shared/components/expandingSafeAreaView/ExpandingSafeAreaView';
import { Section } from '~src/modules/shared/components/section/Section';

function StatusScreen() {
  return (
    <ExpandingSafeAreaView className="bg-blue-200">
      <PassStatusBar />
      <ScrollView>
        <View>
          <Section>
            <PassText className="text-6xl">StatusScreen</PassText>
          </Section>
        </View>
      </ScrollView>
    </ExpandingSafeAreaView>
  );
}

export { StatusScreen };
