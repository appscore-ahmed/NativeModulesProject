import {useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScreenTypes} from '../constants/types';
import {NavigationContext} from '@react-navigation/native';

export function useNavigation() {
  return useContext(NavigationContext) as StackNavigationProp<ScreenTypes>;
}
