import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNav} from './src/navigation/StackNav';
import {Text} from 'react-native';

const linking = {
  prefixes: ['url://homescreen://', 'homescreen://'],
  screens: { //to satisfy typescript
    config: {
      // screens: {
      Home: {
        screens: {
          /* 'NPM', */
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
