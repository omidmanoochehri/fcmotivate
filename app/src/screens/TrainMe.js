/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Circle from '../utils/svg/position.svg';
import Gradient from '../utils/img/gradient-item.png';
import {useNavigation} from '@react-navigation/native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const TrainMe = ({props}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        height,
      }}>
      <View style={{paddingVertical: 20}}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('WithTheBall', {name: 'WithTheBall'})
          }>
          <Circle width={100} height={100} />

          <ImageBackground
            source={Gradient}
            resizeMode="stretch"
            style={styles.titleContainer}>
            <Text style={styles.title}>With The Ball</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('WithoutTheBall', {name: 'WithoutTheBall'})
          }>
          <Circle width={100} height={100} />

          <ImageBackground
            source={Gradient}
            resizeMode="stretch"
            style={styles.titleContainer}>
            <Text style={styles.title}>Without The Ball</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrainMe;

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 7,
  },
  titleContainer: {
    position: 'relative',
    paddingHorizontal: 40,
    paddingVertical: 15,
    width: width - 150,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
});
