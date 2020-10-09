import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {pickImage} from '../native_module/Modules';
import ImageComponent from '../components/ImageComponent';
import {useRoute} from '../hooks/useRoute';

const ImagePickerScreen = () => {
  const route = useRoute('ImagePicker');
  console.log(route.params?.id);

  return (
    <ImageComponent promisedCallback={pickImage} buttonTitle="Pick an Image" />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImagePickerScreen;
