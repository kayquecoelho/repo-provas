import axios from "axios";

const baseURL = "http://localhost:4000";

function createHeader(token) {
  const header = { 
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return header;
}

async function login(data) {
  const promise = axios.post(`${baseURL}/auth/login`, data);

  return promise;
}

async function signUp(data) {
  const promise = axios.post(`${baseURL}/auth/sign-up`, data);

  return promise;
}

async function getTerms(token) {
  const header = createHeader(token);
  const promise = axios.get(`${baseURL}/terms`, header);

  return promise;
}

async function getTeachers(token) {
  const header = createHeader(token);
  const promise = axios.get(`${baseURL}/teachers`, header);

  return promise;
}

export default {
  login,
  signUp,
  getTerms,
  getTeachers
};