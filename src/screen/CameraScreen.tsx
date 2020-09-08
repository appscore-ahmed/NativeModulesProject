import React from 'react';
import {Text, View, StyleSheet, Image, Button, Alert} from 'react-native';
// import NativeModules from '../CustomModules';

const CameraScreen = () => {
  const [imageSource, setImageSource] = React.useState<string>(
    '',
  );
  const [text, setText] = React.useState<string | undefined>();

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button
        title="Click Meee"
        onPress={() => {
          // NativeModules.CameraModule.callCamera()
          //   .then((uri: string) => {
          //     console.log(`uri : ${uri}`);
          //     setImageSource(uri);
          //     setText(uri);
          //   })
          //   .catch((e: string) => Alert.alert(e));
        }}
      />
      <Image
        style={styles.stretch}
        source={{uri: imageSource}}
        onLoadEnd={() => {
          console.log('loaded');
        }}
        onError={console.log}
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
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
});

export default CameraScreen;
