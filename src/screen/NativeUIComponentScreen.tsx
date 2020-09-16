import React from 'react';
import {View, StyleSheet, Text, requireNativeComponent} from 'react-native';
// import {RCTImageView} from '../native_module/RCTImageView';

const NativeUIComponentScreen = () => {
  const ImageView = requireNativeComponent('ReactImageView');
  return (
    <View>
      <Text>NativeUIComponentScreen</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NativeUIComponentScreen;
