import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {callCamera} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';

interface layoutType {
  height: number;
  width: number;
  x: number;
  y: number;
}

const CameraScreen = () => {
  const [dimen, setDimen] = useState<layoutType>({
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    x: 0,
    y: 0,
  });

  console.log(dimen.width);
  console.log(dimen.height);

  return (
    <View
      onLayout={(e) => {
        console.log('layout');
        console.log(e.nativeEvent.layout);
        setDimen(e.nativeEvent.layout);
      }}>
      
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraScreen;
