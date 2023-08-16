import { View, Text, Image, Touchable, Pressable, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc';
import {
  MaterialIcons,
} from '@expo/vector-icons'
import { AuthContext } from '../../providers/AuthProvider';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AllDonors = ({ navigation }) => {

  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://192.168.0.105:5000/alldonors')
      .then(response => response.json())
      .then(data => setDonors(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

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

  const filteredDonors = donors.filter(donor =>
    donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={tw`relative flex-1 bg-white`} >
      <View style={tw`relative -top-2 `}>
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

          <Text style={tw`font-bold text-xl px-3.5 uppercase`}>Find Blood Donors</Text>

          <FlatList
            style={tw`w-full mt-5 pb-3.5 bg-white`}
            data={filteredDonors}
            renderItem={({ item }) => (
              // start rendered component
              // <View style={tw`bg-white w-full rounded-xl mb-3.5 shadow-2xl`}>

              <View style={tw`flex flex-row gap-3 items-center bg-white py-4 mt-2 w-full rounded-xl mb-1.5 shadow-2xl`}>
                <View style={tw`flex flex-row flex-3 gap-4 items-center`}>
                  <View style={tw`rounded-full relative px-2 `}>
                    {/* <Image style={tw`w-14 h-32 rounded-xl `} source={require('../../assets/drop.jpg')} /> */}
                    <View style={tw`bg-red-500 rounded-xl flex justify-center items-center w-14 h-14`}>
                      <Text style={tw` font-extrabold text-3xl text-white`}>{item.bloodType}</Text>
                    </View>
                  </View>
                  <View style={tw` w-52 `}>
                    <Text style={tw`text-black text-xl font-medium`}>{item.name}</Text>
                    <Text style={tw`text-black text-base font-normal`}>{item.area}</Text>
                  </View>
                </View>
                <View style={tw`flex-1 mr-3.5`}>
                  <TouchableOpacity onPress={handleRequest} style={tw`bg-red-500 rounded-full pl-2 pr-0.5 py-1 w-24 flex flex-row gap-0 items-center justify-center mb-1.5`}>
                    <Text style={tw`text-white font-semibold uppercase mb-0.5`}>Request</Text>
                    <MaterialIcons
                      style={tw`mb-0.5`}
                      name="keyboard-arrow-right"
                      size={19}
                      color={
                        '#FFFFFF'
                      }
                    />
                  </TouchableOpacity>
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
              </View>



            )}
            keyExtractor={item => item._id}
          />




        </View>

      </View>
    </View>
  )
}

export default AllDonors



{/* <View style={tw`flex flex-col -mt-[110px] py-2 px-7 mb-10 gap-2 w-full items-end justify-end `}>
          <View style={tw`border shadow-2xl shadow-black  border-gray-200 w-36 h-10 flex justify-center items-center rounded-xl px-2 bg-white `}>
            <Text style={tw`text-[15px] text-center font-medium leading-7 capitalize text-gray-800`}>
              10 request
            </Text>
          </View>
          <View style={tw`border shadow-2xl shadow-black  border-gray-200 w-36 h-10 flex justify-center items-center rounded-xl px-2 bg-red-400 `}>
            <Text style={tw`text-[15px] text-center font-semibold leading-7 capitalize text-white`}>
              20 Life Saved
            </Text>
          </View>
        </View> */}