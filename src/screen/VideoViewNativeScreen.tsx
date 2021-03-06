import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, Modal, TouchableOpacity} from 'react-native';
import VideoView from '../native_module/VideoView';
import {useNavigation} from '../hooks/useNavigation';
import Seekbar from '../components/SeekbarComponent';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

let progress = 0;

const VideoViewNativeScreen = () => {
  const navigation = useNavigation();
  const [play, setPlay] = useState<Boolean>(true);
  const [isFileLoaded, setFileLoaded] = useState<Boolean>(false);
  const [hide, setHide] = useState<Boolean>(false);
  const [seek, setSeek] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<number>(0);
  const [isFullscreen, setFullscreen] = useState<Boolean>(false);

  useEffect(() => {
    Orientation.lockToAllOrientationsButUpsideDown();
  }, []);

  const hideWithTimeout = (isHide: Boolean) => {
    setTimeout(() => {
      setHide(isHide);
    }, 5000);
  };

  const setViewFullscreen = () => {
    if (isFullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

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
          setFileLoaded(true);
          setHide(false);
          hideWithTimeout(true);
        }}
        totalProgress={(totalProgress: number) => {
          console.log(totalProgress.nativeEvent.totalProgress);
          setTotalProgress(totalProgress.nativeEvent.totalProgress);
        }}
        onProgress={(progress: number) => {
          // console.log(progress.nativeEvent);
          setSeek(progress.nativeEvent.progress);
        }}
      />
      {isFileLoaded && !hide ? (
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={true}
          style={styles.controllers /* {zIndex: 1100} */}
          onRequestClose={() => {
            setHide(!hide);
          }}
          >
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

                <Button
                  title={isFullscreen ? 'Original Screen' : 'Fullscreen'}
                  onPress={() => {
                    setFullscreen(!isFullscreen);
                    setViewFullscreen();
                  }}
                />
              </View>
              <Slider
                style={styles.slider}
                maximumValue={totalProgress}
                minimumValue={0}
                step={1}
                value={seek}
                onValueChange={(value: number) => {
                  // setSeek(value);
                  setHide(false);
                }}
                onSlidingStart={(value: number) => {
                  console.log('sliding started ' + value);
                  setPlay(false);
                  setHide(false);
                }}
                onSlidingComplete={(value: number) => {
                  console.log('sliding stopped ' + value);
                  setSeek(value);
                  setPlay(true);
                  setHide(true);
                }}
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
  controllers: {
    flex: 1,
    justifyContent: 'space-around',
    // alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoView: {flex: 1, width: '100%', height: '100%'},
  slider: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default VideoViewNativeScreen;
