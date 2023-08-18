import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import LocationInfo from './LocationInfo';
import useLatLongInfo from '../../hooks/useLatLongInfo';

const Testimonials = () => {

  const [markers, setMarkers] = useState([
    // An array of marker objects, each representing a donor location
    { id: 1, latitude: 37.78825, longitude: -122.4324, title: 'Donor 1' },
    // ... other markers
  ]);

  // 24.907454, 91.854168

  

  const [location, setLocation] = useState(null);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    // <View style={styles.container}>
    //   <Text>Latitude and Longitude</Text>
    //   <MapView
    //     style={styles.map}
    //     initialRegion={{
    //       latitude: 24.907454,
    //       longitude: 91.854168,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     }}
    //   >
    //     {markers.map((marker) => (
    //       <Marker
    //         key={marker.id}
    //         coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
    //         title={marker.title}
    //       />
    //     ))}
    //   </MapView>
    // </View>
    <View style={styles.container}>
      {/* <LocationInfo></LocationInfo> */}
      {/* {location && (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )} */}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Testimonials


