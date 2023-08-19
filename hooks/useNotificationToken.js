import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect, useRef, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const useNotificationToken = () => {
    // for notification
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    /**Preserving State Between Renders: Unlike state variables (created with useState()), useRef() does not cause a re-render when its value changes. This means that any values stored in useRef() will persist across renders without triggering a re-render. */
    const notificationListener = useRef();
    const responseListener = useRef();

    console.log("IM IN HOOKS")

    useEffect(() => {

        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        });

        /**This method adds a listener for received push notifications. When a notification is received, the provided callback function is called, and the notification state is updated with the received notification. */
        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     setNotification(notification);
        // });

        // // /**This method adds a listener for the user's response to a notification. (e.g., if they tap on the notification). The callback function is called with information about the response. */
        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //     console.log(response);
        // });

        // return () => {
        //     Notifications.removeNotificationSubscription(notificationListener.current);
        //     Notifications.removeNotificationSubscription(responseListener.current);
        // };
    }, []);

    console.log(expoPushToken)
    return expoPushToken;
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

export default useNotificationToken