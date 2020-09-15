import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ScaledSize} from 'react-native';
import {callCamera} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';
import {getOrientation} from '../styles/Orientation'

interface layoutType {
  height: number;
  width: number;
  x: number;
  y: number;
}

const CameraScreen = () => {
  const [screen, setScreen] = useState<ScaledSize>(Dimensions.get('window'));

  const onLayout = () => {
    console.log('onLayout called');
    setScreen(Dimensions.get('window'));
  };

  const getStyle = () => {
    if (getOrientation() === 'PORTRAIT') {
      {
        console.log('stylesPort');
        return stylesPort;
      }
    } else {
      console.log('stylesLand');
      return stylesLand;
    }
  };
  // let styles = getStyle();

  return (
    <View style={stylesLand.container} onLayout={onLayout}>
      <ImageComponent
        /* dimen={dimen} */
        buttonTitle="Take a Picture"
        promisedCallback={callCamera}
      />
    </View>
  );
};

const stylesPort = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const stylesLand = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraScreen;
