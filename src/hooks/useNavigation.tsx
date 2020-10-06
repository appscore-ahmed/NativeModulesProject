import { useContext } from 'react';
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext,
} from 'react-navigation';

export function useNavigation<Params>() {
  return useContext(NavigationContext) as unknown as NavigationScreenProp<
    NavigationRoute,
    Params
  >;
}