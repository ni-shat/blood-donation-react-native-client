import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const DonorProfile = () => {
  return (
    <View style={tw`mt-0  w-[87%] mx-auto`}>
      <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
        <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-sky-100 shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/emergency.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-black`}>Donation Requests</Text>
        </View>

        <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-10 h-10 mx-auto rounded-xl `} source={require('../../assets/become.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Profile Information</Text>
        </View>

      </View>
      <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
        <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/emergency.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Donation History</Text>
        </View>
        <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/review.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Settings</Text>
        </View>
      </View>
    </View>

  )
}

export default DonorProfile