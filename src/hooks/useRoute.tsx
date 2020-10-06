import {NavigationRouteContext, RouteProp} from '@react-navigation/native';
import * as React from 'react';
import {ScreenTypes} from '../constants/types';

export function useRoute(params: keyof ScreenTypes) {
  return React.useContext(NavigationRouteContext) as RouteProp<
    ScreenTypes,
    typeof params //hardcoding the type resolves the issue of not showing the props through intelliSense
  >;
}
