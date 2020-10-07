import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNav} from './src/navigation/StackNav';

export default () => (
  <SafeAreaProvider>
    <NavigationContainer
    /* onStateChange={(state) => console.log(state?.routeNames)} */
    >
      <StackNav />
    </NavigationContainer>
  </SafeAreaProvider>
);
