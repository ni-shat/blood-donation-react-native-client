import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import tw from 'twrnc';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {
    MaterialIcons,
} from '@expo/vector-icons'

const Profile = () => {

    const { user, loading, logOut } = useContext(AuthContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    console.log(user?.photoURL)

    useEffect(() => {
        if (!user && isFocused) {
            navigation.navigate('Home'); // Navigate to Home screen if not logged in
        }
    }, [isFocused]);

    const handleLogout = () => {
        console.log("logout")
        logOut()
        .then(res => {
            navigation.replace('bottom-tab-nav');
        })
        .catch(err => console.log(err))
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    else if (!user) {
        return navigation.push('login')
    }

    // style={tw``}
    else {
        return (
            <View style={tw`pt-0 bg-white flex-1`}>
                <View style={tw`relative -top-2 `}>
                    <Image style={tw`w-full`} source={require('../../assets/wave-haike.png')} />
                    <View style={tw`absolute top-16 px-6  gap-0 w-full`}>
                        <View style={tw`flex flex-row justify-between items-center gap-0 w-full`}>
                            <View style={tw`w-[65%] `}>
                                <Text style={tw`text-white text-xl font-normal`}>Hello,</Text>
                                <Text style={tw`text-white text-2xl mt-1 font-semibold capitalize w-full`}>{user?.displayName}</Text>
                            </View>

                            <Image style={tw`w-[85px] mt-0 h-[85px] border-2 border-white rounded-3xl`}
                                source={{ uri: user?.photoURL }}
                            />
                        </View>
                        <Pressable
                            style={tw` px-0 flex flex-row gap-2 justify-start `}
                            onPress={handleLogout}>
                            {/* <Text style={tw`text-white font-semibold`}>Logout</Text> */}
                            <MaterialIcons
                                style={tw`mt-0.5`}
                                name="logout"
                                size={20}
                                color={
                                    '#FFFFFF'
                                }
                            />
                        </Pressable>
                    </View>




                    <View style={tw`flex flex-col -mt-[110px] py-2 px-7 mb-10 gap-2 w-full items-end justify-end `}>
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
                    </View>

                </View>


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


                <Swiper style={tw`h-[155px] mt-3`} autoplay>
                    <View style={tw`relative`}>
                        <View style={tw`h-[155px] opacity-40 `}>
                            <Image source={require('../../assets/bg-home.jpg')} style={styles.image} resizeMode="cover" />
                        </View>
                        <Pressable style={tw` absolute top-[40%] w-full left-0 right-0`}>
                            <Pressable style={tw`bg-white relative -top-0 w-[55%] mx-auto py-2.5 rounded-xl `}>
                                <Text style={tw`  text-black font-bold text-base uppercase text-center`}>Donate Now</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                    <View style={tw`relative`}>
                        <View style={tw`h-[155px] opacity-40`}>
                            <Image source={require('../../assets/bb.jpg')} style={styles.image} resizeMode="cover" />
                        </View>
                        <Pressable style={tw` absolute top-[40%] w-full left-0 right-0`}>
                            <Pressable style={tw`bg-white relative -top-0 w-[55%] mx-auto py-2.5 rounded-xl `}>
                                <Text style={tw`  text-black font-bold text-base uppercase text-center`}>Share Profile</Text>
                            </Pressable>
                        </Pressable>
                    </View>
                    <View style={tw`relative`}>
                        <View style={tw`h-[155px] opacity-40`}>
                            <Image source={require('../../assets/bgg.jpg')} style={styles.image} resizeMode="cover" />
                        </View>
                        <Pressable style={tw` absolute top-[40%] w-full left-0 right-0`}>
                            <Pressable style={tw`bg-white relative -top-0 w-[55%] mx-auto py-2.5 rounded-xl `}>
                                <Text style={tw`  text-black font-bold text-base uppercase text-center`}>Give Feedbacks</Text>
                            </Pressable>
                        </Pressable>
                    </View>

                </Swiper>


            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    element: {
        // backgroundColor: red,
        opacity: 0.5,
    }
});

export default Profile

/**
 * Profile Information,

Privacy and Settings,  Donation Requests, Donation History:
 */