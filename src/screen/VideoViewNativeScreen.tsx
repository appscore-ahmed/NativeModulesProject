import React, {useState} from 'react';
import {View, StyleSheet, Button, Modal, TouchableOpacity} from 'react-native';
import VideoView from '../native_module/VideoView';
import {useNavigation} from '../hooks/useNavigation';
import Slider from '@react-native-community/slider';

const VideoViewNativeScreen = () => {
  const navigation = useNavigation();
  const [play, setPlay] = useState<Boolean>(true);
  const [isFileLoaded, setFileLoaded] = useState<Boolean>(false);
  const [hide, setHide] = useState<Boolean>(false);
  const [seek, setSeek] = useState<number>(0);

  const hideWithTimeout = (isHide: Boolean) => {
    setTimeout(() => {
      setHide(isHide);
    }, 5000);
  };

  let progress= 0

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.videoView}
        url="https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"
        play={play}
        seek={seek}
        onEnd={async (message: string) => {
          console.log(message.nativeEvent);
          await navigation.navigate('Home');
        }}
        onLoadingFinish={(message: string) => {
          console.log(message.nativeEvent);
          setFileLoaded(true);
          hideWithTimeout(true);
        }}
        onClick={(message: string) => {
          console.log(message.nativeEvent);
          // setFileLoaded(true);
          // setHide(false);
          // hideWithTimeout(true);
          // progress = 
        }}
      />
      {isFileLoaded && !hide ? (
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={true}
          style={styles.controllers /* {zIndex: 1100} */}
          onRequestClose={() => {
            // setHide(!hide);
          }}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => {
              console.log('touched ' + hide);
              setHide(!hide);
            }}>
            <View style={styles.container}>
              <View style={styles.controllers}>
                <Button
                  title={play ? 'Pause' : 'Play'}
                  onPress={() => {
                    console.log(!play);
                    setPlay(!play);
                  }}
                />
              </View>
              <Slider
                maximumValue={100}
                minimumValue={0}
                step={1}
                value={seek}
                onValueChange={(value: number) => setSeek(value)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1 /* justifyContent: 'center', alignItems: 'center' */},
  controllers: {flex: 1, justifyContent: 'center', alignSelf: 'center'},
  videoView: {flex: 1, width: '100%', height: '100%'},
});

export default VideoViewNativeScreen;
