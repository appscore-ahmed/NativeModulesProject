import React, {useEffect} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {getHardwareInfo, getNetworkStatus, getDisplay} from '../native_module/DeviceInfo';
import {useNavigation} from '../hooks/useNavigation';
import NativeModules from '../CustomModules';

type navigation = NavigationScreenProp<NavigationState, NavigationParams>;

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    NativeModules.ToastExample.show('test', NativeModules.ToastExample.SHORT);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Native Camera</Text>
      <Button
        title="Camera"
        onPress={async () => {
          console.log(await getHardwareInfo());
          console.log(await getNetworkStatus());
          console.log(await getDisplay());
          navigation.navigate('Camera');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
