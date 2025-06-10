import axios from 'axios';

const API_URL = 'http://localhost:3000';

const getAccount = async () => {
  try {
    const response = await axios.get(`${API_URL}/login`);
    return response.data.accounts || [];
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Expecting user data from backend
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};



export default { getAccount, login };