import React from 'react';
import {View, StyleSheet} from 'react-native';
import {callCamera} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <ImageComponent
        buttonTitle="Take a Picture"
        promisedCallback={callCamera}
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

export default CameraScreen;
