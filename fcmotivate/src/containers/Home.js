/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from '../routes/tabnav';
import Master from '.';
import {useEffect} from 'react';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Inspire Me"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          paddingBottom: 20,
          paddingTop: 10,
          height: 80,
          borderTopColor: '#222',
        },
        tabBarLabelStyle: {
          color: '#f7f7ef',
        },
      }}>
      {routes.map(({name, Component, Icon, ActiveIcon, header}, i) => (
        <Tab.Screen
          key={i}
          name={name}
          options={{
            title: name,
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <ActiveIcon width={20} height={20} />
              ) : (
                <Icon width={20} height={20} />
              ),
          }}>
          {props => <Master {...props} Component={Component} header={header} title={name}/>}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default Home;
