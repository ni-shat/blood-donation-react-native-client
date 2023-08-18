// import { Text, Pressable, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import tw from 'twrnc';
// import { AuthContext } from '../../providers/AuthProvider';
// import { useNavigation } from '@react-navigation/native';

// const AppliedEmergencyReqDonor = () => {

//   const [AppliedRequests, setAppliedRequests] = useState([]);
//   const { user } = useContext(AuthContext);
//   const navigation = useNavigation();

 

//   useEffect(() => {
//     fetch(`http://192.168.0.103:5000/donors/my-offered-emergency-requests/${user?.email}`)
//       .then(response => response.json())
//       .then(data => setAppliedRequests(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, [])

//   console.log(AppliedRequests)


//   return (
//     <SafeAreaView style={tw`flex-1 px-0 pt-0 bg-white w-full`}>

//       {/* <Pressable style={tw`flex w-full items-start mx-4 mt-3 mb-5`}>
//         <Pressable style={tw`flex flex-row items-center bg-white justify-between gap-3 border rounded-xl px-4 w-52 mr-2 py-1.5`}>
//           <TextInput
//             style={tw`flex-7`}
//             placeholder="Search by blood type.."
//             onChangeText={setSearchQuery}
//             value={searchQuery}
//           />
//           <MaterialCommunityIcons style={tw`flex-1`} name="magnify" size={24} color="black" />
//         </Pressable>
//       </Pressable> */}

//       <Text style={tw`font-bold text-xl px-3.5 uppercase`}>Check All Emergency Requests</Text>

//       <FlatList
//         style={tw`w-full mt-5 pb-3.5 bg-white`}
//         data={AppliedRequests}

//         renderItem={({ item }) => (
//           <EmergencyRequestItem item={item} ></EmergencyRequestItem>
//         )}

//         keyExtractor={item => item._id}
//       />
//     </SafeAreaView>
//   )
// }

// export default AppliedEmergencyReqDonor


import { View, Text } from 'react-native'
import React from 'react'

const appliedEmergencyReqDonor = () => {
  return (
    <View>
      <Text>appliedEmergencyReqDonor</Text>
    </View>
  )
}

export default appliedEmergencyReqDonor