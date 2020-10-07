import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NPMScreenTypes} from '../constants/types';
import NPMHomeScreen from '../screen/NPMHomeScreen';
import CameraNPMScreen from '../screen/CameraNPMScreen';
import GeolocationNPMScreen from '../screen/GeolocationNPMScreen';
import CameraRollNPMScreen from '../screen/CameraRollNPMScreen';
import VideoNPMScreen from '../screen/VideoNPMScreen';
import ScrollViewAnimationScreen from '../screen/ScrollViewAnimationScreen';

const Stack = createStackNavigator<NPMScreenTypes>();

export function NPMNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="NPM"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="NPM" component={NPMHomeScreen} />
      <Stack.Screen name="CameraNPM" component={CameraNPMScreen} />
      <Stack.Screen name="GeolocationNPM" component={GeolocationNPMScreen} />
      <Stack.Screen name="CameraRollNPM" component={CameraRollNPMScreen} />
      <Stack.Screen name="VideoNPM" component={VideoNPMScreen} />
      <Stack.Screen
        name="ScrollViewAnimation"
        component={ScrollViewAnimationScreen}
      />
    </Stack.Navigator>
  );
}
