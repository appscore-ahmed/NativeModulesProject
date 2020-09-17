import React from 'react';
import {View, StyleSheet} from 'react-native';
import VideoView from '../native_module/VideoView';

const VideoViewNativeScreen = () => {
  return (
    <View style={styles.container}>
      <VideoView
        style={styles.videoView}
        url="https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"
        play={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  videoView: {flex: 1, width: '100%', height: '100%'},
});

export default VideoViewNativeScreen;
