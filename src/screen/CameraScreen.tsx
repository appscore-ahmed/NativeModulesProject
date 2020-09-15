import React from 'react';
import {View, StyleSheet, Dimensions, ScaledSize} from 'react-native';
import {callCamera} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';

interface layoutType {
  height: number;
  width: number;
  x: number;
  y: number;
}

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <ImageComponent
        /* dimen={dimen} */
        buttonTitle="Take a Picture"
        promisedCallback={callCamera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraScreen;
