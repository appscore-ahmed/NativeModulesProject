import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useLayoutEffect} from 'react';
import {Button, View, StyleSheet, SafeAreaView} from 'react-native';
import {FocusAwareStatusBar} from '../components/FocusAwareStatusBar';
import {useNavigation} from '../hooks/useNavigation';
import lifecycle from '../native_module/Modules';
import CameraScreen from '../screen/CameraScreen';

const HomeScreen = (/* {navigation}: StackScreenProps<ParamList> */) => {
  const navigation = useNavigation();

  useEffect(() => {
    try {
      lifecycle
        .lifecycle()
        .then((e: string) => {
          console.log(e);
        })
        .catch((e: string) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const camera = useRef<Button>();

  useLayoutEffect(() => {
    console.log(camera.current?.props.title);
  }, []);

  return (
    // <View style={styles.container}>
    <SafeAreaView style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <View style={styles.buttonViewStyle}>
        <Button
          ref={camera}
          title="Camera"
          onPress={() => {
            navigation.navigate('Camera', {title: 's'});
          }}
        />
      </View>
      <View style={styles.buttonViewStyle}>
        <Button
          title="Geolocation"
          onPress={() => {
            navigation.navigate('Geolocation', {coords: 'latLon'});
          }}
        />
      </View>
      <View style={styles.buttonViewStyle}>
        <Button
          title="Image Picker"
          onPress={() => {
            navigation.navigate('ImagePicker');
          }}
        />
      </View>
      <View style={styles.buttonViewStyle}>
        <Button
          title="Video View"
          onPress={() => {
            navigation.navigate('VideoView');
          }}
        />
      </View>
      {/* <View style={styles.buttonViewStyle}>
        <Text> NPM Packages </Text>
        <Button
          title="NPM"
          onPress={() => {
            navigation.navigate('NPM');
          }}
        />
      </View> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonViewStyle: {
    marginVertical: 30,
  },
});

export default HomeScreen;

/* const _orientationDidChange = (orientation: OrientationType) => {
    if (orientation === 'PORTRAIT') {
      console.log('PORTRAIT');
    } else {
      console.log(orientation);
    }
  };

  useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.addDeviceOrientationListener(_orientationDidChange);

    return () => {
      Orientation.removeDeviceOrientationListener(_orientationDidChange);
    };
  }, []); */
