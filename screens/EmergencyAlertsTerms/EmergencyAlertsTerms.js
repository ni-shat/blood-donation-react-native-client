import { View, Text, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const EmergencyAlertsTerms = () => {

    const navigation = useNavigation();

    return (
        <View style={tw`pt-0 bg-white flex-1`}>
            <View style={tw`relative -top-2 `}>
                <Image style={tw`w-full`} source={require('../../assets/wave-haike.png')} />
                {/* <View style={tw`absolute top-20 px-6 flex-1  gap-0 w-full`}> */}
                <Text style={tw`text-white text-xl absolute top-20 px-6 font-medium capitalize`}>Emergency Alerts Service Terms and Conditions</Text>

                <ScrollView style={tw` -top-28 mb-48 px-6 gap-0 w-full`}>

                    <View style={tw`pt-20`}>
                        <View style={tw`mb-5`}>
                            <Text style={tw`text-xl bg-white rounded-md w-[90%] px-2 py-2 mb-2.5 font-semibold`}>
                                1. Consent for Location Sharing:
                            </Text>
                            <Text style={tw`text-base font-normal`}>
                                By using our Emergency Alerts Service, you give us your explicit consent to collect and use your current location for the purpose of delivering relevant emergency blood requests alerts to you. We take your privacy seriously, and we will only use your location information for the sole purpose of sending you emergency alerts in your area.
                            </Text>
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`text-xl bg-white rounded-md w-[90%] px-2 py-2 mb-2.5 font-semibold`}>
                                2. Updating Your Location:
                            </Text>
                            <Text style={tw`text-base font-normal`}>
                                Your location may change over time. So you can update it anytime by clicking 'Update Location' in the EMERGENCY ALERT section on your dashboard. This helps ensure relevant alerts for you
                            </Text>
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`text-xl bg-white rounded-md w-[90%] px-2 py-2 mb-2.5 font-semibold`}>
                                3. Location Accuracy:
                            </Text>
                            <Text style={tw`text-base font-normal`}>
                                Our service relies on accurate location information to provide you with timely alerts. We use location data to determine your proximity to emergency situations and send you alerts that could potentially affect your safety. Please ensure that your device's location settings are accurate to receive the most relevant alerts.
                            </Text>
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`text-xl bg-white rounded-md w-[90%] px-2 py-2 mb-2.5 font-semibold`}>
                                4. Data Security and Privacy:
                            </Text>
                            <Text style={tw`text-base font-normal`}>
                                We are committed to protecting your personal information. Your location data will be securely stored and used only for the purpose of sending emergency alerts. We do not share or sell your location information to third parties for marketing purposes.
                            </Text>
                        </View>
                    </View>

                    {/* <Pressable onPress={navigation.navigate('bottom-tab-nav' , { screen: 'Profile' })} style={tw`rounded-md border px-2 py-2 mb-6 mt-2`}>
                        <Text style={tw`text-center`}>Go back to dashboard</Text>
                    </Pressable> */}
                </ScrollView>
                {/* </View> */}
            </View>
        </View>
    )
}

export default EmergencyAlertsTerms