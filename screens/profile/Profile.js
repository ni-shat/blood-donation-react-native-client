import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import tw from 'twrnc';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {
    MaterialIcons,
} from '@expo/vector-icons'
import DonorProfile from './DonorProfile';
import PatientProfile from './PatientProfile';
import useAllDonors from '../../hooks/useAllDonors';
import useCurrentAvailibility from '../../hooks/useCurrentAvailibility';

const Profile = () => {

    const { user, loading, logOut } = useContext(AuthContext);
    const [loggedUser, setLoggedUser] = useState([]);
    const [loggedUserBloodType, setLoggedUserBloodType] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isAvailable, setIsAvailable] = useState(false);
    const [isPermitted, setIsPermitted] = useState(false); //setting permission of donors for alert

    const [, refetch] = useAllDonors();
    const [currentAvailibilityQuery, currentAvailibilityRefetch] = useCurrentAvailibility();


    useEffect(() => {
        const email = user?.email;
        console.log("email", email)
        console.log("email", email)
        //  192.168.0.103
        fetch(`http://192.168.0.103:5000/users/${email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedUser(data);
                setLoggedUserBloodType(data.bloodType);
                setIsAvailable(data.available); // db er available rakhsi ei state e
            })
            .catch(err => console.log(user?.email, err))
    }, [user?.email])

    console.log(loggedUser)


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
    console.log("loggedUser", loggedUser)

    /**Are you sure you want to mark yourself as unavailable for blood donation? By doing so, your availability will be hidden from those in need of blood. This could be helpful if you're not currently able to donate. Remember that you can always update your availability later. Proceed with marking yourself as unavailable?"
 */

    const handleConfirm = (msg, available) => {

        Alert.alert(
            'Confirm Availability',
            msg,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        //if available true, make not available
                        if (available) {
                            saveAvailability = {
                                available: false
                            }
                        }
                        else {
                            saveAvailability = {
                                available: true
                            }
                        }

                        fetch(`http://192.168.0.103:5000/users/donors/edit-availability/${loggedUser?.email}`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveAvailability)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data) // I get two data / one data. 
                                // Now check what is the length
                                /**
                                 * {"result1": {"acknowledged": true, "matchedCount": 1, "modifiedCount": 1, "upsertedCount": 0, "upsertedId": null}}
                                 * 
                                 * {
                                 * "result1": {"acknowledged": true, "matchedCount": 1, "modifiedCount": 0, "upsertedCount": 0, "upsertedId": null}, 
                                 * "result2": {"acknowledged": true, "matchedCount": 1, "modifiedCount": 0, "upsertedCount": 0, "upsertedId": null}
                                 * }
                                 */
                                if (Object.keys(data) == 1) {
                                    if (data.result1.modifiedCount > 0) {
                                        setIsAvailable(!available);
                                        currentAvailibilityRefetch(); //refetch current availibility
                                        refetch(); //refetch to move the donor from search donors page
                                    }
                                }
                                else {
                                    if (data.result1.modifiedCount > 0 && data.result1.modifiedCount > 0 ) {
                                        setIsAvailable(!available);
                                        currentAvailibilityRefetch();
                                        refetch(); //refetch to move the donor from search donors page
                                    }
                                }
                            })

                    },
                },
            ],
            { cancelable: false }
        );
    }

    const handleEditAvailability = (available) => {
        let msg = "";

        if (available) {
            msg = "Mark yourself as unavailable for blood donation? This could be helpful if you're not currently able to donate. You can update your availability later.\n\nProceed with marking yourself as unavailable?"
        }
        else {
            msg = "Mark yourself as available for blood donation?\nYou'll be listed as a potential donor for those in need."
        }

        handleConfirm(msg, available);
    }



    if (loading) {
        console.log(loading)
        return <ActivityIndicator />
    }
    else if (!user) {
        return navigation.push('login')
    }


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
                    {/* <View style={tw`absolute right-7 top-[90px]`}>
                            <Text style={tw`text-base flex items-end justify-end text-sky-200 italic  capitalize font-semibold px-0`}>{loggedUser?.role === 'donor' && loggedUser?.role}</Text>
                        </View> */}
                    <View style={tw` mb-2 mt-1`}>
                        <Text style={tw`text-base flex items-end justify-end text-sky-200 italic  capitalize font-semibold px-0`}>{loggedUser?.role === 'donor' && loggedUser?.role}</Text>
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



                {
                    loggedUser?.role?.toLowerCase() === 'donor' ?
                        <View style={tw`flex flex-col -mt-[110px] py-2 px-7 mb-10 gap-2 w-full items-end justify-end `}>
                            <View style={tw`border flex-row gap-2 shadow-2xl shadow-black  border-gray-200 w-36 h-10 flex justify-center items-center rounded-xl px-2 bg-white `}>
                                {
                                    isAvailable ?
                                        <>
                                            <Text style={tw`text-[15px] text-center font-medium leading-7 capitalize text-gray-800`}>
                                                Available
                                            </Text>
                                            <View style={tw`w-2.5 mt-0.5 h-2.5 rounded-full bg-green-600`}></View>
                                        </> :
                                        <>
                                            <Text style={tw`text-[15px] text-center font-medium leading-7 capitalize text-gray-800`}>
                                                Unvailable
                                            </Text>
                                        </>
                                }
                                <TouchableOpacity onPress={() => handleEditAvailability(isAvailable)} style={tw` rounded-md`}>
                                    <Image style={tw`w-5 h-5 `} source={require('../../assets/edit.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={tw`border shadow-2xl shadow-black  border-gray-200 w-36 h-10 flex justify-center items-center rounded-xl px-2 bg-red-400 `}>
                                <Text style={tw`text-[15px] text-center font-semibold leading-7 text-white`}>
                                    {loggedUser.bloodType}
                                </Text>
                            </View>
                        </View>
                        :
                        <View style={tw`flex flex-col -mt-[110px] py-2 px-7 mb-10 gap-2 w-full items-end justify-end `}>
                            <View style={tw`border shadow-2xl shadow-black  border-gray-200 w-36 h-10 flex justify-center items-center rounded-xl px-2 bg-white `}>
                                <Text style={tw`text-[15px] text-center font-medium leading-7 capitalize text-gray-800`}>
                                    View profile
                                </Text>
                            </View>
                        </View>
                }

            </View>

            {/* main div */}
            {
                loggedUser?.role?.toLowerCase() === 'donor' &&
                <DonorProfile
                    loggedUserBloodType={loggedUserBloodType}
                    email={loggedUser.email}
                    isPermitted={isPermitted}
                    setIsPermitted={setIsPermitted}
                    currentAvailibilityQuery={currentAvailibilityQuery}
                ></DonorProfile>
            }
            {
                loggedUser?.role?.toLowerCase() == 'patient' &&
                // <Text>HIO</Text>
                <PatientProfile></PatientProfile>
            }


            <Swiper style={tw`h-[155px] mt-3`} autoplay>
                <View style={tw`relative`}>
                    <View style={tw`h-[155px] opacity-40 `}>
                        <Image source={require('../../assets/bg-home.jpg')} style={styles.image} resizeMode="cover" />
                    </View>
                    <Pressable style={tw` absolute top-[40%] w-full left-0 right-0`}>
                        <Pressable style={tw`bg-white relative -top-0 w-[55%] mx-auto py-2.5 rounded-xl `}>
                            <Text style={tw`  text-black font-bold text-base uppercase text-center`}>
                                {
                                    loggedUser?.role?.toLowerCase() === 'donor' ? "Emergency Request Now " : "Want To Donate ?"
                                }
                            </Text>
                        </Pressable>
                    </Pressable>
                </View>
                {
                    loggedUser?.role?.toLowerCase() === 'donor' &&
                    <View style={tw`relative`}>
                        <View style={tw`h-[155px] opacity-40`}>
                            <Image source={require('../../assets/bb.jpg')} style={styles.image} resizeMode="cover" />
                        </View>
                        <Pressable style={tw` absolute top-[40%] w-full left-0 right-0`}>
                            <Pressable style={tw`bg-white relative -top-0 w-[55%] mx-auto py-2.5 rounded-xl `}>
                                <Text style={tw`  text-black font-bold text-base uppercase text-center`}>
                                    Share Profile
                                </Text>
                            </Pressable>
                        </Pressable>
                    </View>
                }
                <View style={tw`relative`}>
                    <View style={tw`h-[155px] opacity-40`}>
                        <Image source={require('../../assets/bgg.jpg')} style={styles.image} resizeMode="cover" />
                    </View>
                    <Pressable style={tw` absolute top-[40%] w-full left-0 right-0`}>
                        <Pressable style={tw`bg-white relative -top-0 w-[55%] mx-auto py-2.5 rounded-xl `}>
                            <Text style={tw`  text-black font-bold text-base uppercase text-center`}>
                                Give Feedbacks
                            </Text>
                        </Pressable>
                    </Pressable>
                </View>

            </Swiper>


        </View>
    )

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