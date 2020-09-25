import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import CameraRoll, {PhotoIdentifier} from '@react-native-community/cameraroll';

const CameraRollNPMScreen = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>();
  const [zIndex, setZIndex] = useState<Boolean>(false);
  const _handleButtonPress = () => {
    console.log('clicked');
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then((r) => {
        setPhotos(r.edges);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <View
        style={{
          /* paddingTop: 10, */
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          zIndex: 0/* photos?.length === 0 ? 0 : 1 */,
        }}>
        <Button title="Load Images" onPress={_handleButtonPress} />
      </View>
      <ScrollView
        style={{paddingTop: 30, zIndex: 1/* photos?.length !== 0 ? 1 : 0 */}}
        onScroll={(event) => console.log(event.nativeEvent.contentOffset)}>
        {photos?.map((p, i) => {
          console.log(p.node.image.uri);
          return (
            <View>
              <Image
                key={i}
                style={{width: '100%', height: 500, zIndex: 1}}
                source={{uri: p.node.image.uri}}
              />
              {/* <Image   style={{width: '100%', height: 500, zIndex: 1}} source={{uri: 'file:///storage/emulated/0/Pictures/Title (1).jpg'}}/>
              <Image   style={{width: '100%', height: 500, zIndex: 1}} source={{uri: 'file:///storage/emulated/0/Pictures/Title (1).jpg'}}/>
              <Image   style={{width: '100%', height: 500, zIndex: 1}} source={{uri: 'file:///storage/emulated/0/Pictures/Title (1).jpg'}}/> */}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CameraRollNPMScreen;
