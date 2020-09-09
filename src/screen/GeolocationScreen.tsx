import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import NativeModules from '../CustomModules';

interface coords {
  latitude: number;
  longitude: number;
}

const GeolocationScreen = () => {
  //   const [latitude, setLatitude] = useState<number>(0);
  //   const [longitude, setLongitude] = useState<number>(0);
  const [coords, setCoords] = useState<coords>({latitude: 0, longitude: 0});

  return (
    <View style={styles.container}>
      <Text>latitude: {coords.latitude}</Text>
      <Text>longitude: {coords.longitude}</Text>
      <View style={styles.buttonViewStyle}>
        <Button
          title="fetch geolocation"
          onPress={async () => {
            await NativeModules.GeolocationModule.fetchLocation()
              .then((coord: string) => {
                const _coords = JSON.parse(coord);
                setCoords(_coords);
              })
              .catch((e: string) => console.log('ASD', e));
          }}
        />
      </View>
      {coords.latitude !== 0 ? (
        <View style={styles.buttonViewStyle}>
          <Button
            title="Share"
            onPress={() => {
              NativeModules.ShareModule.shareText(JSON.stringify(coords));
            }}
          />
        </View>
      ) : null}
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
