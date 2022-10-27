/* eslint-disable prettier/prettier */
import Axios from 'axios';
import GLOBALS from '../utils/Globals';

// setApiURL();

export const fetchAllPostsByType = async (type, callback) => {
  try {
    const response = await fetch(GLOBALS.BASE_URL + 'posts/' + type);
    const data = await response.json();
    return callback({result: true, reponse: data});
  } catch (error) {
    console.error(error);
    return callback({result: false, response: error});
  }
};

export const fetchPost = async id =>
  (await Axios.get('/posts/' + id)).data.data;

// export const getUserIranpeyma = async ({req, res}) => {
//   let response = await Axios({
//     url: '/userIranpeyma',
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + getCookie('token', {req, res}),
//     },
//   });

//   return response.data;
// };
