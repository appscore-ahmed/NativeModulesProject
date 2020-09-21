import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import VideoView from '../native_module/VideoView';
import {useNavigation} from '../hooks/useNavigation';

const VideoViewNativeScreen = () => {
  const navigation = useNavigation();
  const [play, setPlay] = useState<Boolean>(true);
  const [isFileLoaded, setFileLoaded] = useState<Boolean>(false);
  const [hide, setHide] = useState<Boolean>(true);

  const hideWithTimeout = (isHide: Boolean) => {
    setTimeout(() => {
      setHide(isHide);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.videoView}
        url="https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"
        play={play}
        onEnd={async (message: string) => {
          console.log(message.nativeEvent);
          await navigation.navigate('Home');
        }}
        onLoadingFinish={(message: string) => {
          console.log(message.nativeEvent);
          setFileLoaded(true);
          hideWithTimeout(false);
        }}
        onClick={(message: string) => {
          console.log(message.nativeEvent);
          setFileLoaded(true);
          setHide(true);
          hideWithTimeout(false);
        }}
      />
      {isFileLoaded && hide ? (
        <View>
          <Button
            title={play ? 'Pause' : 'Play'}
            onPress={() => {
              console.log(!play);
              setPlay(!play);
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1 /* justifyContent: 'center', alignItems: 'center' */},
  videoView: {flex: 1, width: '100%', height: '100%'},
});

export default VideoViewNativeScreen;
