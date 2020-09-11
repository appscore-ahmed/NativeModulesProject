import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, Button, Alert} from 'react-native';
import NativeModules from '../CustomModules';

const CameraScreen = () => {
  const [imageSource, setImageSource] = useState<string>('');
  const [text, setText] = useState<string | undefined>();
  const [isHidden, setHidden] = useState<Boolean>(true);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button
        title="Click Meee"
        onPress={() => {
          NativeModules.CameraModule.callCamera()
            .then((uri: string) => {
              console.log(`uri : ${uri}`);
              setImageSource(uri);
              setText(uri);
              setHidden(false);
            })
            .catch((e: string) => Alert.alert(e));
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
      {!isHidden && (
        <View style={styles.buttonViewStyle}>
          <Button
            title="Share"
            onPress={() => {
              NativeModules.ShareModule.share(imageSource, 'image');
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
