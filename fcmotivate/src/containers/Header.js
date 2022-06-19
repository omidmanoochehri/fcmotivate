/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from '../utils/svg/logo.svg';
import Menu from '../utils/svg/menu.svg';

const Header = ({title}) => {
  return (
    <View style={styles.container} stickyHeaderIndices={[0]}>
      <Logo style={styles.logo} width={50} height={50} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.menu}>
        <Menu width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 80,
    position: 'absolute',
    flex: 1,
    top: 0,
    zIndex: 999,
    width: '100%',
    backgroundColor: '#000',
  },
  logo: {
    position: 'absolute',
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  menu: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#353A3E',
    borderRadius: 7,
    padding: 10,
  },
});
