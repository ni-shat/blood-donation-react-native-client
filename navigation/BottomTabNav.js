import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    SimpleLineIcons,
    AntDesign,
    MaterialIcons,
    Fontisto,
} from '@expo/vector-icons'
import Homescreen from '../components/Homescreen';
import AllDonors from '../screens/all-donors/AllDonors';
import DonationRequest from '../screens/donation-request/DonationRequest';
import Profile from '../screens/profile/Profile';

const Tab = createBottomTabNavigator();

// for designing navbar 
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: 'white',
    },
}

const BottomTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={screenOptions} //Default options to use for the screens in the navigator.
        >
            <Tab.Screen
                name="Home"
                component={Homescreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <SimpleLineIcons
                                name="home"
                                size={24}
                                color={
                                    focused
                                        ? '#DC2626'
                                        : "#4B5563"
                                }
                            />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="search-donors"
                component={AllDonors}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                                name="search1"
                                size={24}
                                color={
                                    focused
                                        ? '#DC2626'
                                        : "#4B5563"
                                }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="DonationRequest"
                component={DonationRequest}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialIcons
                                name="show-chart"
                                size={24}
                                color={
                                    focused
                                        ? '#DC2626'
                                        : "#4B5563"
                                }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                                name="user"
                                size={24}
                                color={
                                    focused
                                        ? '#DC2626'
                                        : "#4B5563"
                                }
                            />
                        )
                    },
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTabNav