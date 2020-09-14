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
