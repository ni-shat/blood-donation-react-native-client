import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Testimonials = () => {

    const [markers, setMarkers] = useState([
        // An array of marker objects, each representing a donor location
        { id: 1, latitude: 37.78825, longitude: -122.4324, title: 'Donor 1' },
        // ... other markers
    ]);

    // 24.907454, 91.854168

    return (
        <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 24.907454,
            longitude: 91.854168,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
            />
          ))}
        </MapView>
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