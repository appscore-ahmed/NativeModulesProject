import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Alert,
} from 'react-native';

interface nativeCall {
  promisedCallback: () => Promise<string>;
  isSuccessfull: (isTrue: Boolean) => void;
}

const ImageComponent = (props: nativeCall) => {
  const [imageSource, setImageSource] = useState<string | undefined>();
  return (
    <View style={styles.container}>
      <Image style={styles.imageViewStyle} source={{uri: imageSource}} />
      <View style={styles.buttonViewStyle}>
        <Button
          title="Pick Image"
          onPress={() => {
            /* pickImage() */
            props
              .promisedCallback()
              .then((uri: string) => {
                setImageSource(uri);
                props.isSuccessfull(true);
                console.log(uri);
              })
              .catch((e: string) => Alert.alert(e));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageViewStyle: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height - 100,
    width: Dimensions.get('window').width,
  },
  buttonViewStyle: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default ImageComponent;
