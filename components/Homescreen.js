
import React, { useContext } from 'react';
import { View, Text, Button, Image, ImageBackground, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../providers/AuthProvider';



function Homescreen({ navigation }) {

  const { user } = useContext(AuthContext);

  const handleFindDonors = () => {
    navigation.navigate('search-donors');
  }
  const handleBecomeDonor = () => {
    if (!user) {
      navigation.navigate('login', {
        userRole: 'Donor',
      });
    } else {
      navigation.navigate('Profile');
    }
  }
  const handleEmergencyRequest = () => {
    if (!user) {
      navigation.navigate('login', {
        userRole: 'Patient',
      });
    } else {
      navigation.navigate('emergency-request');
    }
  }
  const handleRequestBlood = () => {
    if (!user) {
      navigation.navigate('login', {
        userRole: 'Patient',
      });
    } else {
      navigation.navigate('emergency-request' , { screen: 'add request' });
    }
  }

  return (
    <SafeAreaView style={tw`flex-1 flex pt-10 items-center bg-white`}>
      <StatusBar style='dark' />
      <View>
        <Text style={tw`text-gray-800 text-xl font-bold mb-6 uppercase `}>Welcome to <Text style={tw`text-red-500`}>Blood Help</Text></Text>
      </View>
      <View style={tw`w-full shadow-2xl shadow-black rounded-xl`}>
        <Image style={tw`w-[95%] h-[200px] mx-auto rounded-xl `} source={require('../assets/bggg.jpg')} />
      </View>

      <View style={tw`mt-10  w-[87%] mx-auto`}>
        <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
          <TouchableOpacity onPress={handleFindDonors} style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-red-400 shadow-2xl shadow-black`}>
            <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../assets/find-.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-white`}>Find Donors</Text>
          </TouchableOpacity>
          <Pressable onPress={handleBecomeDonor} style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
            <Image style={tw`w-10 h-10 mx-auto rounded-xl `} source={require('../assets/become.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-gray-800`}>Become a Donor</Text>
          </Pressable>
        </View>
        <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
          <Pressable onPress={handleEmergencyRequest} style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
            <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../assets/emergency.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-gray-800`}>Emergency Requests</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('testimonial')} style={tw`border border-gray-200 w-[47%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
            <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../assets/review.png')} />
            <Text style={tw`text-[15px] mt-1 font-medium leading-7 uppercase text-gray-800`}>Testimonials</Text>
          </Pressable>
        </View>
      </View>

      {/* <View style={tw`w-full mt-4 `}> */}
        <TouchableOpacity  onPress={handleRequestBlood}  style={tw`bg-red-500 mt-4  rounded-md py-3 w-[87%] mx-auto flex flex-row gap-2 justify-center items-center`}>
          <Text style={tw`text-white font-semibold text-base text-center uppercase`}>Request Blood</Text>
          <FontAwesome5 style={tw`text-[20px] text-white mt-0.5`} name={'angle-right'} />
        </TouchableOpacity>
      {/* </View> */}

    </SafeAreaView>
  );
}

export default Homescreen;
