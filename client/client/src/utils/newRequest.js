import axios from "axios";
axios.defaults.withCredentials = false;
export const newRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
  secure: true,
  //credentials: "include",
  useCredentials: false,
});
