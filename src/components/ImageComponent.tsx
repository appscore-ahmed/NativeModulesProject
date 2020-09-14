import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions, Button, Alert} from 'react-native';
import {shareToExternal, shareType} from '../native_module/Modules';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {isPortrait} from '../styles/Orientation';

interface nativeCall {
  buttonTitle: string;
  promisedCallback: () => Promise<string>;
  isSuccessfull?: (isTrue: Boolean) => void;
}

enum OrientationEnum {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

var {height, width} = Dimensions.get('screen');

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

    Dimensions.addEventListener('change', callback);

    Orientation.unlockAllOrientations();
    Orientation.addDeviceOrientationListener(_orientationDidChange);

    return () => {
      Orientation.removeDeviceOrientationListener(_orientationDidChange);
      Dimensions.removeEventListener('change', callback);
    };
  }, []);

  return (
    <View
      style={
        orientation === OrientationEnum.PORTRAIT
          ? styles.container
          : styles.containerLandscape
      }>
      <Image
        style={
          orientation === OrientationEnum.PORTRAIT
            ? styles.imageViewStyle
            : styles.imageViewLandscapeStyle
         }
        source={{uri: imageSource}}
      />
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
