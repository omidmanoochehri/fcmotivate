/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Header from '../containers/Header';
import bg from '../utils/img/app_background_image.png';
import NavigationBar from './NavigationBar';

const Master = ({Component, header, title}) => {
  const isDarkMode = true; //useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    paddingBottom: 65,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  };

  return (
    <SafeAreaView style={{backgroundColor: '#262C30'}}>
      <ImageBackground source={bg} resizeMode="cover">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {header && <Header title={title} />}
        <ScrollView
          // style={{
          //   display: 'flex',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          //   padding: 0,
          // }}
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Component />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Master;
