import { View, Text } from 'react-native'
import React from 'react'

const AppliedRequest = ({ item }) => {
    return (
        <View style={tw`flex flex-row gap-3 items-center bg-white py-4 mt-2 w-[97%] mx-auto rounded-xl mb-1.5 shadow-2xl
                  ${isExpanded ? 'max-h-[100%]' : 'max-h-52'}
                  min-h-64
                  `}>
            <View style={tw`flex flex-row flex-3 gap-4 items-center`}>
                <View style={tw`rounded-full relative `}>
                    {/* <Image style={tw`w-14 h-32 rounded-xl `} source={require('../../assets/drop.jpg')} /> */}
                    <View style={tw`bg-red-500 h-64 rounded-xl flex justify-center items-center w-14 relative`}>
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
                        <TouchableOpacity onPress={() => handleOfferHelp(item._id)} style={tw`bg-red-600 px-2 w-24 mt-1 py-0.5 pb-1 rounded-xl`}>
                            <Text style={tw`text-white text-center`}>Offer Help</Text>
                        </TouchableOpacity>


                    </View>

                </View>

            </View>

        </View>
    )
}

export default AppliedRequest