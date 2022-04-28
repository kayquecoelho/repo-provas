import axios from "axios";

const baseURL = "http://localhost:4000";

function createHeader(token) {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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

async function getTests(token, groupedBy) {
  const header = createHeader(token);
  const promise = await axios.get(
    `${baseURL}/tests?groupedBy=${groupedBy}`,
    header
  );

  return promise;
}

async function increaseViewCount(token, testId) {
  const header = createHeader(token);
  const promise = await axios.put(
    `${baseURL}/tests/${testId}/view`,
    {},
    header
  );

  return promise;
}

async function getCategories(token) {
  const header = createHeader(token);
  const promise = await axios.get(`${baseURL}/categories`, header);

  return promise;
}

async function getDisciplines(token) {
  const header = createHeader(token);
  const promise = await axios.get(`${baseURL}/disciplines`, header);

  return promise;
}

const api = {
  login,
  signUp,
  getTests,
  increaseViewCount,
  getCategories,
  getDisciplines,
};

export default api;
