/* eslint-disable prettier/prettier */
import Axios from "axios";
import { BASE_URL } from "../utils/Globals";

export const setApiURL = () => {
    Axios.defaults.baseURL = BASE_URL;
  };
  