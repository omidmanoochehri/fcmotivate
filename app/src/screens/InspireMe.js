/* eslint-disable prettier/prettier */
import quotes_banner from '../utils/img/quotes-banner.jpg';
import motivate_me_banner from '../utils/img/motivate-me-banner.jpg';
import recover_me_banner from '../utils/img/recover-me-banner.jpg';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const InspireMe = ({props}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        paddingTop: 70,
        paddingBottom: 70,
      }}>
      <View style={{paddingVertical: 20}}>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Quotes', {name: 'Quotes'})}>
            <ImageBackground
              style={styles.banner}
              source={quotes_banner}
              resizeMode="stretch">
              <View style={styles.banner_overlay} />
              <Text style={styles.title}>Quotes</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MotivateMe', {name: 'MotivateMe'})
            }>
            <ImageBackground
              style={styles.banner}
              source={motivate_me_banner}
              resizeMode="stretch">
              <View style={styles.banner_overlay} />
              <Text style={styles.title}>Motivate Me</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RecoverMe', {name: 'RecoverMe'})
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="stretch">
              <View style={styles.banner_overlay} />
              <Text style={styles.title}>Recover Me</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InspireMe;

const styles = StyleSheet.create({
  banner_container: {
    display: 'flex',
    position: 'relative',
    marginVertical: 5,
  },
  banner: {
    width: width - 40,
    height: height / 4.5,
    borderColor: '#1C1F27',
    borderWidth: 3,
    borderRadius: 17,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner_overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '900',
  },
});
