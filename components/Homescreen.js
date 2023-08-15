
import React from 'react';
import { View, Text, Button, Image, ImageBackground, Pressable } from 'react-native';
import tw from 'twrnc';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';



function Homescreen({ navigation }) {
  return (
    <SafeAreaView style={tw`flex-1 flex pt-10 items-center bg-white`}>

      <View>
        <Text style={tw`text-gray-800 text-xl font-bold mb-6 uppercase `}>Welcome to <Text style={tw`text-red-500`}>Blood Help</Text></Text>
      </View>
      <View style={tw`w-full shadow-2xl shadow-black rounded-xl`}>
        <Image style={tw`w-[95%] h-[200px] mx-auto rounded-xl `} source={require('../assets/bggg.jpg')} />
      </View>

      <View style={tw`mt-10  w-[87%] mx-auto`}>
        <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
          <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-red-400 shadow-2xl shadow-black`}>
            <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../assets/find-.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-white`}>Find Donors</Text>
          </View>
          <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
            <Image style={tw`w-10 h-10 mx-auto rounded-xl `} source={require('../assets/become.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-gray-800`}>Become a Donor</Text>
          </View>
        </View>
        <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
          <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
            <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../assets/emergency.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-gray-800`}>Emergency Requests</Text>
          </View>
          <View style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
            <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../assets/review.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-gray-800`}>Testimonials</Text>
          </View>
        </View>
      </View>

      <View style={tw`w-full mt-4 `}>
        <Pressable style={tw`bg-red-500 rounded-md py-3 w-[87%] mx-auto flex flex-row gap-2 justify-center items-center`}>
          <Text style={tw`text-white font-semibold text-base text-center uppercase`}>Request Blood</Text>
          <FontAwesome5 style={tw`text-[20px] text-white mt-0.5`} name={'angle-right'} />
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

export default Homescreen;
