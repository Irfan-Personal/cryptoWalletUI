import { AppRegistry } from 'react-native';

import './src/global.css';

import 'react-native-get-random-values';
import './src/msw/msw.polyfills';
import StoryBook from './.storybook';
import { name as appName } from './app.json';
import App from './src/App';
import { server } from './src/msw/server';

const shouldMountStorybook = false;

if (__DEV__) {
  server.listen({ onUnhandledRequest: 'bypass' });
}

AppRegistry.registerComponent(appName, () =>
  shouldMountStorybook ? StoryBook : App
);
