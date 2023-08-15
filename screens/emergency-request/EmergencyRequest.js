import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const EmergencyRequest = () => {

    const route = useRoute();
    console.log(route)

    return (
        <View>
            <Text>EmergencyRequest</Text>
        </View>
    )
}

export default EmergencyRequest