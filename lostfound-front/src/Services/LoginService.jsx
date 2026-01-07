import axios from "axios";

const BASE_URL = "http://localhost:9595/lostfound";

const LOGIN_URL  = `${BASE_URL}/login`;
const ROLE_URL   = `${BASE_URL}/role`;
const USER_URL   = `${BASE_URL}/user`;
const LOGOUT_URL = `${BASE_URL}/logout`;
const STD_URL    = `${BASE_URL}/student`;
const ME_URL     = `${BASE_URL}/me`;

export const registerNewUser = (user) =>
  axios.post(LOGIN_URL, user, { withCredentials: true });

export const validateUser = (userId, password) =>
  axios.get(`${LOGIN_URL}/${userId}/${password}`, { withCredentials: true });

export const getUserDetails = () =>
  axios.get(LOGIN_URL, { withCredentials: true });

export const getRole = () =>
  axios.get(ROLE_URL, { withCredentials: true });

export const logoutUser = () =>
  axios.post(LOGOUT_URL, {}, { withCredentials: true });

export const getUserId = () =>
  axios.get(USER_URL, { withCredentials: true });

export const getUser = () =>
  axios.get(ME_URL, { withCredentials: true });

export const getAllStudents = () =>
  axios.get(STD_URL, { withCredentials: true });

/* ✅ DELETE BY USERNAME (MATCHES BACKEND) */
export const deleteStudent = (username) =>
  axios.delete(`${LOGIN_URL}/${username}`, { withCredentials: true });
