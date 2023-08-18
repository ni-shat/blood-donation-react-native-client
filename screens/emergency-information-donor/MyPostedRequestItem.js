import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import your icon library
import tw from 'twrnc';
import { AuthContext } from '../../providers/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const MyPostedRequestItem = ({ item }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [totalResponse, setTotalResponse] = useState([]);
    const [numLines, setNumLines] = useState(0);
    const date = new Date(item?.bloodRequiredDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    useEffect(() => {
        if (user?.email == item?.email) {
            // console.log("matched")
            setIsDisabled(true)
        }
    }, [item])

    // get total response for my posted emergency request
    useEffect(() => {
        fetch(`http://192.168.0.103:5000/emergency-req/total-response/${user?.email}`)
            .then(response => response.json())
            .then(data => setTotalResponse(data[0].offeredHelp))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    console.log("MY Total responses:", totalResponse)


    const handleTotalResponse = (totalResponse) => {
        navigation.navigate('see-total-responses', {
            totalResponse: totalResponse,
        })
    }


    return (
        <View style={tw`flex flex-row gap-3 items-center bg-white py-4 mt-2 w-[97%] mx-auto rounded-xl mb-1.5 shadow-2xl
    ${isExpanded ? 'max-h-[100%]' : 'max-h-52'}
    min-h-[260px]
    `}>
            <View style={tw`flex flex-row flex-3 gap-4 items-center`}>
                <View style={tw`rounded-full relative `}>
                    {/* <Image style={tw`w-14 h-32 rounded-xl `} source={require('../../assets/drop.jpg')} /> */}
                    <View style={tw`bg-red-500 h-[260px] rounded-xl flex justify-center items-center w-14 relative`}>
                        <Text style={tw`absolute top-0 py-1.5 text-center rounded-xl rounded-b-none font-normal text-xs text-white bg-black w-full`}>urgent</Text>
                        <Text style={tw` font-extrabold text-3xl text-white`}>{item.bloodType}</Text>
                    </View>
                </View>

                <View style={tw` w-[75%] `}>
                    <Text style={tw`text-black text-xl font-medium`}>{item.name}</Text>
                    <View style={tw`flex flex-row mt-0.5`}>
                        <Text style={tw`text-gray-900  text-sm font-medium mb-2.5 bg-gray-100 px-2 py-0.5 pb-1 rounded-md `}>{item.area}</Text>
                        <Text style={tw`flex-1`}></Text>
                    </View>


                    <Text
                        style={tw`text-black text-base w-full font-normal`}
                        onTextLayout={(e) => {
                            const lines = e.nativeEvent.lines.length;
                            setNumLines(lines);
                        }}
                        numberOfLines={isExpanded ? undefined : 2} // keep the number of lines 2 if isExpanded is false, which is initally false
                    >
                        {item.description}
                    </Text>

                    {
                        numLines > 2 && !isExpanded ? (
                            <Text onPress={() => setIsExpanded(true)} style={tw`text-green-600`}>
                                See more...
                            </Text>
                        ) : numLines > 2 && isExpanded ? (
                            <Text onPress={() => setIsExpanded(false)} style={tw`text-green-600`}>
                                See less...
                            </Text>
                        ) : null
                    }


                    <View>
                        <View style={tw`flex flex-row items-center gap-2 w-60  pr-4 rounded-md py-1 my-3`}>
                            <Text>Blood Urgency Date:</Text>
                            <Text style={tw`bg-red-200 px-1.5 py-0.5 rounded-md font-semibold text-base`}>{`${day}/${month}/${year}`}</Text>
                        </View>

                        <View style={tw`flex flex-row gap-3 items-center`}>
                            <Text>
                                <Text>Email: </Text><Text onPress={() => handleEmailButtonPress(item.email)} style={tw`underline text-blue-700`}>{item.email}</Text>
                            </Text>
                            <Text>|</Text>
                            <TouchableOpacity onPress={() => handleCallButtonPress(item.phone)} style={tw`bg-green-600 rounded-full px-2 py-1 w-7 h-7 flex flex-row gap-1 items-center justify-center`}>
                                <MaterialIcons
                                    name="call"
                                    size={14}
                                    color={
                                        '#FFFFFF'
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleTotalResponse(totalResponse)}
                            style={tw` px-2 flex flex-row  mt-1 py-1.5 pb-2 rounded-xl bg-blue-500`}
                        >
                            <Text style={tw`flex flex-row mx-auto items-center justify-center`}>
                                <Text style={tw`text-white text-center`}>Total Response: </Text>
                                <Text style={tw`text-white text-center`}> {totalResponse.length}</Text>
                            </Text>
                            <FontAwesome5 style={tw`text-[20px] text-white mr-1`} name={'angle-right'} />
                        </TouchableOpacity>


                    </View>

                </View>

            </View>

        </View>
    )
}

export default MyPostedRequestItem