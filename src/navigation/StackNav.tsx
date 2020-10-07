import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStack} from './RootStack';
import {DrawerNavigation} from './DrawerNavigation';

import ImagePickerScreen from '../screen/ImagePickerScreen';
import VideoViewNativeScreen from '../screen/VideoViewNativeScreen';
import GeolocationScreen from '../screen/GeolocationScreen';

const Stack = createStackNavigator();

export function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Home" component={RootStack} />
      <Stack.Screen name="Camera" component={DrawerNavigation} />
      <Stack.Screen
        name="Geolocation"
        component={GeolocationScreen}
        initialParams={{coords: '213123'}}
      />
      <Stack.Screen name="ImagePicker" component={ImagePickerScreen} />
      <Stack.Screen name="VideoView" component={VideoViewNativeScreen} />
    </Stack.Navigator>
  );
}
