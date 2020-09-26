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
  const [isClicked, setClicked] = useState<Boolean>(false);

  const _handleButtonPress = () => {
    console.log('clicked');
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then((r) => {
        setPhotos(r.edges);
        setClicked(!isClicked);
      })
      .catch((err) => console.log(err));
  };
  const _deleteImage = (imageUris: string[]) => {
    CameraRoll.deletePhotos(imageUris)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.log(e));
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          /* paddingTop: 10, */
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          zIndex: isClicked ? 0 : 1,
        }}>
        <Button title="Load Images" onPress={_handleButtonPress} />
      </View>
      <ScrollView
        style={{
          //   flex: 1,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.1)',
          paddingTop: 35,
          zIndex: isClicked ? 1 : 0,
        }}
        onScroll={(event) => console.log(event.nativeEvent.contentOffset)}>
        {photos?.map((p, i) => {
          console.log(p.node.image.uri);
          return (
            <View style={{flex: 1}}>
              <Button
                title="Delete Images"
                onPress={() => _deleteImage([p.node.image.uri])}
              />
              <Image
                key={i}
                style={{width: '100%', height: 500, zIndex: 1}}
                source={{uri: p.node.image.uri}}
              />

              <Image
                style={{width: '100%', height: 500, zIndex: 1}}
                source={{uri: 'file:///storage/emulated/0/Pictures/Title.jpg'}}
              />
              {/*<Image   style={{width: '100%', height: 500, zIndex: 1}} source={{uri: 'file:///storage/emulated/0/Pictures/Title (1).jpg'}}/>
              <Image   style={{width: '100%', height: 500, zIndex: 1}} source={{uri: 'file:///storage/emulated/0/Pictures/Title (1).jpg'}}/> */}

              {photos.length - 1 === i ? <View style={{height: 30}} /> : null}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CameraRollNPMScreen;
