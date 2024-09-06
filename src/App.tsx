import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './global.css';

import './locales/translations';
import RootNavigation from './layouts/RootNavigation';

const linking = {
  prefixes: ['https://pass.app'],
};

const queryClient = new QueryClient();
function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer linking={linking}>
          <RootNavigation />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
