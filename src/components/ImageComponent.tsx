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
import {callCamera, shareToExternal, shareType} from '../native_module/Modules';

interface nativeCall {
  buttonTitle: string;
  promisedCallback: () => Promise<string>;
  isSuccessfull?: (isTrue: Boolean) => void;
}

const ImageComponent = (props: nativeCall) => {
  const [imageSource, setImageSource] = useState<string | undefined>();
  const [isHidden, setHidden] = useState<Boolean>(true);
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
  imageViewStyle: {
    resizeMode: 'cover',
    height: Dimensions.get('window').height - 100,
    width: Dimensions.get('window').width,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default ImageComponent;
