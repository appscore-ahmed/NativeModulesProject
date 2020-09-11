import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screen/HomeScreen';
import CameraScreen from './src/screen/CameraScreen';
import GeolocationScreen from './src/screen/GeolocationScreen';
import ImagePickerScreen from './src/screen/ImagePickerScreen';

const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Geolocation: {
      screen: GeolocationScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ImagePicker: {
      screen: ImagePickerScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Native Module',
    },
    headerMode: 'none',
  },
);

const App = createAppContainer(navigator);

export default () => <App />;
