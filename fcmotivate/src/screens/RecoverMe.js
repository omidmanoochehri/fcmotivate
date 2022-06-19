/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import quotes_banner from '../utils/img/training1.jpg';
import motivate_me_banner from '../utils/img/training2.jpg';
import recover_me_banner from '../utils/img/training3.jpg';
import VideoIcon from '../utils/svg/video.svg';
import {useNavigation} from '@react-navigation/native';
import PodcastIcon from '../utils/svg/podcast.svg';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const RecoverMe = ({props}) => {
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
            onPress={() =>
              navigation.navigate('MentalTraining', {name: 'MentalTraining'})
            }>
            <ImageBackground
              style={styles.banner}
              source={quotes_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <PodcastIcon style={styles.videoIcon} width={60} height={50}/>
              <Text style={styles.title}>Mental Training</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeRecovery', {name: 'HomeRecovery'})
            }>
            <ImageBackground
              style={styles.banner}
              source={motivate_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <VideoIcon style={styles.videoIcon} />
              <Text style={styles.title}>Home Recovery</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('GymPoolRecovery', {
                name: 'Gym + Pool Recovery',
              })
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <VideoIcon style={styles.videoIcon} />
              <Text style={styles.title}>Gym + Pool Recovery</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecoverMe;

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
  videoIcon: {
    marginBottom: 7,
  },
});
