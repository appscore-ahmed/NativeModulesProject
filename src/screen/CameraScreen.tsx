import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {callCamera} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';
import {useRoute} from '../hooks/useRoute';
import {FocusAwareStatusBar} from '../components/FocusAwareStatusBar';

interface layoutType {
  height: number;
  width: number;
  x: number;
  y: number;
}

const CameraScreen = () => {
  const route = useRoute('Camera');
  console.log('cameraaaaaaaaa');
  console.log(route.params?.title);
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <ImageComponent
        /* dimen={dimen} */
        buttonTitle="Take a Picture"
        promisedCallback={callCamera}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraScreen;
