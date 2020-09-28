import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import Video from 'react-native-video';
import useOrientation from '../hooks/useOrientation';
import {OrientationEnum} from '../styles/OrientationEnum';

const VideoNPMScreen = () => {
  const ref = useRef<Video>(null);
  const [orientation, setOrientation] = useState<Boolean>();

  useEffect(() => {
    Orientation.addDeviceOrientationListener((orientation) => {
      setOrientation(orientation === 'PORTRAIT');
    });
  }, []);

  return (
    // <View>
    <Video
      source={{
        uri: 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4',
      }}
      ref={ref}
      onVideoEnd={console.log}
      onError={console.log}
      style={styles.video}
      resizeMode="stretch"
      controls={true}
      fullscreen={!orientation}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // flex: 1,
    // width: '100%',
  },
});

export default VideoNPMScreen;
