/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme, SafeAreaView, StatusBar, Button} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './src/router';

import {Amplify} from 'aws-amplify';
import {
  withAuthenticator,
} from '@aws-amplify/ui-react-native';

import amplifyconfig from './src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Router />
    </SafeAreaView>
  );
}

export default withAuthenticator(App);
