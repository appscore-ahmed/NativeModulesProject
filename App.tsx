import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNav} from './src/navigation/StackNav';
import {Text} from 'react-native';

const config = {
  screens: {
    Home: {
      screens: {
        NPM: {
          screen: {
            CameraNPM: {
              path: 'CameraNPM/:cameraview',
              params: {cameraview: 3},
            },
          },
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

const linking = {
  prefixes: ['url://homescreen://', 'homescreen://'],
  config: {config},
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
