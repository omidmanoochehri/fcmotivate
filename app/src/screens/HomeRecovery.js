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
import quotes_banner from '../utils/img/training3.jpg';
import motivate_me_banner from '../utils/img/training3.jpg';
import recover_me_banner from '../utils/img/training3.jpg';
import {useNavigation} from '@react-navigation/native';
import Circle from '../utils/svg/position.svg';
import Play from '../utils/svg/play.svg';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const HomeRecovery = ({props}) => {
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
              navigation.navigate('HomeRecovery', {name: 'HomeRecovery'})
            }>
            <ImageBackground
              style={styles.banner}
              source={quotes_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
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
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeRecovery', {
                name: 'Mental Training',
              })
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeRecovery', {
                name: 'Mental Training',
              })
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeRecovery', {
                name: 'Mental Training',
              })
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeRecovery', {
                name: 'Mental Training',
              })
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
           <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeRecovery', {
                name: 'Mental Training',
              })
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeRecovery', {
                name: 'Mental Training',
              })
            }>
            <ImageBackground
              style={styles.banner}
              source={recover_me_banner}
              resizeMode="cover">
              <View style={styles.banner_overlay} />
              <View style={styles.banner_content}>
                <View style={styles.playButton}>
                  <Circle style={styles.playBtnCircle} width={40} height={40} />
                  <Play style={styles.playIcon} width={15} height={15} />
                </View>
                <View>
                  <Text style={styles.title}>House Fitness</Text>
                  <Text style={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeRecovery;

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
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  banner_overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  banner_content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '900',
  },
  description: {
    fontSize: 12,
    color: '#fff',
    flexWrap: 'wrap',
    width: '75%',
  },
  playButton: {
    position: 'relative',
    marginRight: 7,
  },
  playBtnCircle: {
    position: 'relative',
  },
  playIcon: {
    position: 'absolute',
    left: 14,
    top: 12.5,
  },
});
