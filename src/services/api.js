import axios from "axios";

const baseURL = "http://localhost:4000";

async function login(data) {
  const promise = axios.post(`${baseURL}/auth/login`, data);

  return promise;
}

export default {
  login,
}