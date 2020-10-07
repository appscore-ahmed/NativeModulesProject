import * as React from 'react';
import {View} from 'react-native';
import {ScreenTypes} from '../constants/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {BottomTabScreenType} from '../constants/types';

import HomeScreen from '../screen/HomeScreen';

import {NPMScreenTypes} from '../constants/types';
import NPMHomeScreen from '../screen/NPMHomeScreen';
import CameraNPMScreen from '../screen/CameraNPMScreen';
import GeolocationNPMScreen from '../screen/GeolocationNPMScreen';
import CameraRollNPMScreen from '../screen/CameraRollNPMScreen';
import VideoNPMScreen from '../screen/VideoNPMScreen';
import ScrollViewAnimationScreen from '../screen/ScrollViewAnimationScreen';

const NPMStack = createStackNavigator<NPMScreenTypes>();

export function NPMNavigation() {
  return (
    <NPMStack.Navigator
      initialRouteName="NPM"
      screenOptions={{headerShown: false}}>
      <NPMStack.Screen name="NPM" component={NPMHomeScreen} />
      <NPMStack.Screen name="CameraNPM" component={CameraNPMScreen} />
      <NPMStack.Screen name="GeolocationNPM" component={GeolocationNPMScreen} />
      <NPMStack.Screen name="CameraRollNPM" component={CameraRollNPMScreen} />
      <NPMStack.Screen name="VideoNPM" component={VideoNPMScreen} />
      <NPMStack.Screen
        name="ScrollViewAnimation"
        component={ScrollViewAnimationScreen}
      />
    </NPMStack.Navigator>
  );
}

const Stack = createStackNavigator<ScreenTypes>();

function NativeModuleNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const BottomStack = createBottomTabNavigator<BottomTabScreenType>();

export function RootStack() {
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
