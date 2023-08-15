import React from 'react';
import { Button, Image, Pressable, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import { useForm } from "react-hook-form";

const Login = ({navigation}) => {

    const { control, handleSubmit } = useForm();

    return (
        <View style={tw`bg-white flex-1 px-5 flex justify-center items-center`} >

            <View style={tw`py-10 w-full`}>
                <View style={tw` `}>
                    <Pressable  onPress={() => navigation.navigate('Home')}  style={tw`mx-auto mt-4 mb-4`} >
                        <Image style={tw`w-20 h-20`} source={require('../../assets/logo-blue-black.png')} />
                    </Pressable>
                    <View>
                        <Text style={tw`text-xl font-bold text-center`}>Log In Now</Text>
                        <Text style={tw`text-base font-normal my-1 text-center text-gray-500`}>Please login to continue using our app</Text>
                    </View>
                </View>

                {/* form */}
                <View style={tw` py-10`} >
                    <View>
                        {/* <Text style={tw`text-base font-medium my-1  text-gray-700`} >Name</Text> */}
                        <TextInput
                            style={tw`text-base font-medium my-2 px-2 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                            placeholder="Name"
                            name="name"
                            control={control}
                        // onChangeText={handleInputChange}
                        // value={inputText}
                        />
                    </View>
                    <View>
                        {/* <Text style={tw`text-base font-medium my-1  text-gray-700`} >Password</Text> */}
                        <TextInput
                            style={tw`text-base font-medium my-2 px-2 py-2.5 border border-gray-300 rounded-md text-gray-900`}
                            placeholder="Password"
                            name="password"
                            control={control}
                            secureTextEntry // This hides the entered text
                        />
                    </View>
                    <View>
                        <Pressable style={tw`bg-blue-600  rounded-md mt-5`} >
                            <Text style={tw`text-white text-center py-4 font-bold`} >Login</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Text
                            onPress={() => navigation.navigate('Sign-up')}
                            style={tw`font-normal mt-5 text-center text-base text-gray-400`} >Don't have an account?
                            <Text
                                style={tw`text-blue-600  font-semibold`}
                            > Sign up</Text>
                        </Text>
                    </View>
                </View>
                <View style={tw` py-0 px-2`}>
                    <View>
                        <View style={tw`flex flex-row justify-center items-center gap-2 pt-1.5 `}>
                            <View style={tw`border-t mt-1 w-20 border-gray-400`}></View>
                            <Text style={tw`font-normal text-base text-gray-400 `} >Or</Text>
                            <View style={tw`border-t mt-1 w-20 border-gray-400`}></View>
                        </View>
                        <View
                            style={tw`rounded-full border border-gray-400 p-0 w-full h-12 mx-auto mt-4 flex justify-center flex-row gap-1 items-center px-4`}
                        >
                            <Image
                                style={tw`border rounded-full w-8 h-8`}
                                source={require('../../assets/google.png')}
                            />
                            <Text style={tw`text-base font-semibold text-gray-700`}> connect with google</Text>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Login;