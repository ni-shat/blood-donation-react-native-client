import { View, Text, Image, Pressable, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import useNotificationToken from '../../hooks/useNotificationToken';
import useCurrentAvailibility from '../../hooks/useCurrentAvailibility';
// import { AuthContext } from '../../providers/AuthProvider';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });



const DonorProfile = ({ loggedUserBloodType, email, isPermitted, setIsPermitted, currentAvailibilityQuery }) => {

  const navigation = useNavigation();

  // const [currentAvailibility, currentAvailibilityRefetch] = useCurrentAvailibility();


  // get is the user already permit for notifications
  useEffect(() => {
    fetch(`http://192.168.0.103:5000/donor-permission/${email}`)
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
    console.log("token for each device in profile page", tokenExpo)

    const saveUser = {
      latitudeOflocation: latitudeOflocation,
      longitudeOflocation: longitudeOflocation,
      tokenExpo: tokenExpo,
      email: email,
      bloodType: loggedUserBloodType,
      currentAvailibility: true
    }

    // 192.168.0.103
    fetch(`http://192.168.0.103:5000/available-users/for-emergency-alerts/${email}`, {
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
          alert('Thanks for the permission! We will notify yoy if anybody near you post for urgent blood.')
        }
      })
      .catch(err => alert(err))
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
    fetch(`http://192.168.0.103:5000/update/donor-location/${email}`, {
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
        else if (data.modifiedCount == 0) {
          alert('You are at the same location you were before. Thanks.')
        }
      })
      .catch(err => console.log(err))

  }

  // handle get emergency alert, when users click the div
  const handleGetEmergencyAlert = async () => {
    console.log(isPermitted)
    if (!isPermitted) {
      await postTokenAndLocation(); //post token
    }
  }

  const handleUpdateLocation = async () => {
    await UpdateLocationInDb();
  }

  const handleCancelEmergencyAlert = () => {
    fetch(`http://192.168.0.103:5000/cancel-emergency-alert/${email}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount == 1) {
          alert('Emergency alert cancelled successfully.');
          setIsPermitted(false);
        }
      })
      .catch(err => alert(err))
  }

  const handleDonationRequest = () => {
    navigation.navigate('donation-requests-to-donor')
  }


  return (
    <View style={tw`mt-0  w-[87%] mx-auto`}>

      <View style={tw`flex flex-row-reverse gap-4 justify-between shadow-2xl shadow-black`}>
        <Pressable onPress={() => navigation.navigate('nav-emergeny-info-donor')} style={tw`border border-gray-200 w-[54%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/review.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Emergency Request Information</Text>
        </Pressable>
        <Pressable onPress={handleDonationRequest} style={tw`border border-gray-200 w-[40%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-11 h-11 mx-auto rounded-xl `} source={require('../../assets/emergency.png')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Donation Requests</Text>
        </Pressable>
      </View>

      <View style={tw`flex flex-row gap-4 justify-between shadow-2xl shadow-black`}>
        <TouchableOpacity
          onPress={handleGetEmergencyAlert} //call handleGetEmergencyAlert
          style={tw`border border-gray-200 w-[100%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-red-100 shadow-2xl shadow-black`}>
          {/*  */}
          {
            isPermitted ?
              <View style={tw`relative`}>
                <View style={tw`${currentAvailibilityQuery.currentAvailibility ? 'opacity-100' : 'opacity-10'}`}>
                  <Image style={tw`w-10 h-10 mb-0 mt-3 mx-auto rounded-full`} source={require('../../assets/alert.png')} />
                  <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-black`}>Emergency Alerts For Nearby Users</Text>

                  <Pressable style={tw`flex flex-row gap-2 items-center justify-center mt-2`}>
                    <TouchableOpacity onPress={() => navigation.navigate('emergency-alerts-terms')} style={tw``}>
                      <Image style={tw`w-6 h-6 mb-0 mt-0 mx-auto rounded-sm`} source={require('../../assets/terms.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleUpdateLocation}
                      style={tw`border border-red-600 bg-red-600 text-white rounded-md h-7 px-2 flex items-center justify-center`}>
                      <Text style={tw`text-[13px] -mt-0.5 font-medium leading-7 text-white`}>Update location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleCancelEmergencyAlert}
                      style={tw`border border-gray-600 bg-gray-600 text-white rounded-md h-7 px-2 flex items-center justify-center`}>
                      <Text style={tw`text-[13px] -mt-0.5 font-medium leading-7 text-white`}>Cancel</Text>
                    </TouchableOpacity>
                  </Pressable>
                </View>

                {
                  !currentAvailibilityQuery.currentAvailibility &&
                  <View style={tw` absolute top-2/4 -mt-3 left-7`}>
                    <Text style={tw`text-base font-bold bg-gray-200 py-2 px-3  mx-auto`}>You are curently unavailable</Text>
                  </View>
                }
              </View>
              :
              <>
                <Image style={tw`w-10 h-10 mb-1 mt-3 mx-auto rounded-full`} source={require('../../assets/no-alert.png')} />
                <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-black`}>Get Emergency Alerts for Nearby Users.  <Text onPress={() => navigation.navigate('emergency-alerts-terms')} style={tw`text-blue-500 capitalize underline`}>
                  Terms And Conditions
                </Text>
                </Text>
              </>
          }
        </TouchableOpacity>

        {/* <View style={tw`border border-gray-200 w-[40%] h-32 flex justify-center items-center rounded-xl px-2 pb-8 pt-5 mb-5 bg-white shadow-2xl shadow-black`}>
          <Image style={tw`w-14 h-14 -mb-2 mt-1 mx-auto rounded-xl `} source={require('../../assets/profile.jpg')} />
          <Text style={tw`text-[15px] text-center mt-1 font-medium leading-7 uppercase text-gray-800`}>Profile and Settings</Text>
        </View> */}
      </View>
    </View>

  )
}

export default DonorProfile





/***
 * 
 * First I check is the user already permit for alert
 * 
 * if he didnt, then I call post 
 * 
 * If he already did, I call update - I made 2 alert for this
 * 
 * And finally isPermit true print that, else print things should be seen for not permitted
 * 
 * 
 */