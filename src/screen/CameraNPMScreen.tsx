import React, {useRef, useState, RefObject, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from 'react-native';
import {
  CameraStatus,
  RecordAudioPermissionStatus,
  RNCamera,
} from 'react-native-camera';
import {useNavigation} from '../hooks/useNavigation';
import {useRoute} from '@react-navigation/native';

interface props {
  cameraRef: RefObject<RNCamera>;
  status: CameraStatus;
  recordAudioPermissionStatus: RecordAudioPermissionStatus;
}

const CameraNPMScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const cameraRef = useRef<RNCamera>(null);
  const [cameraType, setCameraType] = useState<Boolean>(false);
  const [imageSource, setImageSource] = useState<string | undefined>('');
  const [modalVisibility, setModalVisibility] = useState<Boolean>(true);

  useEffect(() => {
    console.log(route);
    // setCameraType(route.params?.cameraview);
  }, []);

  const takePicture = async (/* cameraRef: RefObject<RNCamera> */) => {
    if (cameraRef) {
      try {
        const options = {quality: 0.5, base64: true};
        const data = await cameraRef?.current?.takePictureAsync(options);
        console.log(data?.uri);
        setImageSource(data?.uri);
      } catch (error) {
        console.log(error, 'ERROR <<<<<<<<<<<<<');
      }
    }
  };

  return (
    <View style={styles.camera}>
      {imageSource === '' ? (
        <RNCamera
          ref={cameraRef}
          captureAudio={true}
          type={
            cameraType
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          style={styles.camera}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'Permission needed to use your camera',
            buttonPositive: 'Okay',
            buttonNegative: 'Cancel',
          }}
          flashMode={RNCamera.Constants.FlashMode.on}
          playSoundOnCapture={true}
          onPictureTaken={() => console.log('Picture Taken')}
        />
      ) : (
        <Image style={styles.camera} source={{uri: imageSource}} />
      )}
      <View style={styles.captureView}>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={modalVisibility ? true : false}
          // style={styles.captureView /* {zIndex: 1100} */}
          onRequestClose={() => {
            setModalVisibility(!modalVisibility);
            navigation.goBack();
          }}>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
              <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCameraType(!cameraType);
              }}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> Flip </Text>
            </TouchableOpacity>
          </View>
          {/* {(props: props) => {
            if (props.status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => takePicture(props.cameraRef)}
                  style={styles.capture}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }} */}
        </Modal>
      </View>
    </View>
  );
};
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

const styles = StyleSheet.create({
  camera: {flex: 1},
  captureView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default CameraNPMScreen;
