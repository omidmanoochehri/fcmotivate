/* eslint-disable prettier/prettier */
import Axios from 'axios';
import GLOBALS from '../utils/Globals';
import * as Keychain from 'react-native-keychain';

export const fetchUser = async callback => {
  try {
    const response = await fetch(GLOBALS.BASE_URL + 'users/');
    // headers: {
    //   // Authorization: 'Bearer ' + getCookie('token', {req, res}),
    // },
    const data = await response.json();
    return callback({result: true, response: data});
  } catch (error) {
    console.error(error);
    return callback({result: false, response: error});
  }
};

export const login = async (username, password, callback) => {
  try {
    const response = await fetch(GLOBALS.BASE_URL + 'users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    return callback({result: true, response: data});
  } catch (error) {
    console.error(error);
    return callback({result: false, response: error});
  }
};

export const signup = async (user_data, callback) => {
  try {
    const response = await fetch(GLOBALS.BASE_URL + 'users/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_data),
    });
    const data = await response.json();
    return callback({result: true, response: data});
  } catch (error) {
    console.error(error);
    return callback({result: false, response: error});
  }
};
