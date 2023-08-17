import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import SeeResponse from './SeeResponse';

const SeeTotalResponses = () => {

    const [responses, setResponses] = useState([]);
    const route = useRoute();

    useEffect(() => {
        setResponses(route.params.totalResponse)
    }, [route.params])


    console.log(responses)

   
    return (
        <View style={tw`flex-1 pt-20 pb-20 bg-white`}>
            <Text style={tw`px-4 text-xl uppercase font-medium`}>All Responses</Text>

            <ScrollView style={tw`pt-14`}>
                {
                    responses?.map((response) => (
                        // <View style={tw`bg-white shadow-2xl py-3 px-4 w-[90%] rounded-xl mx-auto`}>
                            <SeeResponse responseEmail={response}></SeeResponse>
                        // {/* </View> */}
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default SeeTotalResponses