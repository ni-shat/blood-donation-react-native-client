import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as React from 'react';

import tw from 'twrnc';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack';
import Homescreen from './components/Homescreen';
import DetailsScreen from './components/DetailsScreen';
import Signup from './screens/signup/Signup';
import Login from './screens/login/Login';
import AuthProvider from './providers/AuthProvider';



const Stack = createNativeStackNavigator();


export default function App() {
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
            initialRouteName="Home"
          >
            <Stack.Screen name="Home" component={Homescreen} />
            <Stack.Screen name="Sign-up" component={Signup}  />
            <Stack.Screen name="login" component={Login} />
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