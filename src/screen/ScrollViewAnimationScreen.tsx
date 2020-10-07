import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Scroller from '../components/Scroller';

const ScrollViewAnimationScreen = () => {
  const screenHeight = Dimensions.get('window').height;

  const [animation, setAnimation] = useState<any>(new Animated.Value(0));

  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [screenHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const handleOpen = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [0, -1 * screenHeight],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
  const cards = Array(20).fill(0);

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          zIndex: 0,
          width: '100%',
          alignSelf: 'center',
          backgroundColor: '#ff3345'
        }}>
        <TouchableOpacity onPress={handleOpen}>
          <Text>Open</Text>
        </TouchableOpacity>
      </View>

      {/* <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}> */}
      {/* <View style={[styles.sheet]}> */}
      <Animated.ScrollView horizontal={false} style={[styles.popup, slideUp]}>
        <TouchableOpacity onPress={handleClose}>
          <Text>Close</Text>
        </TouchableOpacity>
        {/* <Scroller /> */}
        {cards.map((v, index) => {
          return (
            <View
              key={index}
              style={[styles.card, {backgroundColor: randomHsl()}]}>
              <Text>This is the the test</Text>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  sheet: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',

    paddingTop: 40,
  },
  popup: {
    // backgroundColor: '#FFF',
    // marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    minHeight: 80,
    paddingTop: 35,

    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    // justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    height: 200,
    zIndex: 1,
  },
});

export default ScrollViewAnimationScreen;
