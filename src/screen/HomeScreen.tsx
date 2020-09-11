import React, {useEffect} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {useNavigation} from '../hooks/useNavigation';

type navigation = NavigationScreenProp<NavigationState, NavigationParams>;

const HomeScreen = () => {
  const navigation = useNavigation();

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
