import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import ScrollViewAnimationScreen from '../screen/ScrollViewAnimationScreen';
import CameraScreen from '../screen/CameraScreen';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Camera">
      <Drawer.Screen name="ScrollView" component={ScrollViewAnimationScreen} />
      <Drawer.Screen
        name="Camera"
        component={CameraScreen}
        initialParams={{title: 'initialParams'}}
      />
    </Drawer.Navigator>
  );
}
