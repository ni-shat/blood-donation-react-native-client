import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import tw from 'twrnc';
import AllEmergencyRequests from '../screens/emergency-request/AllEmergencyRequests';
import AddEmergencyRequest from '../screens/emergency-request/AddEmergencyRequest';

const Tab = createMaterialTopTabNavigator();

// const screenOptions = {
//     tabBarShowLabel: false,
//     headerShown: false,
//     tabBarHideOnKeyboard: true,
//     tabBarStyle: {
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         left: 0,
//         elevation: 0,
//         height: 60,
//         background: 'white',
//     },
// }


const TopTabNavOfEmergencyRequest = () => {
    return (
        <Tab.Navigator
            // screenOptions={screenOptions}
            style={tw`pt-12 bg-white shadow-none`}
            tabBarOptions={{
                activeTintColor: '#DC2626',     // Color of the active tab label
                inactiveTintColor: 'gray',   // Color of inactive tab labels
                labelStyle: {
                    fontSize: 16,              // Font size of tab labels
                    fontWeight: 'bold',       // Font weight of tab labels
                },
                style: {
                    backgroundColor: 'white',  // Background color of the tab bar
                    elevation: 0,
                },
                indicatorStyle: {
                    backgroundColor: '#DC2626',   // Color of the indicator bar at the bottom of the active tab
                },
            }}
        >
            <Tab.Screen name="all requests" component={AllEmergencyRequests} />
            <Tab.Screen name="add request" component={AddEmergencyRequest} />
        </Tab.Navigator>
    )
}

export default TopTabNavOfEmergencyRequest