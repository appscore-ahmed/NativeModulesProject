import React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {useNavigation} from '../hooks/useNavigation';

const NPMHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowButtonViewStyle}>
        <Button
          title="Camera NPM"
          onPress={() => {
            navigation.navigate('CameraNPM');
          }}
        />
      </View>
      <View style={styles.rowButtonViewStyle}>
        <Button
          title="Location NPM"
          onPress={() => {
            navigation.navigate('GeolocationNPM');
          }}
        />
      </View>
      <View style={styles.rowButtonViewStyle}>
        <Button
          title="CameraRoll NPM"
          onPress={() => {
            navigation.navigate('CameraRollNPM');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowButtonViewStyle: {
    marginVertical: 20,
  },
});

export default NPMHomeScreen;
