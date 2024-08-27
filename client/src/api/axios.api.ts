import axios from "axios";
import { getToken } from "../helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: "https://cs-timer-serv.onrender.com/api",
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

//https://cs-timer-serv.onrender.com
