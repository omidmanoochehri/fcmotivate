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
  TextInput,
} from 'react-native';
import profile from '../utils/img/profile.png';
import input_bg from '../utils/img/input.png';
import submit_btn from '../utils/img/button-dark.png';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const MyProfile = ({props}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingTop: 70,
      }}>
      <View style={styles.container}>
        <View style={styles.profile_picture_container}>
          <Image
            style={styles.profile_picture}
            source={profile}
            width={130}
            height={130}
          />
        </View>
        <View style={styles.personal_information_container}>
          <ImageBackground
            style={styles.form_field}
            source={input_bg}
            resizeMode="stretch">
            <TextInput
              // onChangeText={handleChange('password')}
              // onBlur={handleBlur('password')}
              // value={values.password}
              placeholder="First Name"
              style={styles.input}
              secureTextEntry
              placeholderTextColor={'#797979'}
            />
          </ImageBackground>
          <ImageBackground
            style={styles.form_field}
            source={input_bg}
            resizeMode="stretch">
            <TextInput
              // onChangeText={handleChange('password')}
              // onBlur={handleBlur('password')}
              // value={values.password}
              placeholder="Last Name"
              style={styles.input}
              secureTextEntry
              placeholderTextColor={'#797979'}
            />
          </ImageBackground>
          <ImageBackground
            style={styles.form_field}
            source={input_bg}
            resizeMode="stretch">
            <TextInput
              // onChangeText={handleChange('password')}
              // onBlur={handleBlur('password')}
              // value={values.password}
              placeholder="Email"
              style={styles.input}
              secureTextEntry
              placeholderTextColor={'#797979'}
            />
          </ImageBackground>
          <ImageBackground
            style={styles.form_field}
            source={input_bg}
            resizeMode="stretch">
            <TextInput
              // onChangeText={handleChange('password')}
              // onBlur={handleBlur('password')}
              // value={values.password}
              placeholder="Mobile Number"
              style={styles.input}
              secureTextEntry
              placeholderTextColor={'#797979'}
            />
          </ImageBackground>

          <TouchableOpacity
            // onPress={handleSubmit}
            style={styles.submit_btn}>
            <ImageBackground
              source={submit_btn}
              resizeMode="cover"
              style={styles.submit_btn_view}>
              {/* <View style={styles.submit_btn_view}> */}
              <Text style={styles.submit_btn_text}>Save</Text>
              {/* </View> */}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  profile_picture_container: {
    paddingTop: 20,
  },
  profile_picture: {
    borderRadius: 100,
  },
  personal_information_container: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  form_field: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    borderRadius: 7,
    paddingHorizontal: 10,
    width: width - 50,
  },
  submit_btn: {
    backgroundColor: '#000',
    borderRadius: 25,
    marginTop: 40,
  },
  submit_btn_view: {
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    overflow: 'hidden',
  },
  submit_btn_text: {
    color: '#fff',
  },
});
