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
  const _handleButtonPress = () => {
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
      <View style={{position: 'absolute', width: '100%', alignSelf: 'center'}}>
        <Button title="Load Images" onPress={_handleButtonPress} />
      </View>
      <ScrollView
        style={{paddingTop: 30,}}
        onScroll={(event) => console.log(event.nativeEvent.contentOffset)}>
        {photos?.map((p, i) => {
          return (
            <View>
              <Image
                key={i}
                style={{width: '100%', height: 500}}
                source={{uri: p.node.image.uri}}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CameraRollNPMScreen;
