/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import routes from '../routes/tabnav';
import Logo from '../utils/svg/logo.svg';
import Menu from '../utils/svg/menu.svg';

const NavigationBar = ({activeRouteName, parentRouteName}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container} stickyHeaderIndices={[0]}>
      {routes.map(
        ({name, has_icon, Icon, ActiveIcon}, i) =>
          has_icon && (
            <TouchableOpacity
              style={styles.menu_item}
              key={i}
              onPress={() => navigation.navigate(name, {name})}>
              {activeRouteName === name || parentRouteName === name ? (
                <ActiveIcon width={20} height={20} />
              ) : (
                <Icon width={20} height={20} />
              )}
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
          ),
      )}
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    height: 80,
    position: 'absolute',
    flex: 1,
    bottom: 0,
    zIndex: 999,
    width: '100%',
    backgroundColor: '#000',
  },
  menu_item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '20%',
  },
  name: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '300',
    textAlign: 'center',
    paddingTop: 10,
  },
});
