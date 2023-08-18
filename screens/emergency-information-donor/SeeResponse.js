import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import {
    MaterialIcons,
} from '@expo/vector-icons'

const SeeResponse = ({ responseEmail }) => {

    console.log(responseEmail);
    const [allInfoOfResponse, setAllInfoOfResponse] = useState([]); // stores all the information details of each response 

    // fetch all the information of the responded email who offered help.
    useEffect(() => {
        fetch(`http://192.168.0.103:5000/emergency-requests/each-response/all-information/${responseEmail}`)
            .then(response => response.json())
            .then(data => setAllInfoOfResponse(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    const handleEmailButtonPress = (emailAddress) => {
        const emailAddressUrl = `mailto:${emailAddress}`;
        Linking.openURL(emailAddressUrl)
            .catch(error => console.error('Error opening email app:', error));
    };
    const handleCallButtonPress = (phoneNumber) => {
        const phoneNumberUrl = `tel:${phoneNumber}`;
        Linking.openURL(phoneNumberUrl)
            .catch(error => console.error('Error opening phone app:', error));
    };


    return (
        <SafeAreaView style={tw`flex-1 px-0 pt-0 bg-white w-full`}>
            <FlatList
                style={tw`w-full mt-0 pb-3.5 bg-white`}
                data={allInfoOfResponse}

                renderItem={({ item }) => (
                    <View style={tw`mx-4 px-4 py-3 bg-white border  shadow-xl rounded-xl`}>
                        <Text style={tw`text-xl mb-2 font-medium`}>{item.name}</Text>
                        <View style={tw`bg-red-600 mb-2 flex justify-center items-center w-14 rounded-xl text-white h-14`}>
                            <Text style={tw`text-xl font-bold text-white`}>{item?.bloodType}</Text>
                        </View>
                        <Text onPress={() => handleEmailButtonPress(item.email)} style={tw`text-base underline mb-1`}>{item.email}</Text>

                        <View style={tw`flex flex-row items-center gap-2`}>
                            <Text style={tw`text-base mb-1`}>Phone: {item?.phone}</Text>
                            <TouchableOpacity onPress={() => handleCallButtonPress(item.phone)} style={tw`bg-green-600 rounded-full px-2 py-1 w-24 flex flex-row gap-1 items-center justify-center`}>
                                <Text style={tw`text-white font-semibold uppercase mb-0.5`}>Call</Text>
                                <MaterialIcons
                                    name="call"
                                    size={14}
                                    color={
                                        '#FFFFFF'
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={tw`text-base mb-1`}>{item?.area}</Text>

                        <View style={tw`flex flex-row-reverse gap-2`}>
                            <TouchableOpacity style={tw`bg-gray-600 rounded-full px-2.5 py-1.5 flex flex-row gap-1 items-center justify-center`}>
                                <Text style={tw`text-white`}>Cancel if Blood is managed</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                )}

                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    )
}

export default SeeResponse