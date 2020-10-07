import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//type
import {ScreenTypes, BottomTabScreenType} from './src/constants/types';
import {NativeModuleNavigation} from './src/navigation/NativeModuleNavigation';
import {NPMNavigation} from './src/navigation/NPMNavigation';

const Stack = createStackNavigator<ScreenTypes>();
const BottomStack = createBottomTabNavigator<BottomTabScreenType>();

function RootStack() {
  return (
    <BottomStack.Navigator initialRouteName="Home">
      <BottomStack.Screen name="Home" component={NativeModuleNavigation} />
      <BottomStack.Screen name="NPM" component={NPMNavigation} />
    </BottomStack.Navigator>
  );
}

export default () => (
  <NavigationContainer
    onStateChange={(state) => console.log(state?.routeNames)}>
    <RootStack />
  </NavigationContainer>
);
