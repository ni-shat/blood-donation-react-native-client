
import React from 'react';
import { View, Text, Button } from 'react-native';
import tw from 'twrnc';

function Homescreen({ navigation }) {
  return (
    <View>
      <Text style={tw`p-5 text-yellow-500 text-6xl font-bold text-center`}>Home Screen</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Sign-up')}
      />
    </View>
  );
}

export default Homescreen;
