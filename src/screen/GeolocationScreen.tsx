import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet, NativeEventEmitter} from 'react-native';
import {NativeModules} from 'react-native';
import {
  fetchLocation,
  shareToExternal,
  shareType,
} from '../native_module/Modules';

interface coords {
  latitude: number;
  longitude: number;
}

const GeolocationScreen = () => {
  const [coords, setCoords] = useState<coords>({latitude: 0, longitude: 0});
  const [isHidden, setHidden] = useState<Boolean>(true);

  useEffect(() => {
    /*  Testing eventListener */
    const eventEmitter = new NativeEventEmitter(NativeModules.ShareModule);
    const eventListener = eventEmitter.addListener('EventReminder', (event) => {
      console.log(event.share);
    });

    return () => {
      eventListener.remove();
      console.log('listener removed');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>latitude: {coords.latitude}</Text>
      <Text>longitude: {coords.longitude}</Text>
      <View style={styles.buttonViewStyle}>
        <Button
          title="fetch geolocation"
          onPress={async () => {
            await fetchLocation()
              .then((coord: string) => {
                const _coords = JSON.parse(coord);
                setCoords(_coords);
                setHidden(false);
              })
              .catch((e: string) => console.log('ASD', e));
          }}
        />
      </View>
      {!isHidden && (
        <View style={styles.buttonViewStyle}>
          <Button
            title="Share"
            onPress={() => {
              shareToExternal(JSON.stringify(coords), shareType.text);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonViewStyle: {
    marginVertical: 30,
  },
});

export default GeolocationScreen;
