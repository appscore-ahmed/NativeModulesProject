import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import VideoView from '../native_module/VideoView';
import CustomView from '../native_module/CustomView';
import {useNavigation} from '../hooks/useNavigation';

const VideoViewNativeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <VideoView
        style={styles.videoView}
        url="https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"
        play
        onEnd={async (message: string) => {
          console.log(message.nativeEvent);
          await navigation.navigate('Home');
        }}
        onLoadingFinish={(message: string) => {
          console.log(message.nativeEvent);
        }}
      />
      {/* <CustomView style={styles.videoView}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1 /* justifyContent: 'center', alignItems: 'center' */},
  videoView: {flex: 1, width: '100%', height: '100%'},
});

export default VideoViewNativeScreen;
