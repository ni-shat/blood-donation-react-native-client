import { Button, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    MaterialIcons,
} from '@expo/vector-icons'
import { AuthContext } from '../../providers/AuthProvider';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';


import tw from 'twrnc';
import { Controller, useForm } from "react-hook-form";
// import { AuthContext } from '../../providers/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import useLatLongInfo from '../../hooks/useLatLongInfo';



const AddEmergencyRequest = ({ navigation }) => {

    const [signupLoading, setSignupLoading] = useState(false);
    const [signupError, setSignupError] = useState("");
    const [selectedBloodType, setselectedBloodType] = useState("");
    const [bloodRequiredDate, setbloodRequiredDate] = useState(new Date()); //date picker
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isDatePickerClicked, setIsDatePickerClicked] = useState(false);
    const [loggedUser, setLoggedUser] = useState([]);
    const [expoDonorTokens, setExpoDonorTokens] = useState([]);


    useEffect(() => {
        const sendPushNotification = async (expoPushToken) => {

            console.log("nishat", expoPushToken)
            const message = {
                to: expoPushToken,
                sound: 'default',
                title: 'Urgent Blood Emergency Nearby',
                body: 'Someone need blood in your area! Your Blood Type is a Match!',
                data: { someData: 'goes here' },
            };

            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

        }
        if (expoDonorTokens.length > 0) {
            for (const token of expoDonorTokens) {
                console.log("users token: ", token)
                sendPushNotification(token);
            }
            navigation.navigate('bottom-tab-nav');
        }
    }, [expoDonorTokens])

    // Return a cleanup function to clear tokens when the component unmounts
    useEffect(() => {
        return () => {
            setExpoDonorTokens([]);
        };
    }, []);




    const getLocationInfo = async (address) => {
        try {
            const locationResult = await Location.geocodeAsync(address);

            if (locationResult.length > 0) {
                // setLocationInfo(locationResult[0]);
                return locationResult[0];
            } else {
                return { error: 'Location not found' };
            }
        } catch (error) {
            console.error('Error fetching location info:', error);
            return { error: 'Error fetching location' };
        }
    };


    const pickerRef = useRef();
    const { user, loading } = useContext(AuthContext);
    const { control, handleSubmit, formState: { errors }, watch, reset, clearErrors, setError, setValue } = useForm();


    useEffect(() => {
        fetch(`http://192.168.0.103:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setLoggedUser(data);
            })
    }, [])

    // to set the value of input field role inititally, so that I dont get error after clicking signup, if user don't change the initial value.
    useEffect(() => {
        if (loggedUser) {
            setValue('name', loggedUser.name);
            if (errors.name) {
                console.log("name available")
                clearErrors('name');
            }

            setValue('phone', loggedUser.phone);
            if (errors.phone) {
                clearErrors('phone');
            }

            setValue('area', loggedUser.area);
            if (errors.area) {
                clearErrors('area');
            }
        }
    }, [loggedUser])


    // Listen for navigation events
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsDatePickerClicked(false);
        });

        return unsubscribe;
    }, [navigation]);


    const handleBloodTypeChange = (itemValue) => {
        setselectedBloodType(itemValue)
        setValue('bloodType', itemValue); // Update the form value
        if (itemValue === 'Blood type.. *') {
            setError('bloodType', { type: 'manual', message: 'required' });
        }
        else {
            if (itemValue && errors.bloodType) {
                clearErrors('bloodType'); // Clear the "required" error
            }
        }
    };

    const handleDatePicker = (event, selectedDate) => {
        // console.log("im in date funciton")
        // console.log(selectedDate)
        // console.log(event.type)
        if (event.type == 'set') {
            const currentDate = selectedDate;
            setShowDatePicker(Platform.OS === 'ios'); // Close the date picker on iOS
            setIsDatePickerClicked(true);
            setbloodRequiredDate(currentDate);

            setValue('bloodRequiredDate', currentDate);
            clearErrors('bloodRequiredDate');
        }
        setIsDatePickerClicked(true);
        setShowDatePicker(Platform.OS === 'ios');
    };

    // const handleNearby = () => {
    //     // now fetch nearby donors to send them notifications. /find-nearby-donors
    //     // http://localhost:5000/find-nearby-donors/?latitude=24.891116&longitude=91.891277&bloodTypes=AB-

    // }



    const onSubmit = async (data) => {
        console.log("pressed submit")

        data.email = loggedUser?.email;
        data.area = data.area.trim();
        data.description = data.description.trim();
        data.name = data.name.trim();
        data.phone = data.phone.trim();

        // call getLocationInfo hook here to get latitude and longitude of the location 
        const latLong = await getLocationInfo(data.area);
        console.log("latLong", latLong);
        data.latitude = latLong.latitude.toString();
        data.longitude = latLong.longitude.toString();

        // console.log(data);
        // data for fetching geo location
        const lat = data.latitude;
        const long = data.longitude;
        const BType = encodeURIComponent(data.bloodType);


        // setSignupLoading(true);
        // setSignupError("");

        const saveRequest = {
            name: data.name,
            email: data.email,
            bloodType: data.bloodType,
            bloodRequiredDate: data.bloodRequiredDate,
            phone: data.phone,
            area: data.area,
            latitude: data.latitude,
            longitude: data.longitude,
            description: data.description || "",
            offeredHelp: []  // I have used empty array here, I will later update the array in backend, if any donor respond to the request.
        }

        // post data into DB
        let flag = 0
        fetch(`http://192.168.0.103:5000/patient/emergency-request`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveRequest)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {

                    console.log("lattitude and longitude: ", lat, long, BType)
                    // 192.168.60.145

                    fetch(`http://192.168.0.103:5000/find-nearby-donors?latitude=${lat}&longitude=${long}&bloodType=${BType}`)
                        .then(response => response.json())
                        .then(nearbyDonorsData => {
                            console.log("fetching nearby donors:", nearbyDonorsData); // Handle the response from /find-nearby-donors API
                            reset();
                            alert('Successfully posted!')
                            setselectedBloodType("");
                            setbloodRequiredDate(null);

                            let tokenArrTmp = [];
                            for (const donor of nearbyDonorsData) {
                                tokenArrTmp.push(donor.tokenExpo);
                            }
                            console.log("tokenArrTmp got from extracting", tokenArrTmp)
                            setExpoDonorTokens(tokenArrTmp);

                            // navigation.navigate('bottom-tab-nav');
                        })
                        .catch(error => {
                            console.error('Error fetching nearby donors:', error);
                        });

                    /**
                     * fetching nearby donors: 
                     * [
                     * {"_id": "64dffd5f9913794b0d6d6eab", 
                     * "distance": 668.8858247961474, 
                     * "email": "nusrat@gmail.com",
                     *  "latitudeOflocation": 24.9054491, 
                     * "locationData": {"coordinates": [Array], "type": "Point"},
                     *  "longitudeOflocation": 91.8534242, 
                     * "tokenExpo": "ExponentPushToken[QqByNDEQAwMLn5n3oI-VOS]"}
                     * ]
                     * 
                     */

                    // reset();



                }
            })

        // if (flag == 1) {


        // }
    };


    return (
        <View style={tw`relative flex-1 bg-white`} >
            <View style={tw`relative -top-12 `}>
                <Image style={tw`w-full`} source={require('../../assets/wave-all.png')} />
                <View style={tw`absolute top-[90px] px-1.5 flex justify-between items-start gap-0 w-full`}>

                    <Text style={tw`font-bold text-xl mx-auto uppercase bg-slate-50 px-4 rounded-md`}>Emergency Request</Text>

                    {/* form */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={tw`flex-1 w-full`}
                    >
                        <ScrollView style={tw`w-full mt-10 mb-16 flex-1`} contentContainerStyle={{ minHeight: '100%' }} >
                            <View style={tw` px-3.5 pb-10`}>

                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={tw`text-base font-medium my-2 px-3.5 py-3 border border-gray-300 rounded-md text-gray-900`}
                                                placeholder="Name *"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                defaultValue={loggedUser.name}
                                            />
                                        )}
                                        name="name"
                                    />
                                    {errors.name && <Text style={tw`text-red-600 text-xs`} >required</Text>}
                                </View>

                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Pressable
                                                style={tw`text-base font-medium my-2 h-14 px-3.5 border border-gray-300 rounded-md text-gray-900`}
                                            >
                                                <Picker
                                                    ref={pickerRef}
                                                    style={tw`-mt-1 -ml-4`}
                                                    selectedValue={selectedBloodType && selectedBloodType}
                                                    onValueChange={
                                                        (itemValue) => handleBloodTypeChange(itemValue)
                                                    }
                                                    onBlur={onBlur} // Trigger onBlur event
                                                >
                                                    <Picker.Item
                                                        style={tw`h-0 text-[#a5a5a5] font-medium`}
                                                        label="Required Blood type.. *" value="Blood type.. *" />
                                                    <Picker.Item style={tw`-mt-6 text-gray-900`} label="A+" value="A+" />
                                                    <Picker.Item style={tw`-mt-6 text-gray-900`} label="B+" value="B+" />
                                                    <Picker.Item style={tw`-mt-6 text-gray-900`} label="AB+" value="AB+" />
                                                    <Picker.Item style={tw` text-gray-900`} label="O+" value="O+" />
                                                    <Picker.Item style={tw`-mt-6 text-gray-900`} label="A-" value="A-" />
                                                    <Picker.Item style={tw`-mt-6 text-gray-900`} label="B-" value="B-" />
                                                    <Picker.Item style={tw`-mt-6 text-gray-900`} label="AB-" value="AB-" />
                                                    <Picker.Item style={tw` text-gray-900`} label="O-" value="O-" />
                                                </Picker>
                                            </Pressable>
                                        )}
                                        name="bloodType"
                                    />
                                    {errors.bloodType && (
                                        <Text style={tw`text-red-600 text-xs`}>required</Text>
                                    )}
                                </View>
                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Pressable onPress={() => setShowDatePicker(true)}
                                                style={tw`text-base flex justify-center font-medium my-1.5 h-12 px-3.5 border border-gray-300 rounded-md `}
                                            >
                                                {
                                                    isDatePickerClicked ?
                                                        <Text style={tw` text-gray-900`}>{bloodRequiredDate?.toDateString()}</Text>
                                                        :
                                                        <Text style={tw`text-[#a5a5a5] font-medium text-[15px]`}>Blood Required Date *</Text>
                                                }
                                                {showDatePicker && (
                                                    <DateTimePicker
                                                        value={bloodRequiredDate}
                                                        mode="date"
                                                        display="default"
                                                        onChange={handleDatePicker}
                                                    />
                                                )}
                                            </Pressable>
                                        )}
                                        name="bloodRequiredDate"
                                    />
                                    {errors.bloodRequiredDate && (
                                        <Text style={tw`text-red-600 text-xs`}>required</Text>
                                    )}
                                </View>


                                <View>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={tw`text-base font-medium my-2 px-3.5 py-3 border bg-gray-100 border-gray-300 rounded-md text-gray-900`}
                                                placeholder="Email *"
                                                onBlur={onBlur}
                                                value={value}
                                                defaultValue={`Email: ${user?.email}`}
                                                editable={false}
                                            />
                                        )}
                                        name="email"
                                    />
                                </View>

                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={tw`text-base font-medium my-2 px-3.5 py-3 border border-gray-300 rounded-md text-gray-900`}
                                                placeholder="Phone *"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                defaultValue={loggedUser?.phone}
                                            />
                                        )}
                                        name="phone"
                                    />
                                    {errors.phone && <Text style={tw`text-red-600 text-xs`} >required</Text>}
                                </View>

                                <View>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={tw`text-base font-medium my-2 px-3.5 py-3 border border-gray-300 rounded-md text-gray-900`}
                                                placeholder="Area *"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                defaultValue={loggedUser?.area}
                                            />
                                        )}
                                        name="area"
                                    />
                                    {errors.area && <Text style={tw`text-red-600 text-xs`} >required</Text>}
                                </View>

                                <View>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={tw`text-base font-medium my-2 px-3.5 py-3 border border-gray-300 rounded-md text-gray-900`}
                                                placeholder="Write Post Description Here... "
                                                multiline={true}
                                                numberOfLines={4}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name="description"
                                    />
                                </View>


                                {
                                    signupError && <Text style={tw`text-red-600 `}>{signupError}</Text>
                                }
                                <Pressable>
                                    <TouchableOpacity style={tw`bg-red-700 rounded-md mt-1.5`}
                                        onPress={handleSubmit(onSubmit)}
                                    >
                                        <Text style={tw`text-white text-center py-4 font-bold`} >
                                            {
                                                signupLoading ? <Text style={tw``}>Loading..</Text> : "POST REQUEST"
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </Pressable>


                            </View>

                        </ScrollView>

                    </KeyboardAvoidingView>

                </View>

            </View>
        </View>
    )
}


export default AddEmergencyRequest