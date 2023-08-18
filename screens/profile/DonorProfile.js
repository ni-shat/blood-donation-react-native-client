import { View, Text, Image, Pressable, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import useNotificationToken from '../../hooks/useNotificationToken';
import { AuthContext } from '../../providers/AuthProvider';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });



const DonorProfile = () => {
  const navigation = useNavigation();
  // const [alert, setAlert] = useState(null);
  const { user } = useContext(AuthContext);
  const [isPermitted, setIsPermitted] = useState(false);

  // get is the user already permit for notifications
  useEffect(() => {
    fetch(`http://192.168.0.103:5000/donor-permission/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("data.userExist", data.userExist)
        setIsPermitted(data.userExist)
      })
      .catch(err => console.log(err))
  }, [])


  // get token for each device for sending notifications
  const tokenExpo = useNotificationToken();

  // ask for permission from users for accessing their location
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation;
  };

  // post token and location after user permission into db
  const postTokenAndLocation = async () => {
    const location = await getLocationAsync();
    const latitudeOflocation = location.coords.latitude;
    const longitudeOflocation = location.coords.longitude;
    // console.log(latitudeOflocation, longitudeOflocation)

    // console.log("nihsat tabassum", tokenExpo);

    const saveUser = {
      latitudeOflocation: latitudeOflocation,
      longitudeOflocation: longitudeOflocation,
      tokenExpo: tokenExpo,
      email: user?.email
    }

    // 192.168.0.103
    fetch(`http://192.168.0.103:5000/available-users/for-emergency-alerts/${user?.email}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(saveUser)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          setIsPermitted(true);
          console.log('You successfully posted!')
        }
      })
      .catch(err => console.log(err))

  }

  // Update location in db after user clicking update location
  const UpdateLocationInDb = async () => {
    const location = await getLocationAsync();
    const latitudeOflocation = location.coords.latitude;
    const longitudeOflocation = location.coords.longitude;

    const saveUser = {
      latitudeOflocation: latitudeOflocation,
      longitudeOflocation: longitudeOflocation
    }

    // 192.168.0.103
    fetch(`http://192.168.0.103:5000/update/donor-location/${user?.email}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(saveUser)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          alert('Successfully updated the location!')
        } 
        else if(data.modifiedCount == 0) {
          alert('You are at the same location you were before. Thanks.')
        }
      })
      .catch(err => console.log(err))

  }

  // handle get emergency alert, when users click the div
  const handleGetEmergencyAlert = async () => {
    console.log(isPermitted)
    if (!isPermitted) {
      await postTokenAndLocation();
    }
  }

  const handleUpdateLocation = async () => {
    await UpdateLocationInDb();
  }


  return (
    <View style={tw`mt-0  w-[87%] mx-auto`}>
      <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
        <TouchableOpacity
          onPress={handleGetEmergencyAlert}
          style={tw`border border-gray-200 w-[54%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-red-100 shadow-2xl shadow-black`}>
          {/*  */}
          {
            isPermitted ?
              <>
                <Image style={tw`w-10 h-10 mb-0 mt-3 mx-auto rounded-full`} source={require('../../assets/alert.png')} />
                <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-black`}>Emergency Alerts</Text>
                <Pressable style={tw`flex flex-row gap-2 items-center justify-center mt-2`}>
                  <TouchableOpacity onPress={() => navigation.navigate('emergency-alerts-terms')} style={tw`bg-gray-200 rounded-full`}>
                    <Image style={tw`w-6 h-6 mb-0 mt-0 mx-auto rounded-full`} source={require('../../assets/settings.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleUpdateLocation}
                    style={tw`border border-red-600 bg-red-600 text-white rounded-md h-7 px-2 flex items-center justify-center`}>
                    <Text style={tw`text-[13px] -mt-0.5 font-medium leading-7 text-white`}>Update location</Text>
                  </TouchableOpacity>
                </Pressable>
              </>
              :
              <>
                <Image style={tw`w-10 h-10 mb-1 mt-3 mx-auto rounded-full`} source={require('../../assets/no-alert.png')} />
                <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-black`}>Get Emergency Alerts</Text>
              </>
          }
        </TouchableOpacity>

        <View style={tw`border border-gray-200 w-[40%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-14 h-14 -mb-2 mt-1 mx-auto rounded-xl `} source={require('../../assets/profile.jpg')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Profile and Settings</Text>
        </View>

      </View>
      <View style={tw`flex flex-row-reverse gap-4 justify-between shadow-2xl shadow-black`}>
        <Pressable onPress={() => navigation.navigate('nav-emergeny-info-donor')} style={tw`border border-gray-200 w-[54%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/review.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Emergency Request Information</Text>
        </Pressable>
        <Pressable style={tw`border border-gray-200 w-[40%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/emergency.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Donation History</Text>
        </Pressable>
      </View>
    </View>

  )
}

export default DonorProfile