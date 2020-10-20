import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CollapsableToolbar = () => {
  const HEADER_EXPANDED_HEIGHT = 300;
  const HEADER_COLLAPSED_HEIGHT = 60;

  const [scrollY, SetScrollY] = React.useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const heroTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  console.log('scrollY: ' + scrollY);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.0)" />
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            zIndex: headerTitleOpacity,
          },
        ]}>
        <Animated.Image
          style={{
            position: 'absolute',
            // bottom: 16,
            // left: 16,
            width: '100%',
            height: '100%',
            opacity: headerTitleOpacity,
          }}
          source={{uri: 'https://picsum.photos/400/300/'}}
          // resizeMode='stretch'
        />
        <Animated.Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: 'white',
            marginTop: 28,
            opacity: headerTitleOpacity,
          }}>
          Header
        </Animated.Text>

        <Animated.Image
          style={{
            position: 'absolute',
            // bottom: 16,
            // left: 16,
            width: '100%',
            height: '100%',
            opacity: heroTitleOpacity,
          }}
          source={{uri: 'https://picsum.photos/400/300/'}}
        />
        <Animated.Text
          style={{
            textAlign: 'center',
            fontSize: 32,
            color: 'white',
            position: 'absolute',
            bottom: 16,
            left: 16,
            opacity: heroTitleOpacity,
          }}>
          Header Title
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: HEADER_EXPANDED_HEIGHT,
          backgroundColor: 'rgba(0,0,0,0.0)',
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <Text style={styles.title}>This is Title</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          eleifend, erat id iaculis feugiat, dolor velit vestibulum elit, non
          efficitur ligula urna quis orci. Maecenas id maximus quam. Praesent
          lorem tellus, elementum eu urna sed, pulvinar hendrerit mauris.
          Praesent in consequat massa. In bibendum ex in turpis elementum, et
          ornare enim tincidunt. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Nam at risus eget justo
          tristique euismod. Duis feugiat enim vel dui ullamcorper, nec accumsan
          neque eleifend. Etiam aliquet, urna vitae aliquet interdum, lectus
          eros elementum magna, eu ultricies tellus velit sed velit. Mauris
          bibendum metus ac urna efficitur tristique. Duis gravida tortor auctor
          sollicitudin tempor. Cras at placerat dui, et semper sapien. Donec nec
          turpis eu felis molestie congue. Mauris sit amet sodales sem, et
          finibus nulla. Suspendisse faucibus, est in tempus pellentesque, ipsum
          sem luctus dolor, tristique bibendum lacus velit at nibh. Integer
          cursus ipsum et dui malesuada, ut malesuada tortor elementum. Integer
          pulvinar ipsum ut molestie vestibulum. Nunc nisl ex, viverra id quam
          sit amet, porta mollis ligula. Vivamus posuere lacus eget blandit
          lobortis. Praesent vel eros auctor, cursus ipsum maximus, tincidunt
          tellus. Curabitur ligula massa, maximus sed odio et, convallis
          condimentum sapien. Praesent turpis nisl, suscipit quis varius a,
          maximus vitae ante. Donec at diam ex. Fusce ut purus felis. In auctor
          lorem quis neque dictum, molestie efficitur sapien eleifend. Aliquam
          at sodales metus. In a viverra enim. Praesent consequat dapibus nunc,
          et pellentesque nisi facilisis non. Aliquam sed elit in turpis iaculis
          eleifend id non justo. Nunc eget lacus et lorem tempor eleifend. Cras
          nec lectus eu lacus interdum ultrices. Pellentesque pellentesque
          lobortis massa sed ultricies. Morbi pulvinar pharetra convallis. Proin
          a convallis felis. Proin nec orci sapien. Pellentesque blandit, purus
          et aliquam interdum, sem nulla iaculis eros, eget semper enim lorem et
          diam. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Duis tempus congue sapien, ut varius elit vestibulum in. Pellentesque
          sed congue leo. Nulla sollicitudin ante sit amet consequat pretium.
          Sed ante ex, mollis id blandit vel, luctus eget orci. Nam elementum
          lacus eu hendrerit lacinia. Donec a velit scelerisque enim sodales
          vulputate. Pellentesque sem dui, vehicula sed vehicula vitae, tempor
          sit amet lectus. Donec faucibus, sem at tempus fermentum, tellus felis
          sollicitudin nulla, a dignissim nibh erat sit amet orci. Pellentesque
          feugiat id odio at tempor. Aliquam ut sapien convallis, placerat
          mauris a, convallis ligula. Sed dictum pulvinar nisl sit amet luctus.
          Aenean metus elit, condimentum tristique facilisis in, ultricies et
          ipsum. Maecenas nec justo eget est rutrum pulvinar. Nulla et gravida
          nulla, sit amet venenatis sem. Mauris nisl nulla, facilisis iaculis
          quam vitae, vehicula scelerisque elit. Nunc sodales risus quis
          interdum cursus. Maecenas libero metus, condimentum eu placerat eu,
          pharetra sit amet arcu. Sed vitae tortor nisl. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed pulvinar erat rutrum
          consectetur pellentesque. Proin lacinia mi vel nisi laoreet placerat.
          Aliquam porttitor molestie leo non ullamcorper. Cras non ante iaculis,
          vehicula ligula a, aliquet eros. Sed ullamcorper magna vestibulum
          justo gravida, quis aliquam diam ullamcorper. Aliquam laoreet leo id
          quam tincidunt elementum. Quisque ullamcorper eros purus, venenatis
          posuere elit consequat sit amet.
        </Text>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  scrollContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'lightblue',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    // zIndex: 9999,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
});

export default CollapsableToolbar;
