/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import bg from '../utils/img/splash_bg.jpg';
import Logo from '../utils/svg/logo-full.svg';
import * as Keychain from 'react-native-keychain';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkAuth();
    }, 3000);
  }, []);

  const checkAuth = async () => {
    const credentials = Keychain.getGenericPassword();
    if (credentials) {
      navigation.navigate('Home', {name: 'Home'});
    } else {
      navigation.navigate('LoginRegister', {name: 'LoginRegister'});
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground source={bg} resizeMode="cover">
        <View style={styles.container}>
          <Logo width={250} height={150} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
});
