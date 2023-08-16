import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import tw from 'twrnc';
import MyEmergencrReqDonor from '../screens/emergency-information-donor/MyEmergencrReqDonor';
import AppliedEmergencyReqDonor from '../screens/emergency-information-donor/appliedEmergencyReqDonor';

const Tab = createMaterialTopTabNavigator();

const NavEmergencyInfoDonor = () => {



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
            <Tab.Screen name="My Requests" component={MyEmergencrReqDonor} />
            <Tab.Screen name="Applied Requests" component={AppliedEmergencyReqDonor} />


        </Tab.Navigator>
    )
}

export default NavEmergencyInfoDonor