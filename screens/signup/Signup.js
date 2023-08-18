import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from '../../providers/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const Signup = ({ navigation, route }) => {

    const [signupLoading, setSignupLoading] = useState(false);
    const [signupError, setSignupError] = useState("");
    const [selectedBloodType, setselectedBloodType] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [isSignupClicked, setIsSignupClicked] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(new Date()); //date picker
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isDatePickerClicked, setIsDatePickerClicked] = useState(false);


    const pickerRef = useRef();
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const { user, loading, createUser, updateUserProfile } = useContext(AuthContext);
    // console.log("Hey nishat", user, loading)
    const { control, handleSubmit, formState: { errors }, watch, reset, clearErrors, setError, setValue } = useForm();
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    // to set the value of input field role inititally, so that I dont get error after clicking signup, if user don't change the initial value.
    useEffect(() => {
        if (route.params) {
            const { userRole } = route.params;
            setSelectedRole(userRole || '');

            if (userRole) {
                setValue('role', userRole); 
                if (errors.role) {
                    clearErrors('role');
                }
            }
        }
    }, [route.params])


    // Listen for navigation events
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsDatePickerClicked(false);
        });

        return unsubscribe;
    }, [navigation]);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log("result", result.assets[0].uri);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const getImageNameFromURI = (uri) => {
        if (!uri) return null;

        const parts = uri.split('/');
        return parts[parts.length - 1];
    };

    // function open() {
    //     pickerRef.current.focus();
    // }

    const handleBloodTypeChange = (itemValue) => {
        setselectedBloodType(itemValue)
        setValue('bloodType', itemValue); // Update the form value
        if(itemValue === 'Blood type.. *'){
            setError('bloodType', { type: 'manual', message: 'required' });
        }
        else {
            if (itemValue && errors.bloodType) {
                clearErrors('bloodType'); // Clear the "required" error
            }
        }
    };
    const handleRoleChange = (itemValue) => {
        setSelectedRole(itemValue)
        setValue('role', itemValue); // Update the form value
        console.log(itemValue)
        if(itemValue === 'Role.. *'){
            setError('role', { type: 'manual', message: 'required' });
        }
        else if(itemValue !== 'Role.. *'){
            if (itemValue && errors.role) {
                clearErrors('role'); // Clear the "required" error
            }
        }
    };

    const handleDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(Platform.OS === 'ios'); // Close the date picker on iOS
        setDateOfBirth(currentDate);
        setIsDatePickerClicked(true);
    };

    const onSubmit = data => {
        console.log("pressed submit")
        data.userImage = image;
        data.bloodType = selectedBloodType;
        data.birthDate = dateOfBirth.toDateString();
        delete data.confirmPassword;
        console.log(data);
        setSignupLoading(true);
        setSignupError("");

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSignupLoading(false);
                setSignupError("");
                console.log("in abive update userprofile")
                //update
                updateUserProfile(data.name, data.userImage)
                    .then(() => {
                        console.log("in update userprofile")
                        const saveUser = {
                            name: data.name,
                            email: data.email.toLowerCase(),
                            bloodType: data.bloodType || "",
                            birthDate: data.birthDate || "",
                            userImage: data.userImage || "",
                            role: data.role.toLowerCase(),
                            phone: data.phone,
                            area: data.area || ""
                        }
                        // after updating post data into DB
                        fetch(`http://192.168.0.103:5000/users?email=${data.email}`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    alert('You successfully registered!')
                                    setselectedBloodType("");
                                    setSelectedRole("");
                                    setDateOfBirth(null);
                                    setImage(null);
                                    reset();
                                    navigation.navigate('bottom-tab-nav')
                                }
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        alert("Sign up failed!")
                    })

            })
            .catch(err => {
                console.log("hey nishat im in error")
                setSignupLoading(false);

                const startIndex = err.message.indexOf("/") + 1;
                const endIndex = err.message.lastIndexOf(")");

                if (startIndex !== -1 && endIndex !== -1) {
                    const cleanedErrorMessage = err.message.substring(startIndex, endIndex);
                    setSignupError(cleanedErrorMessage);
                }
            })
    };


    return (
        <View style={tw`bg-white flex-1 px-5 flex justify-center items-center`} >

            <View style={tw` pb-6 w-full`}>
                <Pressable onPress={() => navigation.navigate('bottom-tab-nav')} style={tw`mx-auto mt-14 mb-3`} >
                    <Image style={tw`w-20 h-20`} source={require('../../assets/blood-logo.png')} />
                </Pressable>
                <View>
                    <Text style={tw`text-xl font-bold text-center`}>Sign Up Now</Text>
                    {/* <Text style={tw`text-sm font-normal my-1 text-center text-gray-500`}>Please fill the details and create account</Text> */}
                </View>
            </View>

            {/* form */}
            <ScrollView style={tw`w-full`}>
                <View style={tw`mt-0 pb-11`}>
                    <View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={tw`text-base font-medium my-1.5 px-3.5 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                                    placeholder="Name *"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
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
                                    // onPress={open}
                                    style={tw`text-base font-medium my-1.5 h-12 px-3.5 border border-gray-300 rounded-md text-gray-900`}
                                >
                                    <Picker
                                        ref={pickerRef}
                                        style={tw`-mt-1 -ml-4`}
                                        selectedValue={selectedRole && selectedRole}
                                        // userRoleProp
                                        onValueChange={
                                            (itemValue) => handleRoleChange(itemValue)
                                        }
                                        onBlur={onBlur} // Trigger onBlur event
                                    >

                                        <Picker.Item
                                            style={tw`h-0 text-[#a5a5a5] font-medium`}
                                            // onPress={open}
                                            label={"Role.. *"} value="Role.. *" />
                                        <Picker.Item style={tw`-mt-6 text-gray-900`} label="Patient" value="Patient" />
                                        <Picker.Item style={tw`-mt-6 text-gray-900`} label="Donor" value="Donor" />
                                    </Picker>
                                </Pressable>
                            )}
                            name="role"
                        />
                        {errors.role && (
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
                                <TextInput
                                    style={tw`text-base font-medium my-1.5 px-3.5 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                                    placeholder="Email *"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="email"
                        />
                        {errors.email && <Text style={tw`text-red-600 text-xs`} >required</Text>}
                    </View>
                    {
                        selectedRole === 'Donor' &&
                        <View>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Pressable
                                        // onPress={open}
                                        style={tw`text-base font-medium my-1.5 h-12 px-3.5 border border-gray-300 rounded-md text-gray-900`}
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
                                                // onPress={open}
                                                label="Blood type.. *" value="Blood type.. *" />
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
                    }

                    <View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={tw`text-base font-medium my-1.5 px-3.5 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                                    placeholder="Phone *"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="phone"
                        />
                        {errors.phone && <Text style={tw`text-red-600 text-xs`} >required</Text>}
                    </View>
                    <View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={tw`text-base font-medium my-1.5 px-3.5 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                                    placeholder="Area "
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="area"
                        />
                    </View>

                    {/* MASUMA */}
                    <Text onPress={pickImage} style={tw`my-1.5 px-[13.2px] py-2.5 border border-gray-300 rounded-md`}
                    >
                        {
                            image ?
                                <Text
                                    style={tw`text-base font-medium text-gray-900`}

                                >{getImageNameFromURI(image)}</Text> :
                                <Text style={tw`text-base font-medium text-[#a5a5a5]`}>Choose an image..</Text>
                        }
                    </Text>
                    {/* {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />} */}

                    {
                        selectedRole === 'Donor' &&
                        <View>
                            <Pressable onPress={() => setShowDatePicker(true)}
                                style={tw`text-base flex justify-center font-medium my-1.5 h-12 px-3.5 border border-gray-300 rounded-md `}
                            >
                                {
                                    isDatePickerClicked ?
                                        <Text style={tw` text-gray-900`}>{dateOfBirth.toDateString()}</Text>
                                        :
                                        <Text style={tw`text-[#a5a5a5] font-medium text-[15px]`}>Date of birth</Text>
                                }
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={dateOfBirth}
                                        mode="date"
                                        display="default"
                                        onChange={handleDatePicker}
                                    />
                                )}
                            </Pressable>
                        </View>
                    }

                    <View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={tw`text-base font-medium my-1.5 px-3.5 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                                    placeholder="Password *"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="password"
                        />
                        {errors.password?.type === 'required' && <Text style={tw`text-red-600 text-xs`}>required</Text>}
                        {errors.password?.type === 'minLength' && <Text style={tw`text-red-600 text-xs`}>Password must be 6 characters</Text>}
                        {errors.password?.type === 'maxLength' && <Text style={tw`text-red-600 text-xs`}>Password must be less than 20 characters</Text>}
                    </View>
                    <View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                validate: (value) => value === password || 'Passwords do not match',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={tw`text-base font-medium my-1.5 px-3.5 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                                    placeholder="Confirm Password *"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="confirmPassword"
                        />
                        {errors.confirmPassword && <Text style={tw`text-red-600 text-xs`} >{errors.confirmPassword.message || "required"}</Text>}
                    </View>
                    {
                        signupError && <Text style={tw`text-red-600 `}>{signupError}</Text>
                    }
                    <Pressable
                    // onPress={handleSignupClick}
                    >
                        <TouchableOpacity style={tw`bg-red-700 rounded-md mt-1.5`}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={tw`text-white text-center py-4 font-bold`} >
                                {
                                    signupLoading ? <Text style={tw``}>Signing up..</Text> : "Sign Up"
                                }
                                {/* Sign Up */}
                            </Text>
                        </TouchableOpacity>
                    </Pressable>
                    <Text
                        onPress={() => navigation.navigate('login')}
                        style={tw`font-normal mt-5 text-center text-base text-gray-500`} >Already have an account?
                        <Text
                            style={tw`text-red-700 font-semibold`}

                        > Login</Text>
                    </Text>

                </View>

                {/* <View style={tw` pt-2 px-2`}>
                    <View>
                        <View style={tw`flex flex-row justify-center items-center gap-2 pt-1.5 `}>
                            <View style={tw`border-t mt-1 w-20 border-gray-400`}></View>
                            <Text style={tw`font-normal text-base text-gray-400 `} >Or</Text>
                            <View style={tw`border-t mt-1 w-20 border-gray-400`}></View>
                        </View>
                        <View
                            style={tw`rounded-full border border-gray-400 p-0 w-full h-12 mx-auto mt-3 flex justify-center flex-row gap-1 items-center px-4`}
                        >
                            <Image
                                style={tw`border rounded-full w-8 h-8`}
                                source={require('../../assets/google.png')}
                            />
                            <Text style={tw`text-base font-semibold text-gray-700`}> connect with google</Text>
                        </View>
                    </View>
                </View> */}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8
    },
});

export default Signup;




{/* <View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Text onPress={openGallery}
                                    style={tw`text-base font-medium my-1.5 px-[13.2px] py-2.5 border border-gray-300 rounded-md text-[#a5a5a5]`}
                                    placeholder="Photo *"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}>
                                    Choose a photo
                                </Text>
                            )}
                            name="photo"
                        />
                        {errors.photo && <Text style={tw`text-red-600 text-xs`} >required</Text>}
                    </View> */}