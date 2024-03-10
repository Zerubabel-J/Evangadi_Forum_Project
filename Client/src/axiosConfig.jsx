import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5500/api",
  baseURL: "https://api.carmelmishel.com/api",
});

export default instance;
