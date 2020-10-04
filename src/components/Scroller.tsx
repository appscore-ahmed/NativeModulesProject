import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';

const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
const cards = Array(20).fill(0);

class Scroller extends Component {
  render() {
    return (
      <ScrollView horizontal style={styles.scroll}>
        {cards.map((v, index) => {
          return (
            <View
              key={index}
              style={[styles.card, {backgroundColor: randomHsl()}]}>
              {/* <Text>This is the the test</Text> */}
            </View>
            // <Image
            //   style={{width: 200, height: '100%', zIndex: 1}}
            //   source={{uri: 'file:///storage/emulated/0/Pictures/Title.jpg'}}
            // />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    // flex: 1,
    height: 300,
  },
  card: {
    height: '100%',
    width: 200,
  },
});

export default Scroller;
