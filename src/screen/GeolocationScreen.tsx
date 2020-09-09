import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import NativeModules from '../CustomModules';

const GeolocationScreen = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text>latitude: {latitude}</Text>
      <Text>longitude: {longitude}</Text>
      <View style={styles.buttonViewStyle}>
        <Button
          title="fetch geolocation"
          onPress={async () => {
            await NativeModules.GeolocationModule.fetchLocation()
              .then((coord: string) => {
                const ob = JSON.parse(coord);
                setLatitude(ob.latitude);
                setLongitude(ob.longitude);
              })
              .catch((e: string) => console.log('ASD', e));
          }}
        />
      </View>
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
