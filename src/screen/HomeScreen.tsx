import React, {useEffect} from 'react';
import {Button, View, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '../hooks/useNavigation';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

const HomeScreen = () => {
  const navigation = useNavigation();

  const _orientationDidChange = (orientation: OrientationType) => {
    console.log(orientation);
    if (orientation === 'PORTRAIT') {
      console.log('PORTRAIT');
    } else {
      console.log(orientation);
    }
  };

  useEffect(() => {
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      console.log('PORTRIAT');
    } else {
      console.log(initial);
    }

    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(_orientationDidChange);

    return () => {
      console.log('removed');
      Orientation.removeOrientationListener(_orientationDidChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonViewStyle}>
        <Button
          title="Camera"
          onPress={() => {
            navigation.navigate('Camera');
          }}
        />
      </View>
      <View style={styles.buttonViewStyle}>
        <Button
          title="Geolocation"
          onPress={() => {
            navigation.navigate('Geolocation');
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
    </View>
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
