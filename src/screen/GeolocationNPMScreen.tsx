import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, ActivityIndicator} from 'react-native';
import GeolocationService from 'react-native-geolocation-service';

interface coords {
  coords: position;
}

interface position {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  altitudeAccuracy: number | null;
}

const GeolocationNPMScreen = () => {
  const [position, setPosition] = useState<coords>();
  const getLocation = () => {
    GeolocationService.getCurrentPosition(
      (position) => {
        setPosition(position);
        console.log(position);
      },
      (error) => console.log(error.code, error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  return (
    <View style={styles.container}>
      <Text>Geolocation</Text>

      <Text>Latitude: {position?.coords.latitude}</Text>
      <Text>Longitude: {position?.coords.longitude}</Text>

      <View style={styles.button}>
        <Button
          title="Get Location"
          onPress={() => {
            getLocation();
            setPosition(undefined);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    marginVertical: 20,
  },
});

export default GeolocationNPMScreen;
