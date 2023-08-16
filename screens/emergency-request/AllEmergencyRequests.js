import { View, Text, Image, Touchable, Pressable, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc';
import { AuthContext } from '../../providers/AuthProvider';

import {
  MaterialIcons,
} from '@expo/vector-icons'
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmergencyRequestItem from './EmergencyRequestItem';


const AllEmergencyRequests = () => {

  const [EmergencyRequests, setEmergencyRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://192.168.0.105:5000/all-emergency-requests')
      .then(response => response.json())
      .then(data => setEmergencyRequests(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  const filteredAllRequests = EmergencyRequests.filter(request =>
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


  return (
    <View style={tw`relative flex-1 bg-white`} >
      <View style={tw`relative -top-12 `}>
        <Image style={tw`w-full`} source={require('../../assets/wave-all.png')} />
        <View style={tw`absolute top-[90px] px-1.5 flex justify-between items-start gap-0 w-full`}>

          <Pressable style={tw`flex w-full items-end mb-5`}>
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

          <Text style={tw`font-bold text-xl px-3.5 uppercase`}>All Emergency Requests</Text>

          <FlatList
            style={tw`w-full mt-5 pb-3.5 bg-white`}
            data={filteredAllRequests}

            renderItem={({ item }) => (
              // <EmergencyRequestItem item={item} handleCallButtonPress={handleCallButtonPress} />
              <EmergencyRequestItem item={item} handleCallButtonPress={handleCallButtonPress}></EmergencyRequestItem>
            )}
          
            keyExtractor={item => item._id}
          />




        </View>

      </View>
    </View>
  )
}

export default AllEmergencyRequests