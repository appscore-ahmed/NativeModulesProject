import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Alert,
  LayoutChangeEvent,
  ScaledSize,
} from 'react-native';
import {shareToExternal, shareType} from '../native_module/Modules';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {isPortrait} from '../styles/Orientation';

interface nativeCall {
  dimen?: layoutType;
  buttonTitle: string;
  promisedCallback: () => Promise<string>;
  isSuccessfull?: (isTrue: Boolean) => void;
}

enum OrientationEnum {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

interface layoutType {
  height: number;
  width: number;
  /* x: number;
  y: number; */
}

const ImageComponent = (props: nativeCall) => {
  const [imageSource, setImageSource] = useState<string | undefined>();
  const [isHidden, setHidden] = useState<Boolean>(true);
  const [orientation, setOrientation] = useState<string>();

  const [screen, setScreen] = useState<ScaledSize>(Dimensions.get('window'));

  const _orientationDidChange = (orientation: OrientationType) => {
    if (orientation === 'PORTRAIT') {
      console.log('PORTRAIT');
    } else {
      console.log(orientation);
    }
  };

  /*   useEffect(() => {
    const callback = () => {
      console;
      setOrientation(
        isPortrait() ? OrientationEnum.PORTRAIT : OrientationEnum.LANDSCAPE,
      );
    };

    Dimensions.addEventListener('change', callback);

    setOrientation(Orientation.getInitialOrientation());

    Orientation.unlockAllOrientations();
    Orientation.addDeviceOrientationListener(_orientationDidChange);

    return () => {
      Orientation.removeDeviceOrientationListener(_orientationDidChange);
      Dimensions.removeEventListener('change', callback);
    };
  }, []);
 */
  const getOrientation = () => {
    if (screen.width > screen.height) {
      return 'LANDSCAPE';
    } else {
      return 'PORTRAIT';
    }
  };

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
  let styles = getStyle();

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Image style={styles.imageViewStyle} source={{uri: imageSource}} />
      <View style={styles.buttonViewStyle}>
        <Button
          title={props.buttonTitle}
          onPress={() => {
            /* pickImage() */
            props
              .promisedCallback()
              .then((uri: string) => {
                setImageSource(uri);
                // props.isSuccessfull(true);
                setHidden(false);
                console.log(uri);
              })
              .catch((e: string) => Alert.alert(e));
          }}
        />
        {!isHidden && (
          <View style={styles.buttonViewStyle}>
            <Button
              title="Share"
              onPress={() => {
                shareToExternal(imageSource, shareType.image);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const stylesPort = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageViewStyle: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height - 150,
    width: Dimensions.get('window').width,
  },
  buttonViewStyle: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
const stylesLand = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  containerLandscape: {
    flex: 1,
  },
  imageViewStyle: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  buttonViewStyle: {
    // marginHorizontal: 20,
    // marginVertical: 20,
  },
});

export default ImageComponent;
