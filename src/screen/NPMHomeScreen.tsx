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
          title="Location"
          onPress={() => {
            navigation.navigate('CameraNPM');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowButtonViewStyle: {
    marginHorizontal: 20,
  },
});

export default NPMHomeScreen;
