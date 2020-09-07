// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;

import * as React from 'react';
// import { StyleSheet, View, Text, Button, Alert, Image } from 'react-native';
// import NativeModule from './CustomModules';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CameraScreen from './src/screen/CameraScreen';

const navigator = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Camera',
    defaultNavigationOptions: {
      title: 'Native Module',
    },
    headerMode: 'none',
  },
);

const App = createAppContainer(navigator);

export default () => <App />;

// export default function App() {
//   const [result, setResult] = React.useState<number | undefined>();
//   const [resultAdd, setResultAdd] = React.useState<number | undefined>();
//   const [text, setText] = React.useState<string | undefined>();

//   // const promiseTest = async () => {
//   //   try {
//   //     var a = ToastExample.callbackMethodWithPromise(123);
//   //     setResult(a);
//   //   } catch (e) {
//   //     setText(e);
//   //   }
//   // };

//   React.useEffect(() => {
//     // AwesomeModule.multiply(19, 7).then(setResult);
//     // AwesomeModule.add(2, 3).then(setResultAdd);

//     NativeModule.ToastExample.show('test', NativeModule.ToastExample.SHORT);
//     NativeModule.ToastExample.showLonger('message');

//     NativeModule.ToastExample.returnSomeString().then(setText);
//     NativeModule.ToastExample.callbackMethod(
//       23,
//       (msg: any) => {
//         setResultAdd(msg);
//         NativeModule.ToastExample.showLonger(`${msg}`);
//       },
//       (msg: any) => {
//         setResult(msg);
//       }
//     );
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Result multiply: {result}</Text>
//       <Text>Result addition: {resultAdd}</Text>
//       <Text>demo text: {text}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   stretch: {
//     width: 200,
//     height: 200,
//     resizeMode: 'stretch',
//   },
// });

// import React from 'react';
// import {View, Text} from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
// });

// export default createAppContainer(AppNavigator);
