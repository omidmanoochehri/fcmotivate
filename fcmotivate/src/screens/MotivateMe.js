/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const MotivateMe = ({props}) => {
  const navigation = useNavigation();


  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        paddingTop: 70,
      }}>
      <View style={{paddingVertical: 20}}>

      </View>
    </View>
  );
};

export default MotivateMe;

const styles = StyleSheet.create({

});
