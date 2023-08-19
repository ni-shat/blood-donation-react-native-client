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
import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNav from './navigation/BottomTabNav';
import Testimonials from './screens/testimonials/Testimonials';
import TopTabNavOfEmergencyRequest from './navigation/TopTabNavOfEmergencyRequest';
import NavEmergencyInfoDonor from './navigation/NavEmergencyInfoDonor';
import SeeTotalResponses from './screens/emergency-information-donor/SeeTotalResponses';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import EmergencyAlertsTerms from './screens/EmergencyAlertsTerms/EmergencyAlertsTerms';
import Contact from './screens/contact/Contact';
import DonationRequests from './screens/donation-request/DonationRequests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const Stack = createNativeStackNavigator();
// Create a client
const queryClient = new QueryClient()

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function App() {

  const [isFirstLaunched, setIsFirstLaunched] = useState(null);

  // for notification
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  /**Preserving State Between Renders: Unlike state variables (created with useState()), useRef() does not cause a re-render when its value changes. This means that any values stored in useRef() will persist across renders without triggering a re-render. */
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
      console.log("token=", token)
    });

    /**This method adds a listener for received push notifications. When a notification is received, the provided callback function is called, and the notification state is updated with the received notification. */
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    /**This method adds a listener for the user's response to a notification. (e.g., if they tap on the notification). The callback function is called with information about the response. */
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // for notification

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

  // console.log("expoPushToken", expoPushToken)

  return (

    <>
      <StatusBar style='dark' />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isFirstLaunched ? 'onboarding-starter' : 'bottom-tab-nav'}
            // initialRouteName={'onboarding-starter'}
            >
              <Stack.Screen name="Home" component={Homescreen} options={{ headerShown: false }} />
              <Stack.Screen name="onboarding-starter" component={OnboardingStarter} options={{ headerShown: false }} />
              <Stack.Screen name="get-started" component={GetStarted} options={{ headerShown: false }} />
              <Stack.Screen name="Sign-up" component={Signup} options={{ headerShown: false }} />
              <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="contact" component={Contact} options={{ headerShown: false }} />
              <Stack.Screen name="see-total-responses" component={SeeTotalResponses} options={{ headerShown: false }} />
              <Stack.Screen name="donation-requests-to-donor" component={DonationRequests} options={{ headerShown: false }} />

              <Stack.Screen name="emergency-request" component={TopTabNavOfEmergencyRequest} options={{ headerShown: false }} />
              <Stack.Screen name="emergency-alerts-terms" component={EmergencyAlertsTerms} options={{ headerShown: false }} />
              <Stack.Screen name="nav-emergeny-info-donor" component={NavEmergencyInfoDonor} options={{ headerShown: false }} />
              <Stack.Screen name="bottom-tab-nav" component={BottomTabNav} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </AuthProvider>

      {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'white'
        }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View> */}

    </>
  );

}


//send notification to user
// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//     channelId: 'default', // Set the appropriate channel ID
//     to: "QqByNDEQAwNLn8n3oI-VOS",
//   });
// }
// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  console.log("nishat", expoPushToken)
  // ExponentPushToken[QqByNDEQAwMLn5n3oI-VOS]
  // ExponentPushToken[rc19aqOmNg9uUzFNDGhlEc]
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Urgent Blood Emergency Nearby',
    body: 'Someone need blood in your area! Your Blood Type is a Match!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}













const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


