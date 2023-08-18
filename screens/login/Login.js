import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import { AuthContext } from '../../providers/AuthProvider';
import { useRoute } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form";

const Login = ({ navigation }) => {

    const { control, handleSubmit, formState: { errors },  reset } = useForm();
    const { user, loading, signIn } = useContext(AuthContext);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [userRoleProp, setUserRoleProp] = useState("");

    // if (route.params) {
    //     console.log("route.params", route.params)
    //     const { userRole } = route.params;
    // }
    const route = useRoute();
    console.log(route)

    useEffect(() => {
        if (route.params) {
            const { userRole } = route.params;
            setUserRoleProp(userRole || '');
        }
    }, [route.params])


    const onSubmit = data => {

        setLoginLoading(true);
        setLoginError("");
        console.log("in sign in")

        signIn(data.email, data.password)
            .then(result => {

                console.log(result.user);
                setLoginLoading(false);
                setLoginError("");
                reset();
                navigation.goBack();
            })
            .catch(err => {
                console.log("hey nishat im in error")
                setLoginLoading(false);

                const startIndex = err.message.indexOf("/") + 1;
                const endIndex = err.message.lastIndexOf(")");

                if (startIndex !== -1 && endIndex !== -1) {
                    const cleanedErrorMessage = err.message.substring(startIndex, endIndex);
                    setLoginError(cleanedErrorMessage);
                }
            })
    };

    return (
        //
        <>
            <StatusBar style='dark' />
            <View style={tw`bg-white flex-1 px-5 flex pt-28`} >

                <View style={tw`py-10 w-full`}>
                    <View style={tw` `}>
                        <Pressable onPress={() => navigation.navigate('bottom-tab-nav')} style={tw`mx-auto mt-4 mb-4`} >
                            <Image style={tw`w-24 h-24`} source={require('../../assets/blood-logo.png')} />
                        </Pressable>
                        <View>
                            <Text style={tw`text-xl font-bold text-center`}>Log In Now</Text>
                            <Text style={tw`text-base font-normal my-1 text-center text-gray-500`}>Please login to continue using our app</Text>
                        </View>
                    </View>

                    {/* form */}
                    <View style={tw` py-10`} >


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
                        <View>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
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
                            {errors.password && <Text style={tw`text-red-600 text-xs`} >required</Text>}
                        </View>

                        {
                            loginError && <Text style={tw`text-red-600 `}>{loginError}</Text>
                        }
                        <View>
                            <Pressable onPress={handleSubmit(onSubmit)} style={tw`bg-red-700  rounded-md mt-5`} >
                                <Text style={tw`text-white text-center py-4 font-bold`} >
                                    {
                                        loginLoading ? <Text style={tw``}>Login..</Text> : "Login"
                                    }
                                </Text>
                            </Pressable>
                        </View>
                        <View>
                            <Text
                                onPress={
                                    // () => navigation.navigate('Sign-up')
                                    () => navigation.navigate('Sign-up', {
                                        userRole: userRoleProp,
                                    })
                                }
                                style={tw`font-normal mt-5 text-center text-base text-gray-400`} >Don't have an account?
                                <Text
                                    style={tw`text-red-700  font-semibold`}
                                > Sign up</Text>
                            </Text>
                        </View>
                    </View>
                    {/* <View style={tw` py-0 px-2`}>
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
    </View> */}
                </View>

            </View>
        </>
    );
};

export default Login;