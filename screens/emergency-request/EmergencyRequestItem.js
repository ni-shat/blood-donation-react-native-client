
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import your icon library
import tw from 'twrnc';


const EmergencyRequestItem = ({ item }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [numLines, setNumLines] = useState(0);
  const date = new Date(item?.bloodRequiredDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return (
    <View style={tw`flex flex-row gap-3 items-center bg-white py-4 mt-2 w-[97%] mx-auto rounded-xl mb-1.5 shadow-2xl
                  ${isExpanded ? 'max-h-[100%]' : 'max-h-52'}
                  min-h-52
                  `}>
      <View style={tw`flex flex-row flex-3 gap-4 items-center`}>
        <View style={tw`rounded-full relative `}>
          {/* <Image style={tw`w-14 h-32 rounded-xl `} source={require('../../assets/drop.jpg')} /> */}
          <View style={tw`bg-red-500 h-52 rounded-xl flex justify-center items-center w-14 relative`}>
            <Text style={tw`absolute top-0 py-1.5 text-center rounded-xl rounded-b-none font-normal text-xs text-white bg-black w-full`}>urgent</Text>
            <Text style={tw` font-extrabold text-3xl text-white`}>{item.bloodType}</Text>
          </View>
        </View>

        <View style={tw` w-[75%] `}>
          <Text style={tw`text-black text-xl font-medium`}>{item.name}</Text>
          <Text style={tw`text-blue-700  text-sm font-medium mb-2`}>{item.area}</Text>
          {/* <Text style={tw`text-black text-base font-normal mb-3`}>{item.description}</Text> */}

          {/* <Text numberOfLines={isExpanded ? undefined : 2}>
            {item.description}
          </Text>

          {!isExpanded && (
            <Text onPress={() => setIsExpanded(true)} style={tw`text-green-600`}>
              See more...
            </Text>
          )} */}

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

            <View style={tw`flex flex-row gap-4 items-center`}>
              <Text style={tw``}>Email: {item.email}    |</Text>
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


          </View>

        </View>

      </View>

    </View>
  )
}

export default EmergencyRequestItem