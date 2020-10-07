import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ScreenTypes} from '../constants/types';

import HomeScreen from '../screen/HomeScreen';
import CameraScreen from '../screen/CameraScreen';
import GeolocationScreen from '../screen/GeolocationScreen';
import ImagePickerScreen from '../screen/ImagePickerScreen';
import VideoViewNativeScreen from '../screen/VideoViewNativeScreen';


const Stack = createStackNavigator<ScreenTypes>();

export function NativeModuleNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        initialParams={{title: 'initialParams'}}
      />
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
