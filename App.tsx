import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNav} from './src/navigation/StackNav';
import {Text} from 'react-native';

const linking = {
  prefixes: ['https://homescreen.com', 'homescreen://'],
  config: {
    Home: {
      screens: {
        /* 'NPM', */
        NPM: {
          CameraNPM: {path: 'CameraNPM'},
        },
      },
    },
    ImagePicker: {
      path: 'ImagePicker/:id',
      params: {
        id: 0,
      },
    },
    Geolocation: 'Geolocation',
  },
};

export default () => (
  <SafeAreaProvider>
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading..</Text>}
      /* onStateChange={(state) => console.log(state?.routeNames)} */
    >
      <StackNav />
    </NavigationContainer>
  </SafeAreaProvider>
);
