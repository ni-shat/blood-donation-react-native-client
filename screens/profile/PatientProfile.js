import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const PatientProfile = () => {

  const navigation = useNavigation();

  return (
    <View style={tw`-mt-0  w-[87%] mx-auto`}>
      <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
        <Pressable onPress={() => navigation.navigate('emergency-request')} style={tw`border border-gray-200 flex-3 h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-red-400 shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/emergency.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-white`}>
            Emergency Blood Request Notifications
          </Text>
        </Pressable>

        <View style={tw`border border-gray-200 flex-1 h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/emergency.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Request History</Text>
        </View>

      </View>
      <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
        {/* print requests of post here
         */}
        <View></View>
      </View>
    </View>
  )
}

export default PatientProfile