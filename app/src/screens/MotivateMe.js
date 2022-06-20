/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import item_image from '../utils/img/recover-me-banner.jpg';
const testVideo = require('../utils/video/test.mp4');
const testVideoPoster = require('../utils/img/recover-me-banner.jpg');
import Play from '../utils/svg/play.svg';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const MotivateMe = ({props}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();
  const videoPlayer = useRef();

  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      goFullScreen();
    }
  }, [isPlaying]);

  const onProgressHandler = e => {
    console.log(e);
  };

  // useEffect(() => {
  //   if (videoPlayer?.current) {
  //     videoPlayer.current?.addEventListener('progress', e => {
  //       console.log(e);
  //     });
  //   }
  // }, [videoPlayer]);

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
        <View style={styles.items_section}>
          <View style={styles.items_row}>
            <TouchableOpacity style={styles.item_box}>
              <Image style={styles.item_image} source={item_image} />
              <Text style={styles.item_title}>Test 1</Text>
              <Text style={styles.item_description}>
                Lorem impsum lomoue...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item_box}>
              <Image style={styles.item_image} source={item_image} />
              <Text style={styles.item_title}>Test 1</Text>
              <Text style={styles.item_description}>
                Lorem impsum lomoue...
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.items_row}>
            <TouchableOpacity style={styles.item_box}>
              <Image style={styles.item_image} source={item_image} />
              <Text style={styles.item_title}>Test 1</Text>
              <Text style={styles.item_description}>
                Lorem impsum lomoue...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item_box}>
              <Image style={styles.item_image} source={item_image} />
              <Text style={styles.item_title}>Test 1</Text>
              <Text style={styles.item_description}>
                Lorem impsum lomoue...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main_banner_container}>
          <Video
            source={testVideo}
            ref={ref => (videoPlayer.current = ref)}
            // onBuffer={videoPlayer.current.onBuffer}
            // onError={videoPlayer.current.videoError}
            onProgress={onProgressHandler}
            onEnd={() => setIsPlaying(false)}
            paused={!isPlaying}
            style={styles.main_banner}
            // poster={testVideoPoster}
            muted={false}
            repeat={false}
            controls={false}
          />
          {!isPlaying && (
            <TouchableOpacity
              style={styles.playIcon}
              onPress={() => setIsPlaying(!isPlaying)}>
              <Play width={50} height={50} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default MotivateMe;

const styles = StyleSheet.create({
  items_section: {
    width: '100%',
  },
  items_row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  item_box: {
    backgroundColor: '#2F3437',
    padding: 10,
    width: '50%',
    margin: 10,
    marginTop: 20,
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 7,
  },
  item_image: {
    width: 100,
    height: 100,
    marginTop: -20,
    borderRadius: 7,
  },
  item_title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 10,
  },
  item_description: {
    color: '#fff',
  },
  main_banner_container: {
    position: 'relative',
    width,
    height: width,
  },
  main_banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 999,
    left: width / 2 - 25,
    top: width / 2 - 90,
  },
});
