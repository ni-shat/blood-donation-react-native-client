import { View, Text, Image, Touchable, Pressable, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc';
import { AuthContext } from '../../providers/AuthProvider';

import {
  MaterialIcons,
} from '@expo/vector-icons'
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmergencyRequestItem from './EmergencyRequestItem';
import useAllEmergencyRequests from '../../hooks/useAllEmergencyRequests';


const AllEmergencyRequests = () => {

  // const [EmergencyRequests, setEmergencyRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);

  const [ allEmergencyRequests, refetch ] = useAllEmergencyRequests();

  // useEffect(() => {
  //   fetch('http://192.168.0.103:5000/all-emergency-requests')
  //     .then(response => response.json())
  //     .then(data => setEmergencyRequests(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, [])

  const filteredAllRequests = allEmergencyRequests.filter(request =>
    request.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequest = () => {
    if (!user) {
      navigation.navigate('login')
    } else {
      // allow user to request FIX
    }
  }

  const handleCallButtonPress = (phoneNumber) => {
    const phoneNumberUrl = `tel:${phoneNumber}`;

    Linking.openURL(phoneNumberUrl)
      .catch(error => console.error('Error opening phone app:', error));
  };

  const handleEmailButtonPress = (emailAddress) => {
    const emailAddressUrl = `mailto:${emailAddress}`;

    Linking.openURL(emailAddressUrl)
      .catch(error => console.error('Error opening email app:', error));
  };


  return (
    <SafeAreaView style={tw`flex-1 px-0 pt-0 pb-16 bg-white w-full`}>

            <Pressable style={tw`flex w-full items-start mx-4 mt-3 mb-5`}>
              <Pressable style={tw`flex flex-row items-center bg-white justify-between gap-3 border rounded-xl px-4 w-52 mr-2 py-1.5`}>
                <TextInput
                  style={tw`flex-7`}
                  placeholder="Search by blood type.."
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                />
                <MaterialCommunityIcons style={tw`flex-1`} name="magnify" size={24} color="black" />
              </Pressable>
            </Pressable>

            <Text style={tw`font-bold text-xl px-3.5 uppercase`}>Check All Emergency Requests</Text>

            <FlatList
              style={tw`w-full mt-5 pb-3.5 bg-white`}
              data={filteredAllRequests}

              renderItem={({ item }) => (
                <EmergencyRequestItem item={item} handleCallButtonPress={handleCallButtonPress} handleEmailButtonPress={handleEmailButtonPress}></EmergencyRequestItem>
              )}

              keyExtractor={item => item._id}
            />




          {/* </View>

        </View>
      </View> */}
    </SafeAreaView>
  )
}

export default AllEmergencyRequests