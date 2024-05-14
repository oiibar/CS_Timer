import axios from "axios";
import { getToken } from "../helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});
