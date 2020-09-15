import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Alert,
  ScaledSize,
} from 'react-native';
import {shareToExternal, shareType} from '../native_module/Modules';
import {OrientationEnum} from '../styles/OrientationEnum';
import {useOrientation} from '../hooks/useOrientation';

interface nativeCall {
  dimen?: layoutType;
  buttonTitle: string;
  promisedCallback: () => Promise<string>;
  isSuccessfull?: (isTrue: Boolean) => void;
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
  const [screen, setScreen] = useState<ScaledSize>(Dimensions.get('window'));

  const onLayout = () => {
    console.log('onLayout called');
    setScreen(Dimensions.get('window'));
  };

  const getStyle = () => {
    if (useOrientation() === OrientationEnum.PORTRAIT) {
      {
        return stylesPort;
      }
    } else {
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
  },
  imageViewStyle: {
    resizeMode: 'contain',
    height: '65%',
    width: '100%',
  },
  buttonViewStyle: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default ImageComponent;

/*const _orientationDidChange = (orientation: OrientationType) => {
    if (orientation === 'PORTRAIT') {
      console.log('PORTRAIT');
    } else {
      console.log(orientation);
    }
  };

     useEffect(() => {
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
