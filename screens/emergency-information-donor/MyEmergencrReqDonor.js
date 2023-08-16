import { View, Text, Image, Touchable, Pressable, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import EmergencyRequestItem from '../emergency-request/EmergencyRequestItem';
import tw from 'twrnc';


import { MaterialCommunityIcons } from '@expo/vector-icons';



const MyEmergencrReqDonor = () => {

  const [myEmergencyRequests, setMyEmergencyRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://192.168.0.105:5000/my-emergency-requests/${user?.email}`)
      .then(response => response.json())
      .then(data => setMyEmergencyRequests(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  const filteredMyRequests = myEmergencyRequests.filter(request =>
    request.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );



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

          <Text style={tw`font-bold text-xl px-3.5 uppercase`}>My Emergency Requests</Text>

          {
            filteredMyRequests.length ?
              <FlatList
                style={tw`w-full mt-5 pb-3.5 bg-white`}
                data={filteredMyRequests}

                renderItem={({ item }) => (
                  <EmergencyRequestItem item={item} handleCallButtonPress={handleCallButtonPress}></EmergencyRequestItem>
                )}

                keyExtractor={item => item._id}
              />

              :

              <View style={tw`my-20 mx-auto bg-gray-100 px-4 py-20 rounded-xl`}>
                <Text style={tw`text-3xl  font-semibold mx-auto text-center`}>No requests Found.</Text>
              </View>
          }




        </View>

      </View>
    </View>
  )
}

export default MyEmergencrReqDonor