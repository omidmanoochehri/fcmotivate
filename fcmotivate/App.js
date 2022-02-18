/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Section from './src/components/Section';

import routes from './src/routes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InspireMe from './src/screens/InspireMe';
import Splash from './src/screens/Splash';
import Master from './src/containers';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    paddingBottom: 65,
  };
  // <SafeAreaView style={backgroundStyle}>

  // {/* <View
  //   style={{
  //     backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //   }}>
  //   {routes.map(({name, Component}, i) => (
  //     <Component />
  //   ))}
  // </View> */}
  // </SafeAreaView>

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        {routes.map(({name, Component, master, header}, i) => (
          <Stack.Screen name={name} options={{title: name}} key={i}>
            {props =>
              master ? (
                <Master {...props} Component={Component} header={header} />
              ) : (
                <Component {...props} header={header}/>
              )
            }
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
