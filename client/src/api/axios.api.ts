import axios from "axios";
import { getToken } from "../helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: "http://localhost:10000/api",
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

// https://cstimer-production.up.railway.app/api
// https://cs-timer-serv.onrender.com
// http://localhost:10000/api
