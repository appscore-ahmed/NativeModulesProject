import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, PermissionsAndroid} from 'react-native';
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

const hasAndroidPermissions = async () => {
  const permission_fine_location =
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const permission_coarse_location =
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;

  const hadPermission =
    (await PermissionsAndroid.check(permission_fine_location)) &&
    (await PermissionsAndroid.check(permission_coarse_location));
  if (hadPermission) return true;
  const status = await PermissionsAndroid.requestMultiple([
    permission_fine_location,
    permission_coarse_location,
  ]);
  console.log(status['android.permission.ACCESS_FINE_LOCATION']);
  return (
    status['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
    status['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
  );
};

const GeolocationNPMScreen = () => {
  const [position, setPosition] = useState<coords>();
  const getLocation = () => {
    if (hasAndroidPermissions())
      GeolocationService.getCurrentPosition(
        (position) => {
          setPosition(position);
          console.log(position);
        },
        (error) => console.log(error.code, error.message),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          showLocationDialog: true,
        },
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
