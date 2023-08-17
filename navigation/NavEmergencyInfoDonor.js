import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import tw from 'twrnc';
import MyEmergencrReqDonor from '../screens/emergency-information-donor/MyPostedEmergencyRequests';
import { AuthContext } from '../providers/AuthProvider';
import OfferedEmergencyRequests from '../screens/emergency-information-donor/OfferedEmergencyRequests';
import MyPostedEmergencyRequests from '../screens/emergency-information-donor/MyPostedEmergencyRequests';

const Tab = createMaterialTopTabNavigator();

const NavEmergencyInfoDonor = () => {

    // const { user } = useContext(AuthContext);
    // console.log(user)

    return (
        <Tab.Navigator
            style={tw`pt-12 bg-white shadow-none`}
            tabBarOptions={{
                activeTintColor: '#DC2626',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                style: {
                    backgroundColor: 'white',
                    elevation: 0,
                },
                indicatorStyle: {
                    backgroundColor: '#DC2626',
                },
            }}
        >
            <Tab.Screen name="My Requests" component={MyPostedEmergencyRequests} />
            <Tab.Screen name="Offered Requests" component={OfferedEmergencyRequests} />
            {/* <Tab.Screen name="Applied Requests" component={appliedEmergencyReqDonor} /> */}
           


        </Tab.Navigator>
    )
}

export default NavEmergencyInfoDonor