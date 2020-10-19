import * as React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '../hooks/useNavigation';

const NFCTestScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Listener"
          onPress={() => navigation.navigate('NFCListener')}></Button>
      </View>
      <View style={styles.button}>
        <Button
          title="Mifare"
          onPress={() => navigation.navigate('NFCMifare')}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  button: {
    marginVertical: 10,
  },
});

export default NFCTestScreen;
