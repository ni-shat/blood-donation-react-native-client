import * as React from 'react';
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';
import tw from 'twrnc';


const Contact = () => {

    const webViewUri = 'https://ni-shat.github.io/emailjs-template/';

    return (
        <View style={tw`pt-0 px-0 flex-1`}>
            <WebView source={{ uri: webViewUri }} />
        </View>
    )
}

export default Contact