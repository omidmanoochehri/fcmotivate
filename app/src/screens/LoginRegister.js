/* eslint-disable prettier/prettier */
import {Formik} from 'formik';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import bg from '../utils/img/app_background_image.png';
import TabBtnBg from '../utils/svg/tab-btn-selected.png';
import input_bg from '../utils/img/input.png';
import submit_btn from '../utils/img/button-dark.png';
import {useNavigation} from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
import * as Keychain from 'react-native-keychain';
import {login, signup} from '../services/user.service';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [error, setError] = useState(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const navigation = useNavigation();

  const doSignUp = values => {
    setError('');
    signup(values, ({result, response}) => {
      console.log('res', response);
      if (result) {
        setIsVerificationSent(true);
      } else {
        setError('Somthing went wrong! Please try again.');
      }
    });
  };

  const doLogin = values => {
    setError('');
    login(values.email, values.password, ({result, response}) => {
      console.log('res', response);
      if (result && response.token) {
        Keychain.setGenericPassword(values.email, values.password).then(
          navigation.navigate('SelectPosition', {name: 'SelectPosition'}),
        );
      } else {
        setError('The username or password is invalid!');
      }
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#262C30'}}>
      <ImageBackground source={bg} resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.title}>Hello There!</Text>

          <View style={styles.tabContainer}>
            <View style={styles.tabBtns}>
              <TouchableOpacity
                style={styles.tabBtn}
                onPress={() => {
                  setIsRegister(false);
                }}>
                {!isRegister ? (
                  <ImageBackground
                    style={styles.tab_btn_bg}
                    source={TabBtnBg}
                    resizeMode="stretch">
                    <Text style={styles.tabBtnText}>Login</Text>
                  </ImageBackground>
                ) : (
                  <Text style={[styles.tabBtnText, {color: '#797979'}]}>
                    Login
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabBtn}
                onPress={() => {
                  setIsRegister(true);
                  setIsVerificationSent(false);
                }}>
                {/* <TabBtnBg style={styles.tab_btn_bg} width={250} height={150} /> */}
                {isRegister ? (
                  <ImageBackground
                    style={styles.tab_btn_bg}
                    source={TabBtnBg}
                    resizeMode="stretch">
                    <Text style={styles.tabBtnText}>Register</Text>
                  </ImageBackground>
                ) : (
                  <Text style={[styles.tabBtnText, {color: '#797979'}]}>
                    Register
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {isRegister ? (
              <View style={styles.tab}>
                {!isVerificationSent ? (
                  <Formik
                    initialValues={{email: ''}}
                    onSubmit={({
                      email,
                      phonenumber,
                      password,
                      confirm_password,
                    }) => {
                      if (
                        email !== '' &&
                        phonenumber !== '' &&
                        password !== 'null' &&
                        confirm_password !== 'null'
                      ) {
                        if (password === confirm_password) {
                          doSignUp({
                            email,
                            phonenumber,
                            password
                          });
                        } else {
                          setError('Passwords you entered are not match!');
                        }
                      } else {
                        setError('Please enter all the required fields!');
                      }
                    }}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                      <View>
                        <ImageBackground
                          style={styles.form_field}
                          source={input_bg}
                          resizeMode="stretch">
                          <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                            style={styles.input}
                            placeholderTextColor={'#797979'}
                          />
                        </ImageBackground>

                        <ImageBackground
                          style={styles.form_field}
                          source={input_bg}
                          resizeMode="stretch">
                          <TextInput
                            onChangeText={handleChange('phonenumber')}
                            onBlur={handleBlur('phonenumber')}
                            value={values.phonenumber}
                            placeholder="Phone Number"
                            style={styles.input}
                            placeholderTextColor={'#797979'}
                          />
                        </ImageBackground>

                        <ImageBackground
                          style={styles.form_field}
                          source={input_bg}
                          resizeMode="stretch">
                          <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
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
                            onChangeText={handleChange('confirm_password')}
                            onBlur={handleBlur('confirm_password')}
                            value={values.confirm_password}
                            placeholder="Repeat Password"
                            style={styles.input}
                            secureTextEntry
                            placeholderTextColor={'#797979'}
                          />
                        </ImageBackground>

                        <TouchableOpacity
                          onPress={handleSubmit}
                          style={styles.submit_btn}>
                          <ImageBackground
                            source={submit_btn}
                            resizeMode="stretch">
                            <View style={styles.submit_btn_view}>
                              <Text style={styles.submit_btn_text}>
                                Send Verification Code
                              </Text>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>

                        {/* <LinearGradient
                      colors={['#4c669f', '#3b5998', '#192f6a']}>
                      <Text>Sign in with Facebook</Text>
                    </LinearGradient> */}
                      </View>
                    )}
                  </Formik>
                ) : (
                  <Formik
                    initialValues={{verification_code: ''}}
                    onSubmit={values => doLogin(values)}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                      <View>
                        <View>
                          <Text style={{color: '#fff'}}>
                            The verification code is sent to your email.
                          </Text>
                        </View>
                        <ImageBackground
                          style={styles.form_field}
                          source={input_bg}
                          resizeMode="stretch">
                          <TextInput
                            onChangeText={handleChange('verification_code')}
                            onBlur={handleBlur('verification_code')}
                            value={values.verification_code}
                            placeholder="Verification Code"
                            style={styles.input}
                            placeholderTextColor={'#797979'}
                          />
                        </ImageBackground>

                        <TouchableOpacity
                          onPress={handleSubmit}
                          style={styles.submit_btn}>
                          <ImageBackground
                            source={submit_btn}
                            resizeMode="stretch">
                            <View style={styles.submit_btn_view}>
                              <Text style={styles.submit_btn_text}>
                                Let's Start
                              </Text>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>

                        {/* <LinearGradient
                      colors={['#4c669f', '#3b5998', '#192f6a']}>
                      <Text>Sign in with Facebook</Text>
                    </LinearGradient> */}
                      </View>
                    )}
                  </Formik>
                )}
              </View>
            ) : (
              <View style={styles.tab}>
                <Formik
                  initialValues={{email: '', password: ''}}
                  onSubmit={doLogin}>
                  {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View>
                      <ImageBackground
                        style={styles.form_field}
                        source={input_bg}
                        resizeMode="stretch">
                        <TextInput
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          placeholder="Email"
                          style={styles.input}
                          placeholderTextColor={'#797979'}
                        />
                      </ImageBackground>

                      <ImageBackground
                        style={styles.form_field}
                        source={input_bg}
                        resizeMode="stretch">
                        <TextInput
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          placeholder="Password"
                          style={styles.input}
                          secureTextEntry
                          placeholderTextColor={'#797979'}
                        />
                      </ImageBackground>

                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.submit_btn}>
                        <ImageBackground
                          source={submit_btn}
                          resizeMode="stretch">
                          <View style={styles.submit_btn_view}>
                            <Text style={styles.submit_btn_text}>Login</Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>

                      {/* <LinearGradient
                      colors={['#4c669f', '#3b5998', '#192f6a']}>
                      <Text>Sign in with Facebook</Text>
                    </LinearGradient> */}
                    </View>
                  )}
                </Formik>
              </View>
            )}
            {
              <View style={styles.errorContainer}>
                <Text style={styles.error}>{error}</Text>
              </View>
            }
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginRegister;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: Dimensions.get('window').height,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingTop: 90,
    paddingBottom: 50,
  },
  tabContainer: {},
  tabBtns: {
    backgroundColor: '#111213',
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    borderRadius: 7,
    padding: 1,
  },
  tabBtn: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnSelected: {
    backgroundColor: 'rgba(112, 112, 112, 0.2)',
  },
  tabBtnText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 2,
    fontSize: 11,
  },
  tab_btn_bg: {
    paddingVertical: 10,
    width: '100%',
  },
  tab: {
    paddingTop: 10,
  },
  form_field: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    borderRadius: 7,
    paddingHorizontal: 10,
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
  },
  submit_btn_text: {
    color: '#fff',
  },
  errorContainer: {
    paddingVertical: 20,
  },
  error: {
    color: 'red',
  },
});
