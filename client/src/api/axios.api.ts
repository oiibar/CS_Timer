import axios from "axios";
import { getToken } from "@helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: "https://cstimer-production.up.railway.app/api",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// https://cstimer-production.up.railway.app/api
// http://localhost:10000/api
// https://cs-timer-serv.onrender.com
