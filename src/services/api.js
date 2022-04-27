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
  const promise = await axios.post(`${baseURL}/auth/login`, data);

  return promise;
}

async function signUp(data) {
  const promise = await axios.post(`${baseURL}/auth/sign-up`, data);

  return promise;
}

async function getTerms(token) {
  const header = createHeader(token);
  const promise = await axios.get(`${baseURL}/terms`, header);

  return promise;
}

async function getTeachers(token) {
  const header = createHeader(token);
  const promise = await axios.get(`${baseURL}/teachers`, header);

  return promise;
}

async function increaseViewCount(token, testId) {
  const header = createHeader(token);
  const promise = await axios.put(`${baseURL}/tests/${testId}/view`, {}, header);

  return promise;
}

export default {
  login,
  signUp,
  getTerms,
  getTeachers,
  increaseViewCount
};