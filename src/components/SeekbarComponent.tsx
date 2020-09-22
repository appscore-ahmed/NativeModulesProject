import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

interface VideoControl {
  videoProgress: number;
  getUserSeek: (seekProgress: number) => void;
}

const SeekbbarComponent = (props: VideoControl) => {
  const [progress, setProgress] = useState<number>(0);

  setProgress(props.videoProgress);

  return (
    <View>
      <Slider
        maximumValue={100}
        minimumValue={0}
        step={1}
        value={progress}
        onValueChange={(value: number) => {
          setProgress(value);
          props.getUserSeek(value)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1 /* justifyContent: 'center', alignItems: 'center' */},
});

export default SeekbbarComponent;
