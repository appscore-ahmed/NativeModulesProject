import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//type
import {BottomTabScreenType} from './src/constants/types';
import {NativeModuleNavigation} from './src/navigation/NativeModuleNavigation';
import {NPMNavigation} from './src/navigation/NPMNavigation';
import {createStackNavigator} from '@react-navigation/stack';

import CameraScreen from './src/screen/CameraScreen';
import GeolocationScreen from './src/screen/GeolocationScreen';
import ImagePickerScreen from './src/screen/ImagePickerScreen';
import VideoViewNativeScreen from './src/screen/VideoViewNativeScreen';
import HomeScreen from './src/screen/HomeScreen';

const BottomStack = createBottomTabNavigator<BottomTabScreenType>();

function RootStack() {
  return (
    <BottomStack.Navigator initialRouteName="Home">
      <BottomStack.Screen
        name="Home"
        component={NativeModuleNavigation}
        options={{
          tabBarIcon: (prop) => {
            return <View style={{backgroundColor: prop.color}}></View>;
          },
        }}
      />
      <BottomStack.Screen name="NPM" component={NPMNavigation} />
    </BottomStack.Navigator>
  );
}

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={RootStack} />
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

export default () => (
  <NavigationContainer
  /* onStateChange={(state) => console.log(state?.routeNames)} */
  >
    <StackNav />
  </NavigationContainer>
);
