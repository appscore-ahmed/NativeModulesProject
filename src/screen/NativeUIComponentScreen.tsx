import React from 'react';
import {View, StyleSheet, Text, requireNativeComponent} from 'react-native';
import RCTImageView from '../native_module/ImageView';

const NativeUIComponentScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text>NativeUIComponentScreen</Text> */}
      <RCTImageView
        /* style={{flex: 1, width: '100%', height: '100%'}} */
        // src={[{uri: 'file:///storage/emulated/0/Pictures/Title (2).jpg'}]}
        src={[{uri: '/storage/emulated/0/Pictures/Title (2).jpg' , width:200, height: 500}]} 
        borderRadius={10}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NativeUIComponentScreen;
