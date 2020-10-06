import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//type
import {ScreenTypes} from './src/constants/types';

//Screens
import HomeScreen from './src/screen/HomeScreen';
import CameraScreen from './src/screen/CameraScreen';
import GeolocationScreen from './src/screen/GeolocationScreen';
import ImagePickerScreen from './src/screen/ImagePickerScreen';
import VideoViewNativeScreen from './src/screen/VideoViewNativeScreen';
import NPMHomeScreen from './src/screen/NPMHomeScreen';
import CameraNPMScreen from './src/screen/CameraNPMScreen';
import GeolocationNPMScreen from './src/screen/GeolocationNPMScreen';
import CameraRollNPMScreen from './src/screen/CameraRollNPMScreen';
import VideoNPMScreen from './src/screen/VideoNPMScreen';
import ScrollViewAnimationScreen from './src/screen/ScrollViewAnimationScreen';

const Stack = createStackNavigator<ScreenTypes>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        /* options={{}} */
      ></Stack.Screen>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        initialParams={{title: 'initialParams'}}
      />
      <Stack.Screen name="Geolocation" component={GeolocationScreen} initialParams={{coords: '213123'}}/>
      <Stack.Screen name="ImagePicker" component={ImagePickerScreen} />
      <Stack.Screen name="VideoView" component={VideoViewNativeScreen} />
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

export default () => (
  <NavigationContainer
    onStateChange={(state) => console.log(state?.routeNames)}>
    <RootStack />
  </NavigationContainer>
);
