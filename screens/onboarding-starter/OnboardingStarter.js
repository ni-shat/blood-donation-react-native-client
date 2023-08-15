import { View, Text, Image, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import tw from 'twrnc';


const Dots = ({ selected }) => {
    return (
        <View
            // style={{
            //     backgroundColor: 'white'
            // }}
            style={tw`${selected ? 'bg-red-500' : 'bg-gray-400'} h-2 w-2 mx-1 rounded-full`}
        />
    )
}

const Done = ({ ...props }) => (
    // console.log(...props)
    <TouchableOpacity
        {...props}
    >
        <Text style={tw`text-red-500 font-bold mx-5`}>Done</Text>
    </TouchableOpacity>
)

const OnboardingStarter = ({ navigation }) => {

    return (
        <Onboarding
            style={tw`bg-white flex-1 font-semibold`}
            onSkip={() => navigation.navigate('Home')}
            onDone={() => navigation.navigate('get-started')}
            DotComponent={Dots}
            DoneButtonComponent={Done}
            bottomBarColor='#ffffff'
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={tw`w-[300px] h-[300px] `} source={require('../../assets/find-donor-bg.jpg')} />,
                    title: 'Find Blood Donor',
                    subtitle: 'Join our community to easily find blood donors in your area!',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={tw`w-[330px] h-[300px] mt-0 -mb-2`} source={require('../../assets/home-bg-.jpg')} />,
                    title: 'Become a Blood Donor',
                    subtitle: 'Step forward as a blood donor and bring hope to those in need!',
                }

            ]}
        />
    )
}



export default OnboardingStarter