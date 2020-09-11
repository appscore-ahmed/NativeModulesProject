import React, {useState} from 'react';
import {View, StyleSheet, Image, Button, Alert} from 'react-native';
import {callCamera, shareToExternal, shareType} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';

const CameraScreen = () => {
  const [imageSource, setImageSource] = useState<string | undefined>();
  const [isHidden, setHidden] = useState<Boolean>(true);

  return (
    <View style={styles.container}>
      //{' '}
      {/* <Button
      //   title="Click Meee"
      //   onPress={() => {
      //     callCamera()
      //       .then((uri: string) => {
      //         console.log(`uri : ${uri}`);
      //         setImageSource(uri);
      //         setHidden(false);
      //       })
      //       .catch((e: string) => Alert.alert(e));
      //   }}
      // />
      // <Image
      //   style={styles.stretch}
      //   source={{uri: imageSource}}
      //   onLoadEnd={() => {
      //     console.log('loaded');
      //   }}
      //   onError={console.log}
      // /> */}
      <ImageComponent
        promisedCallback={callCamera}
        isSuccessfull={(isTrues: Boolean) => setHidden(isTrues)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  buttonViewStyle: {
    marginVertical: 30,
  },
});

export default CameraScreen;
