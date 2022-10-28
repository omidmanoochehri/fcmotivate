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
import Logo from '../utils/svg/logo2.svg';
import * as Keychain from 'react-native-keychain';
import {login} from '../services/user.service';

const Splash = ({navigation}) => {
  
  const checkCredentials = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      login(
        credentials.username,
        credentials.password,
        async ({result, response}) => {
          if (result && response.token) {
            navigation.navigate('SelectPosition', {name: 'SelectPosition'});
          } else {
            await Keychain.resetGenericPassword();
            navigation.navigate('LoginRegister', {name: 'LoginRegister'});
          }
        },
      );
    }
  };

  useEffect(() => {
    checkCredentials();
  }, []);

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
