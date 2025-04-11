import { get, post } from './request.js';
import { baseUserUrl } from '../constants.js';
import { removeUserData, setUserData } from '../utils.js';

async function register(userData) {
  const result = await post(`${baseUserUrl}/register`, userData);
  setUserData(result);
  return result;
}

async function login(userData) {
  const result = await post(`${baseUserUrl}/login`, userData);
  setUserData(result);
  return result;
}

async function logout(userData) {
  await get(`${baseUserUrl}/logout`, userData);
  removeUserData();
}

const usersService = { register, login, logout };
export default usersService;
