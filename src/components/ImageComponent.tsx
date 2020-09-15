import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Alert,
  LayoutChangeEvent,
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
  x: number;
  y: number;
}

const useComponent = () => {
  const [layout, setLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setLayout(layout);
  }, []);

  return [layout, onLayout];
};

const ImageComponent = (props: nativeCall) => {
  const [imageSource, setImageSource] = useState<string | undefined>();
  const [isHidden, setHidden] = useState<Boolean>(true);
  const [orientation, setOrientation] = useState<OrientationEnum>(
    OrientationEnum.PORTRAIT,
  );

  const _orientationDidChange = (orientation: OrientationType) => {
    if (orientation === 'PORTRAIT') {
      console.log('PORTRAIT');
    } else {
      console.log(orientation);
    }
  };

  useEffect(() => {
    const callback = () => {
      setOrientation(
        isPortrait() ? OrientationEnum.PORTRAIT : OrientationEnum.LANDSCAPE,
      );
    };

    // Dimensions.addEventListener('change', callback);

    Orientation.unlockAllOrientations();
    Orientation.addDeviceOrientationListener(_orientationDidChange);

    return () => {
      Orientation.removeDeviceOrientationListener(_orientationDidChange);
      // Dimensions.removeEventListener('change', callback);
    };
  }, []);

  // console.log(props.dimen.height + props.dimen.width);

  return (
    <View style={styles.container}>
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
          //   <View style={styles.buttonViewStyle}>
          <Button
            title="Share"
            onPress={() => {
              shareToExternal(imageSource, shareType.image);
            }}
          />
          //   </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLandscape: {
    flex: 1,
    flexDirection: 'row',
  },
  imageViewStyle: {
    resizeMode: 'cover',
    height: Dimensions.get('screen').height - 150,
    width: Dimensions.get('screen').width,
  },
  imageViewLandscapeStyle: {
    resizeMode: 'cover',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width - 200,
  },
  buttonViewStyle: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // marginHorizontal: 20,
    // marginVertical: 20,
  },
});

export default ImageComponent;
