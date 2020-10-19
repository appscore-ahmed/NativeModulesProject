import * as React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';

interface Props {
  label: string;
  TestFunction: () => void;
  CancelFunction: () => void;
}

const NFCUIComponent = ({label, TestFunction, CancelFunction}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.button}>
        <Button title="Test" onPress={TestFunction}></Button>
      </View>
      <View style={styles.button}>
        <Button title="Cancel" onPress={CancelFunction}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 5,
    width: 200,
  },
  label: {
    marginTop: 10,
  },
});

export default NFCUIComponent;
