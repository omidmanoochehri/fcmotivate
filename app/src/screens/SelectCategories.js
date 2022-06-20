/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Button from '../utils/svg/button.svg';
import ButtonDark from '../utils/svg/button-dark.svg';
import button_dark from '../utils/img/button-dark.png';
import {useNavigation} from '@react-navigation/native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const SelectCategories = ({props}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigation = useNavigation();

  const submitCategories = () => {
    navigation.navigate('InspireMe', {name: 'InspireMe'});
  };

  const toggleCategory = cat => {
    let newCategoriesList = [...selectedCategories];
    if (selectedCategories.includes(cat)) {
      let index = selectedCategories.indexOf(cat);
      newCategoriesList.splice(index, 1);
    } else {
      newCategoriesList.push(cat);
    }
    return setSelectedCategories(newCategoriesList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What do you want {'\n'} to improve on?</Text>
      <View style={styles.buttons_container}>
        <View style={styles.buttons_row}>
          <TouchableOpacity
            onPress={() => toggleCategory('confidence')}
            style={
              selectedCategories.includes('confidence')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Confidence</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory('consistency')}
            style={
              selectedCategories.includes('consistency')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Consistency</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons_row}>
          <TouchableOpacity
            onPress={() => toggleCategory('motivation')}
            style={
              selectedCategories.includes('motivation')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Motivation</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory('support')}
            style={
              selectedCategories.includes('support')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Support</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons_row}>
          <TouchableOpacity
            onPress={() => toggleCategory('mentality')}
            style={
              selectedCategories.includes('mentality')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Mentality</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory('hard_work')}
            style={
              selectedCategories.includes('hard_work')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Hard work</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons_row}>
          <TouchableOpacity
            onPress={() => toggleCategory('determination')}
            style={
              selectedCategories.includes('determination')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Determination</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory('trials')}
            style={
              selectedCategories.includes('trials')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Trials</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons_row}>
          <TouchableOpacity
            onPress={() => toggleCategory('training')}
            style={
              selectedCategories.includes('training')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Training</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory('laziness')}
            style={
              selectedCategories.includes('laziness')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Laziness</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons_row}>
          <TouchableOpacity
            onPress={() => toggleCategory('daily_reminder')}
            style={
              selectedCategories.includes('daily_reminder')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Daily reminder</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleCategory('discipline')}
            style={
              selectedCategories.includes('discipline')
                ? {
                    ...styles.category_button_container,
                    ...styles.selected_category,
                  }
                : styles.category_button_container
            }>
            <ImageBackground
              style={styles.category_button}
              source={button_dark}
              resizeMode="stretch">
              <Text style={styles.category_button_text}>Discipline</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={submitCategories}
          style={styles.submit_button}>
          <Button width={width} height={50} />
          <Text style={styles.submit_button_text}>Confirm and Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectCategories;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 0,
    height,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 30,
    textAlign: 'center',
  },
  submit_button: {
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 20,
  },
  submit_button_text: {
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    top: 15,
    right: 0,
    left: 0,
  },
  buttons_container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttons_row: {
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    paddingBottom: 15,
  },
  category_button_container: {
    position: 'relative',
    marginHorizontal: 5,
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 2,
  },
  selected_category: {
    borderColor: 'red',
    borderWidth: 2,
  },
  category_button: {
    width: 150,
    height: 40,
  },
  category_button_text: {
    position: 'absolute',
    color: '#fff',
    top: 10,
    right: 0,
    left: 0,
    textAlign: 'center',
  },
});
