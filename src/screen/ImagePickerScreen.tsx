import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import {pickImage} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';

const ImagePickerScreen = () => {
  /* const [imageSource, setImageSource] = useState<string | undefined>(); */
  return (
    // <View style={styles.container}>
    //   <Image style={styles.imageViewStyle} source={{uri: imageSource}} />
    //   <View style={styles.buttonViewStyle}>
    //     <Button
    //       title="Pick Image"
    //       onPress={() => {
    //         pickImage()
    //           .then((uri: string) => {
    //             setImageSource(uri);
    //             console.log(uri);
    //           })
    //           .catch((e: string) => Alert.alert(e));
    //       }}
    //     />
    //   </View>
    // </View>
    <ImageComponent promisedCallback={pickImage} />
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

export default ImagePickerScreen;
