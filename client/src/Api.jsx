import axios from 'axios';

const API_URL = 'https://management-o5hr.onrender.com/api/v1/business';
const API_URL2 = 'https://management-o5hr.onrender.com/api/v2/business';
const API_URL3 = 'https://management-o5hr.onrender.com/api/v3/business';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerEmp = async (empData) => {
  try {
    const response = await axios.post(`${API_URL2}/registeremp`, empData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL3}/registertask`, taskData);
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw the actual error response for debugging
  }
};

export const registerProject = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL3}/registerproject`, taskData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const token = response.data.token; // Assuming the token is returned as part of response.data
    if (token) {
      localStorage.setItem('token', token); // Store the token in localStorage
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Check if user is logged in (using token)
export const isUserLoggedIn = async () => {
  try {
    const response = await axios.get(`${API_URL}/isLogin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage after login
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
