import { View, Text, Image, Touchable, Pressable, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc';
import { AuthContext } from '../../providers/AuthProvider';
import OfferedHelpItem from './OfferedHelpItem';

const OfferedEmergencyRequests = () => {

  const [OfferedHelp, setMyOfferedHelp] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://192.168.0.103:5000/offered-help/${user?.email}`)
      .then(response => response.json())
      .then(data => setMyOfferedHelp(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  // console.log("OfferedHelp", OfferedHelp)

  return (
    <SafeAreaView style={tw`flex-1 px-0 pt-0 bg-white w-full`}>

      <Text style={tw`font-bold text-xl pt-6 px-3.5 uppercase`}>My Offered Help for Emergency requests</Text>

      <FlatList
        style={tw`w-full mt-5 pb-3.5 bg-white`}
        data={OfferedHelp}

        renderItem={({ item }) => (
          <OfferedHelpItem item={item}></OfferedHelpItem>
        )}

        keyExtractor={item => item._id}
      />




      {/* </View>

</View>
</View> */}
    </SafeAreaView>
  )
}

export default OfferedEmergencyRequests