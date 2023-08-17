import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
// import * as React from 'react';

import tw from 'twrnc';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './components/Homescreen';
import Signup from './screens/signup/Signup';
import Login from './screens/login/Login';
import AuthProvider from './providers/AuthProvider';
import OnboardingStarter from './screens/onboarding-starter/OnboardingStarter';
import GetStarted from './screens/get-started/GetStarted';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNav from './navigation/BottomTabNav';
import Testimonials from './screens/testimonials/Testimonials';
import TopTabNavOfEmergencyRequest from './navigation/TopTabNavOfEmergencyRequest';
import NavEmergencyInfoDonor from './navigation/NavEmergencyInfoDonor';
import SeeTotalResponses from './screens/emergency-information-donor/SeeTotalResponses';


const Stack = createNativeStackNavigator();


export default function App() {

  const [isFirstLaunched, setIsFirstLaunched] = useState(null);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const value = await AsyncStorage.getItem('isFirstLaunched');
        if (value === null) {
          // App is launched for the first time
          setIsFirstLaunched(true);
          await AsyncStorage.setItem('isFirstLaunched', 'false');
        } else {
          // App is not launched for the first time
          setIsFirstLaunched(false);
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkFirstLaunch();
  }, [])



  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    //   </NavigationContainer>

    <>
      <StatusBar style='dark' />
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName={isFirstLaunched ? 'onboarding-starter' : 'Home'}
            initialRouteName={'onboarding-starter'}
          >
            <Stack.Screen name="Home" component={Homescreen} options={{ headerShown: false }} />
            <Stack.Screen name="onboarding-starter" component={OnboardingStarter} options={{ headerShown: false }} />
            <Stack.Screen name="get-started" component={GetStarted} options={{ headerShown: false }} />
            <Stack.Screen name="Sign-up" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="testimonial" component={Testimonials} options={{ headerShown: false }} />
            <Stack.Screen name="see-total-responses" component={SeeTotalResponses} options={{ headerShown: false }} />

            <Stack.Screen name="emergency-request" component={TopTabNavOfEmergencyRequest} options={{ headerShown: false }} />
            <Stack.Screen name="nav-emergeny-info-donor" component={NavEmergencyInfoDonor} options={{ headerShown: false }} />
            <Stack.Screen name="bottom-tab-nav" component={BottomTabNav} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




/***
 *  <>
      <StatusBar style='light' />
 * <View style={styles.container}>
        <Text>Hello!</Text>
        <StatusBar style="auto" />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          defaultValue="You can type in me !!! hi"
        />
        <Button title='click that button' />
        <New />
      </View>

      </>
 */


/***
 * 
 * <View style={tw` my-60`}>
        <Text style={tw`p-5 text-yellow-500 text-6xl font-bold text-center`}>E-Tutor</Text>
        <StatusBar style="auto" />
        
        <Button style={tw`text-black`} title='click that button' />
      </View>
 */