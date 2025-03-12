import axios from 'axios';
import apiClient, {BASE_URL} from './apiConst';


export const userLogin = async payload => {
  console.log(payload,"ooooooo")
  return await axios.post(`${BASE_URL}api/v0/auth/login`, payload);
};

export const userRegister = async payload => {
  return await axios.post(`${BASE_URL}api/v0/auth/signup`, payload);
};

export const fetchTasks = async payload => {
  return await apiClient.get(`api/v0/tasks`, payload);
};

export const createTask = async payload => {
  return await apiClient.post(`api/v0/tasks`, payload);
};

export const updateTask = async (payload, Id) => {
  return await apiClient.put(`api/v0/tasks/${Id}`, payload);
};

export const fetchTaskDetails = async Id => {
  return await apiClient.get(`api/v0/tasks/${Id}`);
};

export const deleteTask = async Id => {
  return await apiClient.delete(`api/v0/tasks/${Id}`);
};
