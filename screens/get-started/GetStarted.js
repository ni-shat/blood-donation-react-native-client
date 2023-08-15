import React from 'react'
import { View, Text, Button, Image, ImageBackground, Pressable } from 'react-native';
import tw from 'twrnc';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const GetStarted = ({ navigation }) => {
    return (
        <View style={tw`flex-1 flex justify-center pt-0 items-center bg-white`}>
            {/* <ImageBackground source={require('../assets/boy.jpg')} style={tw`bg-white flex-1`}> */}
            <View style={tw`w-full`}>

                <View style={tw`mb-12 `}>
                    <Image style={tw`w-28 h-28 mx-auto mb-3 `} source={require('../../assets/blood-logo.png')} />
                    <View style={tw`mr-4`}>
                        <Image style={tw`w-[100%] h-[320px]  mx-auto`} source={require('../../assets/home-bg.jpg')} />
                    </View>
                    <Text style={tw`text-[18px] leading-7 text-center mt-0 text-gray-600 font-normal w-[80%] mx-auto `}>A Platform Dedicated to Bridging the Gap Between Blood Donors and Those in Need.</Text>
                </View>

                <Pressable
                    onPress={() => navigation.navigate('bottom-tab-nav')}
                    style={tw`bg-red-800  rounded-full py-3 text-center shadow-2xl px-0 shadow-black mx-auto w-[80%] flex flex-row gap-3 justify-center items-center bottom-0 `}>
                    <Text style={tw`text-white font-extrabold text-xl uppercase `}>Get Started</Text>
                    {/* <FontAwesome5 style={tw`text-[20px] text-white mt-0.5`} name={'searchengin'} /> */}
                </Pressable>
            </View>

            {/* </ImageBackground> */}
        </View>
    )
}

export default GetStarted