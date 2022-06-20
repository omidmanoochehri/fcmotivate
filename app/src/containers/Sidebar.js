/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import profile from '../utils/img/profile.png';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Sidebar = ({showSidebar, openSidebar}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        left: showSidebar ? 0 : '100%',
      }}
      onPress={() => openSidebar(false)}
      stickySidebarIndices={[0]}>
      <View
        style={{
          ...styles.sidebar,
          display: showSidebar ? 'flex' : 'none',
        }}>
        <Image
          style={styles.profile_picture}
          source={profile}
          width={100}
          height={100}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 999,
    flex: 1,
  },
  sidebar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 40,
    height,
    position: 'absolute',
    flex: 1,
    top: 0,
    right: 0,
    zIndex: 99999,
    width: 250,
    backgroundColor: '#050505',
  },
  profile_picture: {
    position: 'relative',
    borderRadius: 100,
  },
});
