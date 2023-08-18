import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const LocationInfo = () => {
  const [locationInfo, setLocationInfo] = useState(null);

  useEffect(() => {
    const getLocationInfo = async () => {
      try {
        const address = 'Sylhet';
        const locationResult = await Location.geocodeAsync(address);

        if (locationResult.length > 0) {
          setLocationInfo(locationResult[0]);
        } else {
          setLocationInfo({ error: 'Location not found' });
        }
      } catch (error) {
        console.error('Error fetching location info:', error);
        setLocationInfo({ error: 'Error fetching location' });
      }
    };

    getLocationInfo();
  }, []);

  console.log(locationInfo)

  return (
    <View>
      {locationInfo ? (
        <Text>
          Latitude: {locationInfo.latitude}
          {'\n'}
          Longitude: {locationInfo.longitude}
        </Text>
      ) : (
        <Text>Loading location info...</Text>
      )}
    </View>
  );
};

export default LocationInfo;
